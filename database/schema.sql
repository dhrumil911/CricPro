-- Create database if not exists
CREATE DATABASE IF NOT EXISTS cricpro_db;
USE cricpro_db;

-- Admins table for authentication
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT DEFAULT NULL,
  format VARCHAR(100) NOT NULL, -- League / Knockout / Group Stage
  venue VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_teams INT NOT NULL,
  overs INT NOT NULL,
  status VARCHAR(50) DEFAULT 'Upcoming', -- Upcoming / Ongoing / Completed
  winner_team VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL, -- e.g. MI, CSK, RCB, GT, KKR
  fullname VARCHAR(255) NOT NULL,
  logo VARCHAR(255),
  wins INT DEFAULT 0,
  losses INT DEFAULT 0,
  points INT DEFAULT 0,
  nrr DECIMAL(5,3) DEFAULT 0.000,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Players table with career statistics
CREATE TABLE IF NOT EXISTS players (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  team_id INT,
  role VARCHAR(100) NOT NULL, -- e.g. Batsman, Bowler, All-rounder, Wicket-keeper
  runs INT DEFAULT 0,
  wickets INT DEFAULT 0,
  sixes INT DEFAULT 0,
  fours INT DEFAULT 0,
  strike_rate DECIMAL(6,2) DEFAULT 0.00,
  economy DECIMAL(4,2) DEFAULT 0.00,
  matches_played INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tournament_id INT,
  team_a_id INT,
  team_b_id INT,
  match_date DATE NOT NULL,
  match_time VARCHAR(50) NOT NULL, -- e.g. 19:30, 20:00
  venue VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'Upcoming', -- e.g. Upcoming, Live, Completed
  result VARCHAR(255) DEFAULT NULL,
  team_a_score VARCHAR(50) DEFAULT NULL,
  team_b_score VARCHAR(50) DEFAULT NULL,
  overs DECIMAL(3,1) DEFAULT 0.0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (tournament_id) REFERENCES tournaments(id) ON DELETE CASCADE,
  FOREIGN KEY (team_a_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (team_b_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Seed default administrator (Credentials: admin@cricpro.com / AdminPassword123)
-- Only inserts if the admin does not already exist
INSERT INTO admins (name, email, password)
SELECT 'CricPro Admin', 'admin@cricpro.com', '$2b$10$Cvjg1eKNPgZlFZYhHGFqqu0b32djbZzJVLEgMqiVDGJj9H9zddaf2'
WHERE NOT EXISTS (
    SELECT 1 FROM admins WHERE email = 'admin@cricpro.com'
);
