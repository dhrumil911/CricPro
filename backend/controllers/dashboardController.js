import db from "../config/db.js";

/**
 * @desc    Get dashboard summary statistics
 * @route   GET /api/dashboard/stats
 * @access  Private
 */
export const getDashboardStats = async (req, res) => {
  try {
    const [[{ total: tournaments }]] = await db.query("SELECT COUNT(*) AS total FROM tournaments");
    const [[{ total: teams }]] = await db.query("SELECT COUNT(*) AS total FROM teams");
    const [[{ total: players }]] = await db.query("SELECT COUNT(*) AS total FROM players");
    const [[{ total: matches }]] = await db.query("SELECT COUNT(*) AS total FROM matches");
    const [[{ total: completed }]] = await db.query("SELECT COUNT(*) AS total FROM matches WHERE status = 'Completed'");
    const [[{ total: upcoming }]] = await db.query("SELECT COUNT(*) AS total FROM matches WHERE status = 'Upcoming'");
    const [[{ total: live }]] = await db.query("SELECT COUNT(*) AS total FROM matches WHERE status = 'Live'");

    return res.status(200).json({
      success: true,
      stats: {
        tournaments,
        teams,
        players,
        matches,
        completed,
        upcoming,
        live
      }
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while retrieving dashboard statistics"
    });
  }
};

/**
 * @desc    Get dashboard matches (Recent and Upcoming)
 * @route   GET /api/dashboard/matches
 * @access  Private
 */
export const getDashboardMatches = async (req, res) => {
  try {
    // 1. Fetch recent completed matches
    const [recent] = await db.query(`
      SELECT m.id, DATE_FORMAT(m.match_date, '%Y-%m-%d') AS date, m.match_time AS time, m.venue, m.status, m.result, m.team_a_score, m.team_b_score,
             t1.short_name AS teamA, t2.short_name AS teamB, tr.name AS tournamentName
      FROM matches m
      JOIN teams t1 ON m.team_a_id = t1.id
      JOIN teams t2 ON m.team_b_id = t2.id
      JOIN tournaments tr ON m.tournament_id = tr.id
      WHERE m.status = 'Completed'
      ORDER BY m.match_date DESC, m.id DESC
      LIMIT 5
    `);

    // 2. Fetch upcoming fixtures
    const [upcoming] = await db.query(`
      SELECT m.id, DATE_FORMAT(m.match_date, '%Y-%m-%d') AS date, m.match_time AS time, m.venue, m.status,
             t1.short_name AS teamA, t2.short_name AS teamB, tr.name AS tournamentName
      FROM matches m
      JOIN teams t1 ON m.team_a_id = t1.id
      JOIN teams t2 ON m.team_b_id = t2.id
      JOIN tournaments tr ON m.tournament_id = tr.id
      WHERE m.status = 'Upcoming'
      ORDER BY m.match_date ASC, m.id ASC
      LIMIT 5
    `);

    // 3. Fetch live match details (single main highlight match)
    const [liveMatches] = await db.query(`
      SELECT m.id, DATE_FORMAT(m.match_date, '%Y-%m-%d') AS date, m.match_time AS time, m.venue, m.status, m.result, m.team_a_score, m.team_b_score, m.overs,
             t1.short_name AS teamA, t2.short_name AS teamB, tr.name AS tournamentName
      FROM matches m
      JOIN teams t1 ON m.team_a_id = t1.id
      JOIN teams t2 ON m.team_b_id = t2.id
      JOIN tournaments tr ON m.tournament_id = tr.id
      WHERE m.status = 'Live'
      ORDER BY m.match_date DESC
      LIMIT 1
    `);

    return res.status(200).json({
      success: true,
      matches: {
        recent: recent.map(m => ({ ...m, teams: `${m.teamA} vs ${m.teamB}` })),
        upcoming: upcoming.map(m => ({ ...m, teams: `${m.teamA} vs ${m.teamB}` })),
        live: liveMatches.length > 0 ? { ...liveMatches[0], teams: `${liveMatches[0].teamA} vs ${liveMatches[0].teamB}` } : null
      }
    });
  } catch (error) {
    console.error("Error fetching dashboard matches:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while retrieving match fixtures"
    });
  }
};

/**
 * @desc    Get dashboard statistics leaders
 * @route   GET /api/dashboard/leaders
 * @access  Private
 */
export const getDashboardLeaders = async (req, res) => {
  try {
    // Top Scorer
    const [[topScorer]] = await db.query(`
      SELECT p.player_name AS name, p.runs, p.strike_rate AS strikeRate, t.short_name AS teamName
      FROM players p
      LEFT JOIN teams t ON p.team_id = t.id
      ORDER BY p.runs DESC
      LIMIT 1
    `);

    // Top Wicket Taker
    const [[topWicketTaker]] = await db.query(`
      SELECT p.player_name AS name, p.wickets, p.economy, t.short_name AS teamName
      FROM players p
      LEFT JOIN teams t ON p.team_id = t.id
      ORDER BY p.wickets DESC
      LIMIT 1
    `);

    // Most Sixes
    const [[mostSixes]] = await db.query(`
      SELECT p.player_name AS name, p.sixes, t.short_name AS teamName
      FROM players p
      LEFT JOIN teams t ON p.team_id = t.id
      ORDER BY p.sixes DESC
      LIMIT 1
    `);

    // Most Fours
    const [[mostFours]] = await db.query(`
      SELECT p.player_name AS name, p.fours, t.short_name AS teamName
      FROM players p
      LEFT JOIN teams t ON p.team_id = t.id
      ORDER BY p.fours DESC
      LIMIT 1
    `);

    // Best Strike Rate (min 100 runs)
    const [[bestStrikeRate]] = await db.query(`
      SELECT p.player_name AS name, p.strike_rate AS strikeRate, p.runs, t.short_name AS teamName
      FROM players p
      LEFT JOIN teams t ON p.team_id = t.id
      WHERE p.runs >= 100
      ORDER BY p.strike_rate DESC
      LIMIT 1
    `);

    // Best Economy (min 5 matches played)
    const [[bestEconomy]] = await db.query(`
      SELECT p.player_name AS name, p.economy, p.wickets, t.short_name AS teamName
      FROM players p
      LEFT JOIN teams t ON p.team_id = t.id
      WHERE p.matches_played >= 5
      ORDER BY p.economy ASC
      LIMIT 1
    `);

    return res.status(200).json({
      success: true,
      leaders: {
        topScorer: topScorer || null,
        topWicketTaker: topWicketTaker || null,
        mostSixes: mostSixes || null,
        mostFours: mostFours || null,
        bestStrikeRate: bestStrikeRate || null,
        bestEconomy: bestEconomy || null
      }
    });
  } catch (error) {
    console.error("Error fetching dashboard statistics leaders:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while retrieving statistics leaders"
    });
  }
};

/**
 * @desc    Get dashboard charts datasets
 * @route   GET /api/dashboard/charts
 * @access  Private
 */
export const getDashboardCharts = async (req, res) => {
  try {
    // 1. Tournament Growth / Match Counts per Month
    const [growthRows] = await db.query(`
      SELECT DATE_FORMAT(match_date, '%b') AS name, COUNT(*) AS Tournaments
      FROM matches
      GROUP BY MONTH(match_date), name
      ORDER BY MONTH(match_date)
    `);

    // Fallback if empty
    const growthData = growthRows.length > 0 ? growthRows : [
      { name: "Jan", Tournaments: 2 },
      { name: "Feb", Tournaments: 4 },
      { name: "Mar", Tournaments: 7 },
      { name: "Apr", Tournaments: 9 },
      { name: "May", Tournaments: 12 }
    ];

    // 2. Team Performance (Wins)
    const [teamRows] = await db.query(`
      SELECT short_name AS name, wins AS Wins
      FROM teams
      ORDER BY wins DESC
      LIMIT 5
    `);
    const teamColors = ["#2563eb", "#eab308", "#ef4444", "#6366f1", "#a855f7"];
    const teamPerformanceData = teamRows.map((t, idx) => ({
      ...t,
      color: teamColors[idx % teamColors.length]
    }));

    // 3. Match Status breakdown
    const [statusRows] = await db.query(`
      SELECT status AS name, COUNT(*) AS value
      FROM matches
      GROUP BY status
    `);
    const statusColors = {
      "Upcoming": "#facc15",
      "Live": "#ef4444",
      "Completed": "#22c55e"
    };
    const matchStatusData = statusRows.map(s => ({
      ...s,
      color: statusColors[s.name] || "#3b82f6"
    }));

    // 4. Player Registration / Role distribution
    const [roleRows] = await db.query(`
      SELECT role AS name, COUNT(*) AS value
      FROM players
      GROUP BY role
    `);

    return res.status(200).json({
      success: true,
      charts: {
        growthData,
        teamPerformanceData,
        matchStatusData,
        playerRoleData: roleRows
      }
    });
  } catch (error) {
    console.error("Error fetching dashboard charts data:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while retrieving charts datasets"
    });
  }
};
