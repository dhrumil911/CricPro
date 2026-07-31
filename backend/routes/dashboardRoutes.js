import express from "express";
import {
  getDashboardStats,
  getDashboardMatches,
  getDashboardLeaders,
  getDashboardCharts
} from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get dashboard summaries
router.get("/stats", protect, getDashboardStats);

// Get dashboard matches
router.get("/matches", protect, getDashboardMatches);

// Get statistics leaders
router.get("/leaders", protect, getDashboardLeaders);

// Get charts datasets
router.get("/charts", protect, getDashboardCharts);

export default router;
