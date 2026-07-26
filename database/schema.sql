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

-- Seed default administrator (Credentials: admin@cricpro.com / AdminPassword123)
-- Only inserts if the admin does not already exist
INSERT INTO admins (name, email, password)
SELECT 'CricPro Admin', 'admin@cricpro.com', '$2b$10$Cvjg1eKNPgZlFZYhHGFqqu0b32djbZzJVLEgMqiVDGJj9H9zddaf2'
WHERE NOT EXISTS (
    SELECT 1 FROM admins WHERE email = 'admin@cricpro.com'
);
