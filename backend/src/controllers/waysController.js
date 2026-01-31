import express from "express";
import {
  getAllWays,
  getWayById,
  getLevelByNumber,
} from "../controllers/waysControllerMySQL.js";

const router = express.Router();

// Routes (pas de changement)
router.get("/", getAllWays);
router.get("/:id", getWayById);
router.get("/:wayId/levels/:levelNumber", getLevelByNumber);

export default router;
