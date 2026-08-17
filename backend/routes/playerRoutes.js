import express from "express";
import {
  createPlayer,
  getPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
  getPlayerStats,
  getPlayerDropdown
} from "../controllers/playerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Stats & Dropdown selectors (mount before dynamic id routes)
router.get("/stats", protect, getPlayerStats);
router.get("/dropdown", protect, getPlayerDropdown);

// Standard CRUD endpoints
router.post("/", protect, createPlayer);
router.get("/", protect, getPlayers);

router.get("/:id", protect, getPlayerById);
router.put("/:id", protect, updatePlayer);
router.delete("/:id", protect, deletePlayer);

export default router;
