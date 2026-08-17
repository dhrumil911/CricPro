import { findByEmail, comparePassword } from "../models/adminModel.js";
import generateToken from "../utils/generateToken.js";
 
/**
 * @desc    Authenticate admin & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginAdmin = async (req, res) => {
  let { email, password } = req.body;
 
  try {
    // 1. Validate payload attributes presence
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password"
      });
    }
 
    // Trim whitespace/newlines that often sneak in via copy-paste
    email = email.trim();
    password = password.trim();
 
    // 2. Validate email structure format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address"
      });
    }
 
    // 3. Find administrator details by email
    const admin = await findByEmail(email);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }
 
    // 4. Compare input credentials with database password hash
    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }
 
    // 5. Generate JSON Web Token
    const token = generateToken(admin.id);
 
    // 6. Return response payload omitting password details
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
      stack: process.env.NODE_ENV !== "production" ? error.stack : undefined
    });
  }
};
 
/**
 * @desc    Get authenticated administrator profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
export const getAdminProfile = async (req, res) => {
  try {
    // req.admin is already attached via authMiddleware
    return res.status(200).json({
      success: true,
      admin: req.admin
    });
  } catch (error) {
    console.error("Profile controller error:", error.message);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while retrieving profile"
    });
  }
};
 
export default {
  loginAdmin,
  getAdminProfile
};
 