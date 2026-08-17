import jwt from "jsonwebtoken";
import { findById } from "../models/adminModel.js";

/**
 * Protect private endpoints using JSON Web Tokens (JWT).
 * Verifies authorization headers and attaches authenticated admin to the request context.
 */
export const protect = async (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token (Format: "Bearer <token>")
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      let decoded;
      try {
        decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || "cricpro_local_jwt_secret_dev_key_change_me"
        );
      } catch (jwtError) {
        console.error("JWT verification error (invalid token):", jwtError.message);
        return res.status(401).json({
          success: false,
          message: "Invalid or expired authentication token."
        });
      }

      // Fetch admin details from database (excluding password details)
      let admin;
      try {
        admin = await findById(decoded.id);
      } catch (dbError) {
        console.error("Database query error (findById) during auth:", dbError);
        return res.status(500).json({
          success: false,
          message: "Database connection/query error while validating authentication."
        });
      }

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "User session is no longer valid."
        });
      }

      // Attach admin user record to request context
      req.admin = admin;
      return next();
    } catch (error) {
      console.error("General auth middleware error:", error);
      return res.status(500).json({
        success: false,
        message: "An internal server error occurred while processing authentication."
      });
    }
  }

  // Handle missing token scenario
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token provided"
    });
  }
};

export default {
  protect
};
