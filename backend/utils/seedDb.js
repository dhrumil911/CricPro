import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory path in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
dotenv.config({ path: path.join(__dirname, "../.env") });

const seedDatabase = async () => {
  const host = process.env.DB_HOST || "localhost";
  const user = process.env.DB_USER || "root";
  const password = process.env.DB_PASSWORD || "";
  const dbName = process.env.DB_NAME || "cricpro_db";
  const port = parseInt(process.env.DB_PORT || "3306");

  console.log(`⏳ Seeding database on host: ${host}:${port}...`);

  let connection;
  try {
    // 1. Connect without database to verify creation
    connection = await mysql.createConnection({ host, user, password, port });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    await connection.query(`USE ${dbName}`);
    console.log(`✅ Database "${dbName}" verified.`);

    // 2. Read schema.sql content
    const schemaPath = path.join(__dirname, "../../database/schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf-8");
    
    // Strip single-line comments
    const schemaSqlClean = schemaSql
      .split("\n")
      .filter(line => !line.trim().startsWith("--") && !line.trim().startsWith("#"))
      .join("\n");

    // Split SQL commands by semicolon
    const sqlCommands = schemaSqlClean
      .split(";")
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0);

    // Drop tables if they exist first, to support schema migrations
    console.log("⏳ Dropping existing tables for clean schema migration...");
    await connection.query("SET FOREIGN_KEY_CHECKS = 0");
    await connection.query("DROP TABLE IF EXISTS matches");
    await connection.query("DROP TABLE IF EXISTS players");
    await connection.query("DROP TABLE IF EXISTS teams");
    await connection.query("DROP TABLE IF EXISTS tournaments");
    await connection.query("DROP TABLE IF EXISTS admins");
    await connection.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("✅ Tables dropped.");

    console.log("⏳ Initializing schema tables...");
    for (const command of sqlCommands) {
      if (command.toUpperCase().startsWith("USE")) continue;
      await connection.query(command);
    }
    console.log("✅ Database schema tables created successfully.");

    // 4. Seed Tournaments
    console.log("⏳ Seeding tournaments...");
    const tournaments = [
      ["IPL 2026", "Indian Premier League 2026 Edition", "League", "Mumbai & Pune", "2026-03-28", "2026-05-24", 12, 20, "Ongoing", null],
      ["GPL 2026", "Gujarat Premier League 2026 Edition", "Knockout", "Surat Stadium", "2026-04-10", "2026-04-28", 16, 20, "Upcoming", null],
      ["Champions Cup", "Champions Cup Cricket Tournament", "Group Stage", "Rajkot Arena", "2026-01-01", "2026-01-20", 8, 20, "Completed", "MI"]
    ];
    for (const tourn of tournaments) {
      await connection.query(
        "INSERT INTO tournaments (name, description, format, venue, start_date, end_date, total_teams, overs, status, winner_team) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        tourn
      );
    }

    // Get tournament IDs
    const [[{ id: iplId }]] = await connection.query("SELECT id FROM tournaments WHERE name = 'IPL 2026'");
    const [[{ id: champId }]] = await connection.query("SELECT id FROM tournaments WHERE name = 'Champions Cup'");

    // 5. Seed Teams
    console.log("⏳ Seeding teams...");
    const teams = [
      ["Mumbai Indians", "MI", "mi_logo.png", "Hardik Pandya", "Mark Boucher", "Wankhede Stadium", 2008, "Five-time IPL champions based in Mumbai.", "Active", 10, 4, 20, 0.852],
      ["Chennai Super Kings", "CSK", "csk_logo.png", "Ruturaj Gaikwad", "Stephen Fleming", "M.A. Chidambaram Stadium", 2008, "Five-time IPL champions based in Chennai.", "Active", 8, 6, 16, 0.420],
      ["Royal Challengers Bengaluru", "RCB", "rcb_logo.png", "Faf du Plessis", "Andy Flower", "M. Chinnaswamy Stadium", 2008, "Popular franchise based in Bengaluru.", "Active", 7, 7, 14, -0.125],
      ["Gujarat Titans", "GT", "gt_logo.png", "Shubman Gill", "Ashish Nehra", "Narendra Modi Stadium", 2021, "IPL 2022 champions based in Ahmedabad.", "Active", 7, 7, 14, 0.102],
      ["Kolkata Knight Riders", "KKR", "kkr_logo.png", "Shreyas Iyer", "Chandrakant Pandit", "Eden Gardens", 2008, "Three-time IPL champions based in Kolkata.", "Active", 6, 8, 12, -0.320],
      ["Rajasthan Royals", "RR", "rr_logo.png", "Sanju Samson", "Kumar Sangakkara", "Sawai Mansingh Stadium", 2008, "Inaugural IPL champions based in Jaipur.", "Active", 8, 6, 16, 0.250],
      ["Lucknow Super Giants", "LSG", "lsg_logo.png", "KL Rahul", "Justin Langer", "Ekana Cricket Stadium", 2021, "Lucknow-based IPL franchise.", "Active", 6, 8, 12, -0.110],
      ["Sunrisers Hyderabad", "SRH", "srh_logo.png", "Pat Cummins", "Daniel Vettori", "Rajiv Gandhi Intl Stadium", 2012, "IPL 2016 champions based in Hyderabad.", "Active", 9, 5, 18, 0.560]
    ];
    for (const team of teams) {
      await connection.query(
        "INSERT INTO teams (team_name, short_name, logo, captain, coach, home_ground, founded_year, description, status, wins, losses, points, nrr) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        team
      );
    }

    // Get team IDs
    const [[{ id: miId }]] = await connection.query("SELECT id FROM teams WHERE short_name = 'MI'");
    const [[{ id: cskId }]] = await connection.query("SELECT id FROM teams WHERE short_name = 'CSK'");
    const [[{ id: rcbId }]] = await connection.query("SELECT id FROM teams WHERE short_name = 'RCB'");
    const [[{ id: gtId }]] = await connection.query("SELECT id FROM teams WHERE short_name = 'GT'");
    const [[{ id: kkrId }]] = await connection.query("SELECT id FROM teams WHERE short_name = 'KKR'");

    // 6. Seed Players
    console.log("⏳ Seeding players...");
    const players = [
      ["Rohit Sharma", miId, "Batsman", 450, 0, 24, 38, 135.50, 0.00, 14],
      ["Jasprit Bumrah", miId, "Bowler", 25, 22, 1, 2, 90.00, 6.45, 14],
      ["MS Dhoni", cskId, "Wicket-keeper", 280, 0, 18, 15, 155.60, 0.00, 14],
      ["Ravindra Jadeja", cskId, "All-rounder", 210, 14, 10, 12, 125.00, 7.20, 14],
      ["Virat Kohli", rcbId, "Batsman", 620, 0, 28, 52, 142.80, 0.00, 14],
      ["Mohammed Siraj", rcbId, "Bowler", 12, 16, 0, 1, 65.00, 8.10, 14],
      ["Shubman Gill", gtId, "Batsman", 510, 0, 15, 45, 138.20, 0.00, 14],
      ["Rashid Khan", gtId, "Bowler", 110, 18, 8, 6, 145.00, 6.80, 14],
      ["Shreyas Iyer", kkrId, "Batsman", 390, 0, 12, 30, 128.50, 0.00, 14],
      ["Sunil Narine", kkrId, "All-rounder", 180, 15, 12, 14, 165.20, 6.15, 14]
    ];
    for (const player of players) {
      await connection.query(
        "INSERT INTO players (name, team_id, role, runs, wickets, sixes, fours, strike_rate, economy, matches_played) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        player
      );
    }

    // 7. Seed Matches
    console.log("⏳ Seeding matches...");
    const matches = [
      [iplId, miId, cskId, "2026-08-12", "19:30", "Wankhede Stadium", "Completed", "MI won by 8 wickets", "CSK 162/6 (20)", "MI 164/2 (17.4)", 20.0],
      [iplId, rcbId, gtId, "2026-07-30", "20:00", "M. Chinnaswamy Stadium", "Completed", "RCB won by 5 runs", "RCB 184/5 (20)", "GT 179/7 (20)", 20.0],
      [iplId, kkrId, miId, "2026-08-16", "19:30", "Arun Jaitley Stadium", "Upcoming", null, null, null, 0.0],
      [iplId, cskId, gtId, "2026-08-18", "20:00", "M.A. Chidambaram Stadium", "Upcoming", null, null, null, 0.0],
      [champId, rcbId, gtId, "2026-07-26", "19:30", "Narendra Modi Stadium", "Live", "Gujarat Titans need 143 runs from 87 balls.", "RCB 184/5 (20)", "GT 42/2 (5.3)", 5.3]
    ];
    for (const match of matches) {
      await connection.query(
        "INSERT INTO matches (tournament_id, team_a_id, team_b_id, match_date, match_time, venue, status, result, team_a_score, team_b_score, overs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        match
      );
    }

    console.log("🎉 Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
  } finally {
    if (connection) await connection.end();
  }
};

seedDatabase();
