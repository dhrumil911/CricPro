import db from "../config/db.js";

/**
 * @desc    Create a new team
 * @route   POST /api/teams
 * @access  Private (JWT Protected)
 */
export const createTeam = async (req, res) => {
  const {
    team_name,
    short_name,
    logo,
    captain,
    coach,
    home_ground,
    founded_year,
    description,
    status
  } = req.body;

  // Validation
  if (!team_name || !short_name) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields: team_name and short_name"
    });
  }

  // Validate founded year bounds
  const currentYear = new Date().getFullYear();
  if (founded_year) {
    const yearVal = parseInt(founded_year);
    if (isNaN(yearVal) || yearVal < 1800 || yearVal > currentYear) {
      return res.status(400).json({
        success: false,
        message: `Please enter a valid founded year between 1800 and ${currentYear}`
      });
    }
  }

  try {
    // Check duplicate team_name
    const [dupName] = await db.query(
      "SELECT id FROM teams WHERE team_name = ?",
      [team_name]
    );
    if (dupName.length > 0) {
      return res.status(409).json({
        success: false,
        message: "A franchise with this team name already exists"
      });
    }

    // Check duplicate short_name
    const [dupShort] = await db.query(
      "SELECT id FROM teams WHERE short_name = ?",
      [short_name]
    );
    if (dupShort.length > 0) {
      return res.status(409).json({
        success: false,
        message: "A franchise with this short name already exists"
      });
    }

    const insertSql = `
      INSERT INTO teams (team_name, short_name, logo, captain, coach, home_ground, founded_year, description, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      team_name,
      short_name,
      logo || null,
      captain || null,
      coach || null,
      home_ground || null,
      founded_year ? parseInt(founded_year) : null,
      description || null,
      status || "Active"
    ];

    const [result] = await db.query(insertSql, params);

    const [newRow] = await db.query("SELECT * FROM teams WHERE id = ?", [result.insertId]);

    return res.status(201).json({
      success: true,
      message: "Franchise created successfully",
      data: newRow[0],
      team: newRow[0]
    });
  } catch (error) {
    console.error("Error creating team:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while creating the franchise"
    });
  }
};

/**
 * @desc    Get all teams (with pagination, search, status filter, and sorting)
 * @route   GET /api/teams
 * @access  Private (JWT Protected)
 */
export const getTeams = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const search = req.query.search || req.query.q || "";
    const status = req.query.status || "";
    const sortBy = req.query.sortBy || "newest"; // newest, oldest, name, points, nrr

    // Build WHERE clauses
    let whereClauses = [];
    let queryParams = [];

    if (search) {
      whereClauses.push("(team_name LIKE ? OR short_name LIKE ? OR home_ground LIKE ?)");
      const searchParam = `%${search}%`;
      queryParams.push(searchParam, searchParam, searchParam);
    }

    if (status) {
      whereClauses.push("status = ?");
      queryParams.push(status);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    // Build ORDER BY sorting
    let sortSql = "ORDER BY created_at DESC";
    if (sortBy === "oldest") {
      sortSql = "ORDER BY created_at ASC";
    } else if (sortBy === "name") {
      sortSql = "ORDER BY team_name ASC";
    } else if (sortBy === "points") {
      sortSql = "ORDER BY points DESC, nrr DESC";
    } else if (sortBy === "nrr") {
      sortSql = "ORDER BY nrr DESC";
    }

    // Get Total Count for pagination
    const [countResult] = await db.query(
      `SELECT COUNT(*) AS total FROM teams ${whereSql}`,
      queryParams
    );
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Fetch paginated rows
    const selectSql = `
      SELECT id, team_name, short_name, logo, captain, coach, home_ground, founded_year, description, status, wins, losses, points, nrr, created_at, updated_at
      FROM teams
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
      teams: rows
    });
  } catch (error) {
    console.error("Error retrieving teams:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while retrieving franchises"
    });
  }
};

/**
 * @desc    Get a single team by ID
 * @route   GET /api/teams/:id
 * @access  Private (JWT Protected)
 */
export const getTeamById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT * FROM teams WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Franchise not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: rows[0],
      team: rows[0]
    });
  } catch (error) {
    console.error("Error retrieving team by id:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while retrieving franchise details"
    });
  }
};

/**
 * @desc    Update a team by ID
 * @route   PUT /api/teams/:id
 * @access  Private (JWT Protected)
 */
export const updateTeam = async (req, res) => {
  const { id } = req.params;
  const {
    team_name,
    short_name,
    logo,
    captain,
    coach,
    home_ground,
    founded_year,
    description,
    status,
    wins,
    losses,
    points,
    nrr
  } = req.body;

  // Validation
  if (!team_name || !short_name) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields: team_name and short_name"
    });
  }

  // Validate founded year bounds
  const currentYear = new Date().getFullYear();
  if (founded_year) {
    const yearVal = parseInt(founded_year);
    if (isNaN(yearVal) || yearVal < 1800 || yearVal > currentYear) {
      return res.status(400).json({
        success: false,
        message: `Please enter a valid founded year between 1800 and ${currentYear}`
      });
    }
  }

  try {
    // Verify team exists
    const [existCheck] = await db.query("SELECT id FROM teams WHERE id = ?", [id]);
    if (existCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Franchise not found"
      });
    }

    // Check duplicate team_name for other franchises
    const [dupName] = await db.query(
      "SELECT id FROM teams WHERE team_name = ? AND id != ?",
      [team_name, id]
    );
    if (dupName.length > 0) {
      return res.status(409).json({
        success: false,
        message: "A franchise with this team name already exists"
      });
    }

    // Check duplicate short_name for other franchises
    const [dupShort] = await db.query(
      "SELECT id FROM teams WHERE short_name = ? AND id != ?",
      [short_name, id]
    );
    if (dupShort.length > 0) {
      return res.status(409).json({
        success: false,
        message: "A franchise with this short name already exists"
      });
    }

    const updateSql = `
      UPDATE teams
      SET team_name = ?, short_name = ?, logo = ?, captain = ?, coach = ?, home_ground = ?, founded_year = ?, description = ?, status = ?,
          wins = ?, losses = ?, points = ?, nrr = ?
      WHERE id = ?
    `;
    const params = [
      team_name,
      short_name,
      logo || null,
      captain || null,
      coach || null,
      home_ground || null,
      founded_year ? parseInt(founded_year) : null,
      description || null,
      status || "Active",
      wins !== undefined ? parseInt(wins) : 0,
      losses !== undefined ? parseInt(losses) : 0,
      points !== undefined ? parseInt(points) : 0,
      nrr !== undefined ? parseFloat(nrr) : 0.000,
      id
    ];

    await db.query(updateSql, params);

    const [updatedRow] = await db.query("SELECT * FROM teams WHERE id = ?", [id]);

    return res.status(200).json({
      success: true,
      message: "Franchise details updated successfully",
      data: updatedRow[0],
      team: updatedRow[0]
    });
  } catch (error) {
    console.error("Error updating team:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while updating franchise details"
    });
  }
};

/**
 * @desc    Delete a team by ID
 * @route   DELETE /api/teams/:id
 * @access  Private (JWT Protected)
 */
export const deleteTeam = async (req, res) => {
  const { id } = req.params;

  try {
    const [existCheck] = await db.query("SELECT id FROM teams WHERE id = ?", [id]);
    if (existCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Franchise not found"
      });
    }

    await db.query("DELETE FROM teams WHERE id = ?", [id]);

    return res.status(200).json({
      success: true,
      message: "Franchise deleted successfully",
      data: null
    });
  } catch (error) {
    console.error("Error deleting team:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while deleting the franchise"
    });
  }
};

/**
 * @desc    Get summary team metrics stats
 * @route   GET /api/teams/stats
 * @access  Private (JWT Protected)
 */
export const getTeamStats = async (req, res) => {
  try {
    // Total franchises count
    const [[{ total }]] = await db.query("SELECT COUNT(*) AS total FROM teams");
    // Active franchises count
    const [[{ active }]] = await db.query("SELECT COUNT(*) AS active FROM teams WHERE status = 'Active'");
    // Inactive franchises count
    const [[{ inactive }]] = await db.query("SELECT COUNT(*) AS inactive FROM teams WHERE status = 'Inactive'");
    // Total registered players
    const [[{ players }]] = await db.query("SELECT COUNT(*) AS players FROM players");

    const statsObj = {
      totalTeams: total,
      activeTeams: active,
      inactiveTeams: inactive,
      totalPlayers: players
    };
    return res.status(200).json({
      success: true,
      data: statsObj,
      stats: statsObj
    });
  } catch (error) {
    console.error("Error retrieving team stats:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while calculating statistics"
    });
  }
};

/**
 * @desc    Search teams quickly
 * @route   GET /api/teams/search
 * @access  Private (JWT Protected)
 */
export const searchTeams = async (req, res) => {
  const query = req.query.q || "";

  try {
    const [rows] = await db.query(
      "SELECT id, team_name, short_name, logo, status FROM teams WHERE team_name LIKE ? OR short_name LIKE ? LIMIT 10",
      [`%${query}%`, `%${query}%`]
    );

    return res.status(200).json({
      success: true,
      data: rows,
      teams: rows
    });
  } catch (error) {
    console.error("Error searching teams:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred during search query"
    });
  }
};

/**
 * @desc    Get simple list for dropdown selection
 * @route   GET /api/teams/dropdown
 * @access  Private (JWT Protected)
 */
export const getTeamDropdown = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, team_name, short_name FROM teams WHERE status = 'Active' ORDER BY team_name ASC"
    );

    return res.status(200).json({
      success: true,
      data: rows,
      teams: rows
    });
  } catch (error) {
    console.error("Error fetching team dropdown:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while loading franchise lists"
    });
  }
};
