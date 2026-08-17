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
  const host = process.env.DB_HOST || "127.0.0.1";
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
    const [[{ id: rrId }]] = await connection.query("SELECT id FROM teams WHERE short_name = 'RR'");
    const [[{ id: lsgId }]] = await connection.query("SELECT id FROM teams WHERE short_name = 'LSG'");
    const [[{ id: srhId }]] = await connection.query("SELECT id FROM teams WHERE short_name = 'SRH'");

    // 6. Seed Players (40 realistic IPL players across all 8 teams)
    console.log("⏳ Seeding players...");
    const players = [
      // MI (Mumbai Indians)
      ["Rohit Sharma", miId, "rohit.png", 45, "Batsman", "Right-hand bat", "Right-arm offbreak", "1987-04-30", "Indian", 250, 6200, 15, 260, 550, 130.50, 7.80, "Active"],
      ["Jasprit Bumrah", miId, "bumrah.png", 93, "Bowler", "Right-hand bat", "Right-arm fast", "1993-12-06", "Indian", 130, 80, 160, 1, 5, 90.00, 6.45, "Active"],
      ["Hardik Pandya", miId, "hardik.png", 33, "All-rounder", "Right-hand bat", "Right-arm fast-medium", "1993-10-11", "Indian", 140, 2500, 60, 120, 180, 145.00, 8.20, "Active"],
      ["Suryakumar Yadav", miId, "sky.png", 77, "Batsman", "Right-hand bat", "Right-arm offbreak", "1990-09-14", "Indian", 150, 3500, 0, 160, 320, 143.50, 0.00, "Active"],
      ["Ishan Kishan", miId, "ishan.png", 23, "Wicket-keeper", "Left-hand bat", "None", "1998-07-18", "Indian", 100, 2600, 0, 110, 240, 134.20, 0.00, "Active"],

      // CSK (Chennai Super Kings)
      ["MS Dhoni", cskId, "dhoni.png", 7, "Wicket-keeper", "Right-hand bat", "Right-arm medium", "1981-07-07", "Indian", 264, 5200, 0, 250, 360, 137.50, 0.00, "Active"],
      ["Ruturaj Gaikwad", cskId, "ruturaj.png", 31, "Batsman", "Right-hand bat", "Right-arm offbreak", "1997-01-31", "Indian", 60, 2200, 0, 80, 210, 135.20, 0.00, "Active"],
      ["Ravindra Jadeja", cskId, "jadeja.png", 8, "All-rounder", "Left-hand bat", "Left-arm orthodox", "1988-12-06", "Indian", 240, 2950, 160, 100, 200, 128.80, 7.60, "Active"],
      ["Matheesha Pathirana", cskId, "pathirana.png", 99, "Bowler", "Right-hand bat", "Right-arm fast", "2002-12-18", "Sri Lankan", 30, 10, 50, 0, 1, 85.00, 7.80, "Injured"],
      ["Shivam Dube", cskId, "dube.png", 27, "All-rounder", "Left-hand bat", "Right-arm medium", "1993-06-26", "Indian", 60, 1400, 5, 90, 110, 142.10, 8.50, "Active"],

      // RCB (Royal Challengers Bengaluru)
      ["Virat Kohli", rcbId, "kohli.png", 18, "Batsman", "Right-hand bat", "Right-arm medium", "1988-11-05", "Indian", 252, 8000, 4, 270, 700, 130.20, 8.80, "Active"],
      ["Faf du Plessis", rcbId, "faf.png", 13, "Batsman", "Right-hand bat", "Right-arm legbreak", "1984-07-13", "South African", 140, 4500, 0, 150, 410, 134.00, 0.00, "Active"],
      ["Glenn Maxwell", rcbId, "maxwell.png", 32, "All-rounder", "Right-hand bat", "Right-arm offbreak", "1988-10-14", "Australian", 130, 2800, 35, 160, 220, 156.50, 8.10, "Active"],
      ["Mohammed Siraj", rcbId, "siraj.png", 73, "Bowler", "Right-hand bat", "Right-arm fast", "1994-03-13", "Indian", 90, 80, 100, 2, 6, 85.00, 8.30, "Active"],
      ["Dinesh Karthik", rcbId, "dk.png", 19, "Wicket-keeper", "Right-hand bat", "Right-arm offbreak", "1985-06-01", "Indian", 250, 4800, 0, 145, 440, 135.30, 0.00, "Retired"],

      // GT (Gujarat Titans)
      ["Shubman Gill", gtId, "gill.png", 7, "Batsman", "Right-hand bat", "Right-arm offbreak", "1999-09-08", "Indian", 100, 3200, 0, 90, 310, 135.20, 0.00, "Active"],
      ["Rashid Khan", gtId, "rashid.png", 19, "All-rounder", "Right-hand bat", "Right-arm legbreak", "1998-09-20", "Afghan", 120, 500, 150, 50, 35, 142.50, 6.70, "Active"],
      ["Rahul Tewatia", gtId, "tewatia.png", 14, "All-rounder", "Left-hand bat", "Right-arm legbreak", "1993-05-20", "Indian", 90, 1000, 32, 60, 85, 132.80, 7.90, "Active"],
      ["Sai Sudharsan", gtId, "sudharsan.png", 22, "Batsman", "Left-hand bat", "Right-arm legbreak", "2001-10-15", "Indian", 30, 1000, 0, 25, 95, 138.00, 0.00, "Active"],
      ["David Miller", gtId, "miller.png", 10, "Batsman", "Left-hand bat", "Right-arm offbreak", "1989-06-10", "South African", 130, 2900, 0, 130, 210, 139.20, 0.00, "Active"],

      // KKR (Kolkata Knight Riders)
      ["Shreyas Iyer", kkrId, "shreyas.png", 41, "Batsman", "Right-hand bat", "Right-arm legbreak", "1994-12-06", "Indian", 110, 3100, 0, 100, 270, 126.50, 0.00, "Active"],
      ["Sunil Narine", kkrId, "narine.png", 74, "All-rounder", "Left-hand bat", "Right-arm offbreak", "1988-05-26", "West Indian", 170, 1500, 170, 110, 160, 162.80, 6.15, "Active"],
      ["Rinku Singh", kkrId, "rinku.png", 35, "Batsman", "Left-hand bat", "Right-arm offbreak", "1997-10-12", "Indian", 50, 900, 0, 55, 70, 145.20, 0.00, "Active"],
      ["Andre Russell", kkrId, "russell.png", 12, "All-rounder", "Right-hand bat", "Right-arm fast", "1988-04-29", "West Indian", 120, 2400, 100, 200, 150, 174.00, 8.90, "Active"],
      ["Varun Chakaravarthy", kkrId, "varun.png", 29, "Bowler", "Right-hand bat", "Right-arm legbreak", "1991-08-29", "Indian", 60, 20, 80, 0, 2, 70.00, 7.40, "Active"],

      // RR (Rajasthan Royals)
      ["Sanju Samson", rrId, "samson.png", 14, "Wicket-keeper", "Right-hand bat", "Right-arm offbreak", "1994-11-11", "Indian", 160, 4200, 0, 180, 330, 138.80, 0.00, "Active"],
      ["Yashasvi Jaiswal", rrId, "jaiswal.png", 19, "Batsman", "Left-hand bat", "Right-arm legbreak", "2001-12-28", "Indian", 40, 1400, 0, 60, 150, 145.20, 0.00, "Active"],
      ["Jos Buttler", rrId, "buttler.png", 63, "Wicket-keeper", "Right-hand bat", "None", "1990-09-08", "English", 100, 3500, 0, 150, 350, 147.50, 0.00, "Injured"],
      ["Yuzvendra Chahal", rrId, "chahal.png", 3, "Bowler", "Right-hand bat", "Right-arm legbreak", "1990-07-23", "Indian", 150, 50, 200, 0, 2, 75.00, 7.70, "Active"],
      ["Trent Boult", rrId, "boult.png", 18, "Bowler", "Right-hand bat", "Left-arm fast-medium", "1989-07-22", "New Zealander", 90, 40, 110, 1, 3, 80.00, 7.90, "Active"],

      // LSG (Lucknow Super Giants)
      ["KL Rahul", lsgId, "klrahul.png", 1, "Wicket-keeper", "Right-hand bat", "None", "1992-04-18", "Indian", 120, 4500, 0, 170, 380, 134.50, 0.00, "Active"],
      ["Nicholas Pooran", lsgId, "pooran.png", 29, "Batsman", "Left-hand bat", "Right-arm offbreak", "1995-10-02", "West Indian", 80, 1800, 0, 120, 120, 155.00, 0.00, "Active"],
      ["Marcus Stoinis", lsgId, "stoinis.png", 17, "All-rounder", "Right-hand bat", "Right-arm medium", "1989-08-16", "Australian", 90, 1700, 40, 80, 140, 140.80, 8.40, "Active"],
      ["Ravi Bishnoi", lsgId, "bishnoi.png", 56, "Bowler", "Right-hand bat", "Right-arm legbreak", "2000-09-05", "Indian", 60, 30, 70, 0, 1, 80.00, 7.50, "Active"],
      ["Quinton de Kock", lsgId, "qdk.png", 12, "Wicket-keeper", "Left-hand bat", "None", "1992-12-17", "South African", 100, 3100, 0, 110, 310, 134.00, 0.00, "Retired"],

      // SRH (Sunrisers Hyderabad)
      ["Pat Cummins", srhId, "cummins.png", 30, "All-rounder", "Right-hand bat", "Right-arm fast", "1993-05-08", "Australian", 60, 450, 60, 25, 35, 140.00, 8.10, "Active"],
      ["Travis Head", srhId, "head.png", 12, "Batsman", "Left-hand bat", "Right-arm offbreak", "1993-12-29", "Australian", 30, 900, 5, 45, 100, 158.00, 8.20, "Active"],
      ["Heinrich Klaasen", srhId, "klaasen.png", 45, "Wicket-keeper", "Right-hand bat", "Right-arm offbreak", "1991-07-30", "South African", 30, 950, 0, 65, 50, 165.80, 0.00, "Active"],
      ["Abhishek Sharma", srhId, "abhishek.png", 4, "All-rounder", "Left-hand bat", "Left-arm orthodox", "2000-09-04", "Indian", 50, 1200, 10, 70, 95, 150.20, 8.30, "Active"],
      ["Bhuvneshwar Kumar", srhId, "bhuvi.png", 15, "Bowler", "Right-hand bat", "Right-arm fast-medium", "1990-02-05", "Indian", 170, 250, 175, 5, 20, 95.00, 7.40, "Active"]
    ];
    for (const player of players) {
      await connection.query(
        "INSERT INTO players (player_name, team_id, profile_image, jersey_number, role, batting_style, bowling_style, date_of_birth, nationality, matches_played, runs, wickets, sixes, fours, strike_rate, economy, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
