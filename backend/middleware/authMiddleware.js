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
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "cricpro_local_jwt_secret_dev_key_change_me"
      );

      // Fetch admin details from database (excluding password details)
      const admin = await findById(decoded.id);

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "Not authorized, admin record not found"
        });
      }

      // Attach admin user record to request context
      req.admin = admin;
      return next();
    } catch (error) {
      console.error("JWT verification error:", error.message);
      return res.status(401).json({
        success: false,
        message: "Not authorized, token verification failed"
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
