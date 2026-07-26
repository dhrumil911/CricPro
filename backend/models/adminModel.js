import db from "../config/db.js";
import bcrypt from "bcrypt";

/**
 * Find an admin record by email.
 * @param {string} email - The email to search for.
 * @returns {Object|null} The admin record or null.
 */
export const findByEmail = async (email) => {
  try {
    const [rows] = await db.query("SELECT * FROM admins WHERE email = ?", [email]);
    if (rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    throw new Error(`Database query error (findByEmail): ${error.message}`);
  }
};

/**
 * Find an admin record by ID, excluding sensitive fields (like password).
 * @param {number} id - The admin ID to lookup.
 * @returns {Object|null} The admin profile details or null.
 */
export const findById = async (id) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, email, created_at, updated_at FROM admins WHERE id = ?",
      [id]
    );
    if (rows.length === 0) return null;
    return rows[0];
  } catch (error) {
    throw new Error(`Database query error (findById): ${error.message}`);
  }
};

/**
 * Verify a plain text password against the stored bcrypt hash.
 * @param {string} plainPassword - The password input.
 * @param {string} hashedPassword - The hashed password stored in DB.
 * @returns {boolean} True if password matches.
 */
export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export default {
  findByEmail,
  findById,
  comparePassword
};
