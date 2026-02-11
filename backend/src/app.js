import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();

const app = express();

// ========================================
// MIDDLEWARES GLOBAUX
// ========================================

// CORS - Autorise les requêtes depuis le frontend
app.use(
  cors({
    origin: function (origin, callback) {
      // Permet les requêtes sans origin (Postman, test-auth.html en file://)
      if (!origin) return callback(null, true);

      // Liste des origines autorisées
      const allowedOrigins = [
        "http://localhost:5173", // Frontend Vite
        "http://localhost:3000", // Backend (pour les tests)
        "http://127.0.0.1:5173", // Alternative localhost
        process.env.FRONTEND_URL,
      ].filter(Boolean);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("⚠️  Origin non autorisée:", origin);
        callback(null, true); // En dev, on autorise quand même
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parser JSON
app.use(express.json());

// Parser URL-encoded (formulaires)
app.use(express.urlencoded({ extended: true }));

// Logger simple (développement)
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// ========================================
// ROUTES
// ========================================

// Route de santé (health check)
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Routes principales
app.use("/api", routes);

// ========================================
// GESTION D'ERREURS
// ========================================

// 404 - Route non trouvée
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route non trouvée",
    path: req.originalUrl,
    method: req.method,
  });
});

// Erreur globale
app.use((err, req, res, next) => {
  console.error("❌ Erreur serveur:", err);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Erreur serveur interne",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export default app;
