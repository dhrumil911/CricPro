import jwt from "jsonwebtoken";

/**
 * Generate a JWT token for the authenticated administrator.
 * @param {number} id - The admin ID.
 * @returns {string} The signed JWT token.
 */
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || "cricpro_local_jwt_secret_dev_key_change_me",
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    }
  );
};

export default generateToken;
