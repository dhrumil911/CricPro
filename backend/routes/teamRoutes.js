import express from "express";
import {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  getTeamStats,
  searchTeams,
  getTeamDropdown
} from "../controllers/teamController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Stats, Search & Dropdown selectors (mount before dynamic id routes)
router.get("/stats", protect, getTeamStats);
router.get("/search", protect, searchTeams);
router.get("/dropdown", protect, getTeamDropdown);

// Standard CRUD endpoints
router.post("/", protect, createTeam);
router.get("/", protect, getTeams);

router.get("/:id", protect, getTeamById);
router.put("/:id", protect, updateTeam);
router.delete("/:id", protect, deleteTeam);

export default router;
