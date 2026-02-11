import { WayModel } from "../models/Way.model.js";
import { LevelModel } from "../models/Level.model.js";

// Le reste du code reste identique

// GET /api/ways - Toutes les voies
export const getAllWays = async (req, res) => {
  try {
    const ways = await WayModel.findAll();

    // Pour chaque voie, récupérer ses niveaux
    const waysWithLevels = await Promise.all(
      ways.map(async (way) => {
        const levels = await LevelModel.findByWayId(way.id);
        return {
          ...way,
          levels,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: waysWithLevels.length,
      data: waysWithLevels,
    });
  } catch (error) {
    console.error("❌ Erreur getAllWays:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération des voies",
    });
  }
};

// GET /api/ways/:id - Une voie spécifique
export const getWayById = async (req, res) => {
  try {
    const wayId = parseInt(req.params.id);

    if (isNaN(wayId)) {
      return res.status(400).json({
        success: false,
        error: "ID invalide",
      });
    }

    const way = await WayModel.findById(wayId);

    if (!way) {
      return res.status(404).json({
        success: false,
        error: "Voie non trouvée",
      });
    }

    // Récupérer les niveaux de cette voie
    const levels = await LevelModel.findByWayId(wayId);

    res.status(200).json({
      success: true,
      data: {
        ...way,
        levels,
      },
    });
  } catch (error) {
    console.error("❌ Erreur getWayById:", error);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};

// GET /api/ways/:wayId/levels/:levelNumber
export const getLevelByNumber = async (req, res) => {
  try {
    const wayId = parseInt(req.params.wayId);
    const levelNumber = parseInt(req.params.levelNumber);

    if (isNaN(wayId) || isNaN(levelNumber)) {
      return res.status(400).json({
        success: false,
        error: "Paramètres invalides",
      });
    }

    const level = await LevelModel.findByWayAndNumber(wayId, levelNumber);

    if (!level) {
      return res.status(404).json({
        success: false,
        error: "Niveau non trouvé",
      });
    }

    res.status(200).json({
      success: true,
      data: level,
    });
  } catch (error) {
    console.error("❌ Erreur getLevelByNumber:", error);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};
