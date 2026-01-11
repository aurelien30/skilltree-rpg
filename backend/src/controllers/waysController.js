import { ways } from "../data/skillsData.js";
import { getAllWaysWithData, getCompleteWayData } from "../data/skillsData.js";

//========================================
// CONTRÔLEURS - Logique métier
// ========================================

// GET /api/ways - Récupérer toutes les voies
export const getAllWays = (req, res) => {
  try {
    const ways = getAllWaysWithData();
    res.status(200).json({
      success: true,
      count: ways.length,
      data: ways,
    });
  } catch (error) {
    console.Error("Error getting ways:", error);
    res.status(500).json({
      success: false,
      error: "Error getting ways",
    });
  }
};

//GET /api/ways/:id - Récupérer une voie spécifique
export const getWayById = (req, res) => {
  try {
    const wayId = parseInt(req.params.id);

    if (isNaN(wayId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid way ID",
      });
    }

    const way = getCompleteWayData(wayId);

    if (!way) {
      return res.status(404).json({
        success: false,
        error: "Way not found",
      });
    }

    res.status(200).json({
      success: true,
      data: way,
    });
  } catch (error) {
    console.Error("Error getting way:", error);
    res.status(500).json({
      success: false,
      error: "Error getting way",
    });
  }
};

// GET /api/ways/:wayId/levels/:levelId - Récupérer un niveau spécifique
export const getLevelById = (req, res) => {
  try {
    const wayId = parseInt(req.params.wayId);
    const levelId = parseInt(req.params.levelId);

    const way = getCompleteWayData(wayId);

    if (!way) {
      return res.status(404).json({
        success: false,
        error: "Way not found",
      });
    }

    const level = way.levels.find((l) => l.id === levelId);

    if (!level) {
      return res.status(404).json({
        success: false,
        error: "Level not found",
      });
    }

    res.status(200).json({
      success: true,
      data: level,
    });
  } catch (error) {
    console.Error("Error getting level:", error);
    res.status(500).json({
      success: false,
      error: "Error getting level",
    });
  }
};
