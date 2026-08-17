import db from "../config/db.js";

/**
 * @desc    Create a new tournament
 * @route   POST /api/tournaments
 * @access  Private (JWT Protected)
 */
export const createTournament = async (req, res) => {
  const {
    name,
    description,
    format,
    venue,
    start_date,
    end_date,
    total_teams,
    overs,
    status,
    winner_team
  } = req.body;

  try {
    // 1. Missing fields validation
    if (!name || !format || !venue || !start_date || !end_date || total_teams === undefined || overs === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields: name, format, venue, start_date, end_date, total_teams, overs"
      });
    }

    // 2. Validate numeric values
    const teamsCount = Number(total_teams);
    const oversCount = Number(overs);

    if (isNaN(teamsCount) || teamsCount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Total teams must be a number greater than 0"
      });
    }

    if (isNaN(oversCount) || oversCount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Overs must be a number greater than 0"
      });
    }

    // 3. Validate Date Range
    const start = new Date(start_date);
    const end = new Date(end_date);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid dates for start_date and end_date"
      });
    }

    if (end < start) {
      return res.status(400).json({
        success: false,
        message: "End date must be greater than or equal to start date"
      });
    }

    // 4. Duplicate name checking
    const [existing] = await db.query("SELECT id FROM tournaments WHERE name = ?", [name.trim()]);
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "A tournament with this name already exists"
      });
    }

    // 5. Insert row
    const [result] = await db.query(
      `INSERT INTO tournaments 
       (name, description, format, venue, start_date, end_date, total_teams, overs, status, winner_team) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name.trim(),
        description || null,
        format.trim(),
        venue.trim(),
        start_date,
        end_date,
        teamsCount,
        oversCount,
        status || "Upcoming",
        winner_team || null
      ]
    );

    const newId = result.insertId;
    const [[newTourn]] = await db.query("SELECT * FROM tournaments WHERE id = ?", [newId]);

    return res.status(201).json({
      success: true,
      message: "Tournament created successfully",
      data: newTourn,
      tournament: newTourn
    });
  } catch (error) {
    console.error("Error creating tournament:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while creating the tournament"
    });
  }
};

/**
 * @desc    Get all tournaments (with pagination, search, status filter, and sorting)
 * @route   GET /api/tournaments
 * @access  Private (JWT Protected)
 */
export const getTournaments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const search = req.query.search || req.query.q || "";
    const status = req.query.status || "";
    const sortBy = req.query.sortBy || "newest"; // newest, oldest, name, start_date

    // Build WHERE conditions
    let whereClauses = [];
    let queryParams = [];

    if (search) {
      whereClauses.push("(name LIKE ? OR venue LIKE ? OR format LIKE ?)");
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
      sortSql = "ORDER BY name ASC";
    } else if (sortBy === "start_date") {
      sortSql = "ORDER BY start_date ASC";
    }

    // Get Total Count for pagination metadata
    const [countResult] = await db.query(
      `SELECT COUNT(*) AS total FROM tournaments ${whereSql}`,
      queryParams
    );
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Fetch paginated records
    const selectSql = `
      SELECT id, name, description, format, venue, 
             DATE_FORMAT(start_date, '%Y-%m-%d') AS start_date, 
             DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date, 
             total_teams, overs, status, winner_team, created_at, updated_at
      FROM tournaments 
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
      tournaments: rows
    });
  } catch (error) {
    console.error("Error retrieving tournaments:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while retrieving tournaments"
    });
  }
};

/**
 * @desc    Get a single tournament by ID
 * @route   GET /api/tournaments/:id
 * @access  Private (JWT Protected)
 */
export const getTournamentById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      `SELECT id, name, description, format, venue, 
             DATE_FORMAT(start_date, '%Y-%m-%d') AS start_date, 
             DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date, 
             total_teams, overs, status, winner_team, created_at, updated_at 
       FROM tournaments WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tournament not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: rows[0],
      tournament: rows[0]
    });
  } catch (error) {
    console.error("Error retrieving tournament by ID:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while retrieving tournament details"
    });
  }
};

/**
 * @desc    Update a tournament by ID
 * @route   PUT /api/tournaments/:id
 * @access  Private (JWT Protected)
 */
export const updateTournament = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    format,
    venue,
    start_date,
    end_date,
    total_teams,
    overs,
    status,
    winner_team
  } = req.body;

  try {
    // 1. Verify existence
    const [existingCheck] = await db.query("SELECT id FROM tournaments WHERE id = ?", [id]);
    if (existingCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tournament not found"
      });
    }

    // 2. Missing fields validation
    if (!name || !format || !venue || !start_date || !end_date || total_teams === undefined || overs === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields: name, format, venue, start_date, end_date, total_teams, overs"
      });
    }

    const teamsCount = Number(total_teams);
    const oversCount = Number(overs);

    if (isNaN(teamsCount) || teamsCount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Total teams must be a number greater than 0"
      });
    }

    if (isNaN(oversCount) || oversCount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Overs must be a number greater than 0"
      });
    }

    // 3. Date check
    const start = new Date(start_date);
    const end = new Date(end_date);
    if (end < start) {
      return res.status(400).json({
        success: false,
        message: "End date must be greater than or equal to start date"
      });
    }

    // 4. Duplicate name check excluding own ID
    const [duplicateName] = await db.query("SELECT id FROM tournaments WHERE name = ? AND id != ?", [
      name.trim(),
      id
    ]);
    if (duplicateName.length > 0) {
      return res.status(400).json({
        success: false,
        message: "A tournament with this name already exists"
      });
    }

    // 5. Update statement
    await db.query(
      `UPDATE tournaments 
       SET name = ?, description = ?, format = ?, venue = ?, 
           start_date = ?, end_date = ?, total_teams = ?, overs = ?, 
           status = ?, winner_team = ? 
       WHERE id = ?`,
      [
        name.trim(),
        description || null,
        format.trim(),
        venue.trim(),
        start_date,
        end_date,
        teamsCount,
        oversCount,
        status || "Upcoming",
        winner_team || null,
        id
      ]
    );

    const [[updatedTourn]] = await db.query("SELECT * FROM tournaments WHERE id = ?", [id]);

    return res.status(200).json({
      success: true,
      message: "Tournament updated successfully",
      data: updatedTourn,
      tournament: updatedTourn
    });
  } catch (error) {
    console.error("Error updating tournament:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while updating the tournament"
    });
  }
};

/**
 * @desc    Delete a tournament by ID
 * @route   DELETE /api/tournaments/:id
 * @access  Private (JWT Protected)
 */
export const deleteTournament = async (req, res) => {
  const { id } = req.params;

  try {
    const [existingCheck] = await db.query("SELECT id FROM tournaments WHERE id = ?", [id]);
    if (existingCheck.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tournament not found"
      });
    }

    await db.query("DELETE FROM tournaments WHERE id = ?", [id]);

    return res.status(200).json({
      success: true,
      message: "Tournament deleted successfully",
      data: null
    });
  } catch (error) {
    console.error("Error deleting tournament:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while deleting the tournament"
    });
  }
};

/**
 * @desc    Search tournaments quickly
 * @route   GET /api/tournaments/search
 * @access  Private (JWT Protected)
 */
export const searchTournaments = async (req, res) => {
  const query = req.query.q || "";

  try {
    const [rows] = await db.query(
      `SELECT id, name, format, venue, status 
       FROM tournaments 
       WHERE name LIKE ? OR venue LIKE ? 
       LIMIT 10`,
      [`%${query}%`, `%${query}%`]
    );

    return res.status(200).json({
      success: true,
      tournaments: rows
    });
  } catch (error) {
    console.error("Error searching tournaments:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred during search query"
    });
  }
};

/**
 * @desc    Get summary tournament status stats
 * @route   GET /api/tournaments/stats
 * @access  Private (JWT Protected)
 */
export const getTournamentStats = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT status, COUNT(*) AS count 
       FROM tournaments 
       GROUP BY status`
    );

    const stats = {
      Upcoming: 0,
      Ongoing: 0,
      Completed: 0
    };

    rows.forEach((row) => {
      if (stats[row.status] !== undefined) {
        stats[row.status] = row.count;
      }
    });

    return res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    console.error("Error retrieving tournament stats:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while loading stats summary"
    });
  }
};
