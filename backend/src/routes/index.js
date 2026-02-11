import express from "express";
import authRoutes from "./auth.routes.js";
import waysRoutes from "./ways.routes.js";

const router = express.Router();

// ========================================
// ROUTES CENTRALISÉES
// ========================================

// Route principale de l'API
router.get("/", (req, res) => {
  res.json({
    message: "🎮 API SkillTree RPG",
    version: "2.0.0",
    endpoints: {
      health: "/health",
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
        me: "GET /api/auth/me",
      },
      ways: {
        all: "GET /api/ways",
        one: "GET /api/ways/:id",
        levels: "GET /api/ways/:wayId/levels/:levelNumber",
      },
    },
  });
});

// Routes d'authentification
router.use("/auth", authRoutes);

// Routes des voies
router.use("/ways", waysRoutes);

export default router;
