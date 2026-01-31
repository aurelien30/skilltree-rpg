import pool from "../config/mysql.js";

export const LevelModel = {
  // Récupère tous les niveaux d'une voie
  async findByWayId(wayId) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM levels WHERE way_id = ? ORDER BY number",
        [wayId]
      );
      return rows;
    } catch (error) {
      console.error("Erreur LevelModel.findByWayId:", error);
      throw error;
    }
  },

  // Récupère un niveau par voie et numéro
  async findByWayAndNumber(wayId, number) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM levels WHERE way_id = ? AND number = ?",
        [wayId, number]
      );
      return rows[0] || null;
    } catch (error) {
      console.error("Erreur LevelModel.findByWayAndNumber:", error);
      throw error;
    }
  },
};
