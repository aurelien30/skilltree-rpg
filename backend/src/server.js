import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDatabase } from "./config/database.js";

// Charge les variables d'environnement depuis .env
dotenv.config();

// Crée l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARES =====
// Autorise les requêtes depuis le frontend (évite les erreurs CORS)
app.use(cors());

// Permet de lire les données JSON envoyées dans le body des requêtes
app.use(express.json());

// Middleware pour logger toutes les requêtes (utile pour débugger)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ===== ROUTES =====

// Route de base (pour tester que l'API fonctionne)
app.get("/", (req, res) => {
  res.json({
    message: "🎮 API SkillTree RPG est en ligne !",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      users: "/api/users",
      skills: "/api/skills",
    },
  });
});

// Route de santé (pour vérifier que le serveur est up)
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Route 404 (doit être APRÈS toutes les autres routes)
// Compatible avec Express 5
app.use((req, res, next) => {
  res.status(404).json({
    error: "Route non trouvée",
    path: req.originalUrl,
    method: req.method,
  });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(" Erreur serveur:", err);
  res.status(500).json({
    error: "Erreur serveur interne",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Une erreur est survenue",
  });
});

// ===== DÉMARRAGE DU SERVEUR =====

const startServer = async () => {
  try {
    // Initialise la base de données
    await initDatabase();

    // Démarre le serveur
    app.listen(PORT, () => {
      console.log("================================");
      console.log(` Serveur démarré avec succès !`);
      console.log(` URL: http://localhost:${PORT}`);
      console.log(` Environnement: ${process.env.NODE_ENV || "development"}`);
      console.log("================================");
    });
  } catch (error) {
    console.error(" Erreur au démarrage du serveur:", error);
    process.exit(1); // Arrête le processus en cas d'erreur
  }
};

// Lance le serveur
startServer();
