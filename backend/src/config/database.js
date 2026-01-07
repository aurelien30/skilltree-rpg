import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Chemin vers la base de données
const dbPath =
  process.env.DATABASE_PATH || join(__dirname, "../../database.sqlite");

// Crée ou ouvre la base de données SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Erreur lors de la connexion à la base de données:", err);
  } else {
    console.log("✅ Connecté à la base de données SQLite");
  }
});

// Active les clés étrangères (important pour les relations)
db.run("PRAGMA foreign_keys = ON");

// Fonction pour initialiser les tables
export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    // Table des utilisateurs
    db.run(
      `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        xp INTEGER DEFAULT 0,
        level INTEGER DEFAULT 1,
        available_points INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `,
      (err) => {
        if (err) {
          console.error("❌ Erreur création table users:", err);
          reject(err);
          return;
        }

        // Table des compétences
        db.run(
          `
        CREATE TABLE IF NOT EXISTS skills (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT,
          max_level INTEGER DEFAULT 5,
          cost_per_level INTEGER DEFAULT 1,
          icon TEXT,
          category TEXT,
          position_x INTEGER,
          position_y INTEGER
        )
      `,
          (err) => {
            if (err) {
              console.error("❌ Erreur création table skills:", err);
              reject(err);
              return;
            }

            // Table de progression des compétences par utilisateur
            db.run(
              `
          CREATE TABLE IF NOT EXISTS user_skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            skill_id INTEGER NOT NULL,
            current_level INTEGER DEFAULT 0,
            unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (skill_id) REFERENCES skills(id),
            UNIQUE(user_id, skill_id)
          )
        `,
              (err) => {
                if (err) {
                  console.error("❌ Erreur création table user_skills:", err);
                  reject(err);
                } else {
                  console.log("✅ Tables créées avec succès");
                  resolve();
                }
              }
            );
          }
        );
      }
    );
  });
};

// Wrapper pour simplifier les requêtes
export const query = {
  // Récupère UNE ligne
  get: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  // Récupère PLUSIEURS lignes
  all: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  // Exécute une requête (INSERT, UPDATE, DELETE)
  run: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ lastID: this.lastID, changes: this.changes });
      });
    });
  },
};

export default db;
