import express from "express";
import {
  getAllWays,
  getWayById,
  getLevelById,
} from "../controllers/waysController.js";

const router = express.Router();

//========================================
// ROUTES API - /api/ways
// ========================================

//GET /api/ways - Toutes les voies
router.get("/", getAllWays);

// GET /api/ways/:id - Une voie spécifique
router.get("/:id", getWayById);

// GET /api/ways/:wayId/levels/:levelId - Un niveau spécifique
router.get("/:wayId/levels/:levelId", getLevelById);

export default router;
