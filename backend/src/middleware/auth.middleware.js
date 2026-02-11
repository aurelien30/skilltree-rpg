import { verifyToken } from "../utils/jwt.utils.js";

export const authMiddleware = (req, res, next) => {
  try {
    // Récupérer le token depuis le header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Token manquant ou invalide",
      });
    }

    // Extraire le token
    const token = authHeader.split(" ")[1];

    // Vérifier le token
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: "Token invalide ou expiré",
      });
    }

    // Ajouter userId à la requête
    req.userId = decoded.userId;

    // Continuer vers le contrôleur
    next();
  } catch (error) {
    console.error("❌ Erreur authMiddleware:", error);
    res.status(401).json({
      success: false,
      error: "Authentification échouée",
    });
  }
};
