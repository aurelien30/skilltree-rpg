import pool from "../config/database.js";

export const WayModel = {
  // Récupère toutes les voies
  async findAll() {
    try {
      const [rows] = await pool.query("SELECT * FROM ways ORDER BY id");
      return rows;
    } catch (error) {
      console.error("Erreur WayModel.findAll:", error);
      throw error;
    }
  },

  // Récupère une voie par ID
  async findById(id) {
    try {
      const [rows] = await pool.query("SELECT * FROM ways WHERE id = ?", [id]);
      return rows[0] || null;
    } catch (error) {
      console.error("Erreur WayModel.findById:", error);
      throw error;
    }
  },
};
