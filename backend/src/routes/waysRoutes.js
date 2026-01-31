import express from "express";
import {
  getAllWays,
  getWayById,
  getLevelByNumber,
} from "../controllers/waysControllerMySQL.js";

const router = express.Router();

//========================================
// ROUTES API - /api/ways
// ========================================

//GET /api/ways - Toutes les voies
router.get("/", getAllWays);

// GET /api/ways/:id - Une voie spécifique
router.get("/:id", getWayById);

// GET /api/ways/:wayId/levels/:levelNumber - Un niveau spécifique
router.get("/:wayId/levels/:levelNumber", getLevelByNumber);

export default router;
