import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./config/mysql.js";
import waysRoutes from "./routes/waysRoutes.js"; // ← NOUVEAU

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARES =====
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ===== ROUTES =====

app.get("/", (req, res) => {
  res.json({
    message: "🎮 API SkillTree RPG est en ligne !",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      ways: "/api/ways",
      way: "/api/ways/:id",
      level: "/api/ways/:wayId/levels/:levelId",
    },
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ===== ROUTES API ===== ← NOUVEAU
app.use("/api/ways", waysRoutes);

// ===== 404 & ERREURS =====
app.use((req, res, next) => {
  res.status(404).json({
    error: "Route non trouvée",
    path: req.originalUrl,
    method: req.method,
  });
});

app.use((err, req, res, next) => {
  console.error("❌ Erreur serveur:", err);
  res.status(500).json({
    error: "Erreur serveur interne",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Une erreur est survenue",
  });
});

// ===== DÉMARRAGE =====
const startServer = async () => {
  try {
    await testConnection();

    app.listen(PORT, () => {
      console.log("================================");
      console.log(`🚀 Serveur démarré avec succès !`);
      console.log(`📍 URL: http://localhost:${PORT}`);
      console.log(`🌍 Environnement: ${process.env.NODE_ENV || "development"}`);
      console.log("================================");
    });
  } catch (error) {
    console.error("❌ Erreur au démarrage du serveur:", error);
    process.exit(1);
  }
};

startServer();
