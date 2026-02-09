import express from "express";
import { register, login, getMe } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// ========================================
// ROUTES AUTHENTIFICATION - /api/auth
// ========================================

// POST /api/auth/register - Inscription
router.post("/register", register);

// POST /api/auth/login - Connexion
router.post("/login", login);

// GET /api/auth/me - Utilisateur connecté (protégé)
router.get("/me", authMiddleware, getMe);

export default router;
