import db from "../config/db.js";

/**
 * @desc    Create a new player
 * @route   POST /api/players
 * @access  Private (JWT Protected)
 */
export const createPlayer = async (req, res) => {
  const {
    team_id,
    player_name,
    profile_image,
    jersey_number,
    role,
    batting_style,
    bowling_style,
    date_of_birth,
    nationality,
    matches_played,
    runs,
    wickets,
    sixes,
    fours,
    strike_rate,
    economy,
    status
  } = req.body;

  // Validation
  if (!player_name || !role) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields: player_name and role"
    });
  }

  // Valid role validation
  const validRoles = ["Batsman", "Bowler", "All-rounder", "Wicket-keeper"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: `Role must be one of: ${validRoles.join(", ")}`
    });
  }

  // Valid status validation
  const validStatuses = ["Active", "Injured", "Retired"];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Status must be one of: ${validStatuses.join(", ")}`
    });
  }

  // Valid jersey number format check
  if (jersey_number !== undefined && jersey_number !== null && String(jersey_number).trim() !== "") {
    const jerseyVal = parseInt(jersey_number);
    if (isNaN(jerseyVal) || jerseyVal < 0 || jerseyVal > 999) {
      return res.status(400).json({
        success: false,
        message: "Jersey number must be a valid integer between 0 and 999"
      });
    }
  }

  // Valid date_of_birth validation
  if (date_of_birth) {
    const dob = new Date(date_of_birth);
    if (isNaN(dob.getTime()) || dob > new Date()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid date of birth in the past"
      });
    }
  }

  // Positive numbers validations
  if (matches_played !== undefined && parseInt(matches_played) < 0) {
    return res.status(400).json({ success: false, message: "Matches played must be a positive number" });
  }
  if (runs !== undefined && parseInt(runs) < 0) {
    return res.status(400).json({ success: false, message: "Runs must be a positive number" });
  }
  if (wickets !== undefined && parseInt(wickets) < 0) {
    return res.status(400).json({ success: false, message: "Wickets must be a positive number" });
  }
  if (sixes !== undefined && parseInt(sixes) < 0) {
    return res.status(400).json({ success: false, message: "Sixes must be a positive number" });
  }
  if (fours !== undefined && parseInt(fours) < 0) {
    return res.status(400).json({ success: false, message: "Fours must be a positive number" });
  }
  if (strike_rate !== undefined && parseFloat(strike_rate) < 0) {
    return res.status(400).json({ success: false, message: "Strike rate must be a positive number" });
  }
  if (economy !== undefined && parseFloat(economy) < 0) {
    return res.status(400).json({ success: false, message: "Economy must be a positive number" });
  }

  try {
    // Team validation if team_id is provided
    if (team_id) {
      const [teamExist] = await db.query("SELECT id FROM teams WHERE id = ?", [team_id]);
      if (teamExist.length === 0) {
        return res.status(404).json({
          success: false,
          message: "The selected franchise team does not exist"
        });
      }

      // Unique jersey number within the same team check
      if (jersey_number) {
        const [dupJersey] = await db.query(
          "SELECT id FROM players WHERE team_id = ? AND jersey_number = ?",
          [team_id, jersey_number]
        );
        if (dupJersey.length > 0) {
          return res.status(409).json({
            success: false,
            message: `Jersey number ${jersey_number} is already taken inside this franchise team`
          });
        }
      }
    }

    const insertSql = `
      INSERT INTO players (team_id, player_name, profile_image, jersey_number, role, batting_style, bowling_style, date_of_birth, nationality, matches_played, runs, wickets, sixes, fours, strike_rate, economy, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      team_id || null,
      player_name,
      profile_image || null,
      jersey_number ? parseInt(jersey_number) : null,
      role,
      batting_style || null,
      bowling_style || null,
      date_of_birth || null,
      nationality || null,
      matches_played !== undefined ? parseInt(matches_played) : 0,
      runs !== undefined ? parseInt(runs) : 0,
      wickets !== undefined ? parseInt(wickets) : 0,
      sixes !== undefined ? parseInt(sixes) : 0,
      fours !== undefined ? parseInt(fours) : 0,
      strike_rate !== undefined ? parseFloat(strike_rate) : 0.00,
      economy !== undefined ? parseFloat(economy) : 0.00,
      status || "Active"
    ];

    const [result] = await db.query(insertSql, params);

    const [newRow] = await db.query("SELECT * FROM players WHERE id = ?", [result.insertId]);

    return res.status(201).json({
      success: true,
      message: "Player registered successfully",
      data: newRow[0],
      player: newRow[0]
    });
  } catch (error) {
    console.error("Error creating player:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while registering the player"
    });
  }
};

/**
 * @desc    Get all players (with pagination, search, filters, and sorting)
 * @route   GET /api/players
 * @access  Private (JWT Protected)
 */
export const getPlayers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const search = req.query.search || req.query.q || "";
    const teamId = req.query.teamId || req.query.team_id || "";
    const role = req.query.role || "";
    const status = req.query.status || "";
    const sortBy = req.query.sortBy || "newest"; // newest, oldest, name, runs, wickets, strike_rate, economy

    // Build WHERE clauses
    let whereClauses = [];
    let queryParams = [];

    if (search) {
      whereClauses.push("(p.player_name LIKE ? OR p.nationality LIKE ? OR p.batting_style LIKE ? OR p.bowling_style LIKE ?)");
      const searchParam = `%${search}%`;
      queryParams.push(searchParam, searchParam, searchParam, searchParam);
    }

    if (teamId) {
      whereClauses.push("p.team_id = ?");
      queryParams.push(teamId);
    }

    if (role) {
      whereClauses.push("p.role = ?");
      queryParams.push(role);
    }

    if (status) {
      whereClauses.push("p.status = ?");
      queryParams.push(status);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    // Build ORDER BY sorting
    let sortSql = "ORDER BY p.created_at DESC";
    if (sortBy === "oldest") {
      sortSql = "ORDER BY p.created_at ASC";
    } else if (sortBy === "name") {
      sortSql = "ORDER BY p.player_name ASC";
    } else if (sortBy === "runs") {
      sortSql = "ORDER BY p.runs DESC";
    } else if (sortBy === "wickets") {
      sortSql = "ORDER BY p.wickets DESC";
    } else if (sortBy === "strike_rate") {
      sortSql = "ORDER BY p.strike_rate DESC";
    } else if (sortBy === "economy") {
      sortSql = "ORDER BY p.economy ASC";
    }

    // Get Total Count for pagination
    const [countResult] = await db.query(
      `SELECT COUNT(*) AS total FROM players p ${whereSql}`,
      queryParams
    );
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Fetch paginated rows with team name details
    const selectSql = `
      SELECT p.*, t.team_name, t.short_name AS team_short_name
      FROM players p
      LEFT JOIN teams t ON p.team_id = t.id
      ${whereSql}
      ${sortSql}
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(selectSql, [...queryParams, limit, offset]);

    return res.status(200).json({
      success: true,
      pagination: {
        total,
        page,
        limit,
        pages: totalPages
      },
      data: rows,
      players: rows
    });
  } catch (error) {
    console.error("Error retrieving players:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while retrieving players"
    });
  }
};

/**
 * @desc    Get a single player by ID
 * @route   GET /api/players/:id
 * @access  Private (JWT Protected)
 */
export const getPlayerById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT p.*, t.team_name, t.short_name AS team_short_name 
       FROM players p 
       LEFT JOIN teams t ON p.team_id = t.id 
       WHERE p.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Player not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: rows[0],
      player: rows[0]
    });
  } catch (error) {
    console.error("Error retrieving player by id:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while retrieving player details"
    });
  }
};

/**
 * @desc    Update a player by ID
 * @route   PUT /api/players/:id
 * @access  Private (JWT Protected)
 */
export const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const {
    team_id,
    player_name,
    profile_image,
    jersey_number,
    role,
    batting_style,
    bowling_style,
    date_of_birth,
    nationality,
    matches_played,
    runs,
    wickets,
    sixes,
    fours,
    strike_rate,
    economy,
    status
  } = req.body;

  // Validation
  if (!player_name || !role) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields: player_name and role"
    });
  }

  // Valid role validation
  const validRoles = ["Batsman", "Bowler", "All-rounder", "Wicket-keeper"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: `Role must be one of: ${validRoles.join(", ")}`
    });
  }

  // Valid status validation
  const validStatuses = ["Active", "Injured", "Retired"];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Status must be one of: ${validStatuses.join(", ")}`
    });
  }

  // Valid jersey number format check
  if (jersey_number !== undefined && jersey_number !== null && String(jersey_number).trim() !== "") {
    const jerseyVal = parseInt(jersey_number);
    if (isNaN(jerseyVal) || jerseyVal < 0 || jerseyVal > 999) {
      return res.status(400).json({
        success: false,
        message: "Jersey number must be a valid integer between 0 and 999"
      });
    }
  }

  // Valid date_of_birth validation
  if (date_of_birth) {
    const dob = new Date(date_of_birth);
    if (isNaN(dob.getTime()) || dob > new Date()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid date of birth in the past"
      });
    }
  }

  // Positive numbers validations
  if (matches_played !== undefined && parseInt(matches_played) < 0) {
    return res.status(400).json({ success: false, message: "Matches played must be a positive number" });
  }
  if (runs !== undefined && parseInt(runs) < 0) {
    return res.status(400).json({ success: false, message: "Runs must be a positive number" });
  }
  if (wickets !== undefined && parseInt(wickets) < 0) {
    return res.status(400).json({ success: false, message: "Wickets must be a positive number" });
  }
  if (sixes !== undefined && parseInt(sixes) < 0) {
    return res.status(400).json({ success: false, message: "Sixes must be a positive number" });
  }
  if (fours !== undefined && parseInt(fours) < 0) {
    return res.status(400).json({ success: false, message: "Fours must be a positive number" });
  }
  if (strike_rate !== undefined && parseFloat(strike_rate) < 0) {
    return res.status(400).json({ success: false, message: "Strike rate must be a positive number" });
  }
  if (economy !== undefined && parseFloat(economy) < 0) {
    return res.status(400).json({ success: false, message: "Economy must be a positive number" });
  }

  try {
    // Verify player exists
    const [existCheck] = await db.query("SELECT id FROM players WHERE id = ?", [id]);
    if (existCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Player not found"
      });
    }

    // Team validation if team_id is provided
    if (team_id) {
      const [teamExist] = await db.query("SELECT id FROM teams WHERE id = ?", [team_id]);
      if (teamExist.length === 0) {
        return res.status(404).json({
          success: false,
          message: "The selected franchise team does not exist"
        });
      }

      // Unique jersey number within the same team check (excluding current player)
      if (jersey_number) {
        const [dupJersey] = await db.query(
          "SELECT id FROM players WHERE team_id = ? AND jersey_number = ? AND id != ?",
          [team_id, jersey_number, id]
        );
        if (dupJersey.length > 0) {
          return res.status(409).json({
            success: false,
            message: `Jersey number ${jersey_number} is already taken inside this franchise team`
          });
        }
      }
    }

    const updateSql = `
      UPDATE players
      SET team_id = ?, player_name = ?, profile_image = ?, jersey_number = ?, role = ?, batting_style = ?, bowling_style = ?,
          date_of_birth = ?, nationality = ?, matches_played = ?, runs = ?, wickets = ?, sixes = ?, fours = ?, strike_rate = ?, economy = ?, status = ?
      WHERE id = ?
    `;
    const params = [
      team_id || null,
      player_name,
      profile_image || null,
      jersey_number ? parseInt(jersey_number) : null,
      role,
      batting_style || null,
      bowling_style || null,
      date_of_birth || null,
      nationality || null,
      matches_played !== undefined ? parseInt(matches_played) : 0,
      runs !== undefined ? parseInt(runs) : 0,
      wickets !== undefined ? parseInt(wickets) : 0,
      sixes !== undefined ? parseInt(sixes) : 0,
      fours !== undefined ? parseInt(fours) : 0,
      strike_rate !== undefined ? parseFloat(strike_rate) : 0.00,
      economy !== undefined ? parseFloat(economy) : 0.00,
      status || "Active",
      id
    ];

    await db.query(updateSql, params);

    const [updatedRow] = await db.query("SELECT * FROM players WHERE id = ?", [id]);

    return res.status(200).json({
      success: true,
      message: "Player details updated successfully",
      data: updatedRow[0],
      player: updatedRow[0]
    });
  } catch (error) {
    console.error("Error updating player:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while updating player details"
    });
  }
};

/**
 * @desc    Delete a player by ID
 * @route   DELETE /api/players/:id
 * @access  Private (JWT Protected)
 */
export const deletePlayer = async (req, res) => {
  const { id } = req.params;

  try {
    const [existCheck] = await db.query("SELECT id FROM players WHERE id = ?", [id]);
    if (existCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Player not found"
      });
    }

    await db.query("DELETE FROM players WHERE id = ?", [id]);

    return res.status(200).json({
      success: true,
      message: "Player deleted successfully",
      data: null
    });
  } catch (error) {
    console.error("Error deleting player:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while deleting the player"
    });
  }
};

/**
 * @desc    Get summary player metrics stats
 * @route   GET /api/players/stats
 * @access  Private (JWT Protected)
 */
export const getPlayerStats = async (req, res) => {
  try {
    const [[{ total }]] = await db.query("SELECT COUNT(*) AS total FROM players");
    const [[{ active }]] = await db.query("SELECT COUNT(*) AS active FROM players WHERE status = 'Active'");
    const [[{ injured }]] = await db.query("SELECT COUNT(*) AS injured FROM players WHERE status = 'Injured'");
    const [[{ teamsRepresented }]] = await db.query("SELECT COUNT(DISTINCT team_id) AS teamsRepresented FROM players WHERE team_id IS NOT NULL");

    const statsObj = {
      totalPlayers: total,
      activePlayers: active,
      injuredPlayers: injured,
      teamsRepresented: teamsRepresented
    };
    return res.status(200).json({
      success: true,
      data: statsObj,
      stats: statsObj
    });
  } catch (error) {
    console.error("Error retrieving player stats:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while calculating player statistics"
    });
  }
};

/**
 * @desc    Get simple list for dropdown selection
 * @route   GET /api/players/dropdown
 * @access  Private (JWT Protected)
 */
export const getPlayerDropdown = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, player_name FROM players WHERE status = 'Active' ORDER BY player_name ASC"
    );

    return res.status(200).json({
      success: true,
      data: rows,
      players: rows
    });
  } catch (error) {
    console.error("Error fetching player dropdown:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while loading player list"
    });
  }
};
