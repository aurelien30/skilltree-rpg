import express from "express";
import {
  getAllWays,
  getWayById,
  getLevelByNumber,
} from "../controllers/ways.controller.js";

const router = express.Router();

// ========================================
// ROUTES WAYS (VOIES)
// ========================================

// GET /api/ways
router.get("/", getAllWays);

// GET /api/ways/:id
router.get("/:id", getWayById);

// GET /api/ways/:wayId/levels/:levelNumber
router.get("/:wayId/levels/:levelNumber", getLevelByNumber);

export default router;
