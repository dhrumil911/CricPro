import express from "express";
import { loginAdmin, getAdminProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public login route
router.post("/login", loginAdmin);

// Protected admin profile route
router.get("/profile", protect, getAdminProfile);

export default router;
