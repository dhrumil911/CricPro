import express from "express";
import {
  createTournament,
  getTournaments,
  getTournamentById,
  updateTournament,
  deleteTournament,
  searchTournaments,
  getTournamentStats
} from "../controllers/tournamentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Search and Stats aggregations (mount before dynamic parameterized id route)
router.get("/search", protect, searchTournaments);
router.get("/stats", protect, getTournamentStats);

// Standard endpoints
router.post("/", protect, createTournament);
router.get("/", protect, getTournaments);

router.get("/:id", protect, getTournamentById);
router.put("/:id", protect, updateTournament);
router.delete("/:id", protect, deleteTournament);

export default router;
