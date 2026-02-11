import pool from "../config/database.js"; // ← Nouveau nom
import bcrypt from "bcryptjs";

// Le reste du code reste identique

// ========================================
// MODÈLE: Users
// ========================================

export const UserModel = {
  // Créer un nouvel utilisateur
  async create(userData) {
    try {
      const { username, email, password } = userData;

      console.log("📝 Création utilisateur:", { username, email }); // DEBUG

      // Hasher le mot de passe
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const [result] = await pool.query(
        `INSERT INTO users (username, email, password) 
         VALUES (?, ?, ?)`,
        [username, email, hashedPassword]
      );

      const userId = result.insertId;
      console.log("✅ Utilisateur créé avec ID:", userId); // DEBUG

      return userId; // ← CORRECTION : Retourner l'ID !
    } catch (error) {
      console.error("❌ Erreur UserModel.create:", error);
      throw error;
    }
  },

  // Trouver un utilisateur par email
  async findByEmail(email) {
    try {
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      return rows[0] || null;
    } catch (error) {
      console.error("❌ Erreur UserModel.findByEmail:", error);
      throw error;
    }
  },

  // Trouver un utilisateur par username
  async findByUsername(username) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );
      return rows[0] || null;
    } catch (error) {
      console.error("❌ Erreur UserModel.findByUsername:", error);
      throw error;
    }
  },

  // Trouver un utilisateur par ID
  async findById(id) {
    try {
      console.log("🔍 Recherche user avec ID:", id);

      const [rows] = await pool.query(
        "SELECT id, username, email, xp, level, available_points, created_at FROM users WHERE id = ?",
        [id]
      );

      console.log("📊 Résultat query:", rows);

      if (rows.length === 0) {
        console.log("⚠️ Aucun utilisateur trouvé avec ID:", id);
        return null;
      }

      return rows[0];
    } catch (error) {
      console.error("❌ Erreur UserModel.findById:", error);
      throw error;
    }
  },

  // Vérifier le mot de passe
  async verifyPassword(plainPassword, hashedPassword) {
    // ← CORRECTION : Nom du paramètre
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      console.error("❌ Erreur UserModel.verifyPassword:", error);
      throw error;
    }
  },

  // Mettre à jour XP et niveau
  async updateProgress(userId, xp, level, availablePoints) {
    try {
      const [result] = await pool.query(
        `UPDATE users 
         SET xp = ?, level = ?, available_points = ?
         WHERE id = ?`,
        [xp, level, availablePoints, userId]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("❌ Erreur UserModel.updateProgress:", error);
      throw error;
    }
  },
};
