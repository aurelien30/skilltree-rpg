import { UserModel } from "../models/UserModel.js";
import { generateToken } from "../utils/jwt.js";

// ========================================
// CONTRÔLEURS AUTHENTIFICATION
// ========================================

// POST /api/auth/register - Inscription
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Tous les champs sont requis",
      });
    }

    // Vérifier si l'email existe déjà
    const existingEmail = await UserModel.findByEmail(email);
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        error: "Cet email est déjà utilisé",
      });
    }

    // Vérifier si le username existe déjà
    const existingUsername = await UserModel.findByUsername(username);
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        error: "Ce nom d'utilisateur est déjà pris",
      });
    }

    // Créer l'utilisateur
    const userId = await UserModel.create({ username, email, password });

    console.log("✅ Utilisateur créé avec ID:", userId); // ← DEBUG

    // Générer le token
    const token = generateToken(userId);

    console.log("✅ Token généré:", token); // ← DEBUG

    // Récupérer les infos de l'utilisateur (sans le password)
    const user = await UserModel.findById(userId);

    console.log("✅ User récupéré:", user); // ← DEBUG

    if (!user) {
      console.error("❌ Erreur: Utilisateur non trouvé après création");
      return res.status(500).json({
        success: false,
        error: "Erreur lors de la création de l'utilisateur",
      });
    }

    res.status(201).json({
      success: true,
      message: "Utilisateur créé avec succès",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    console.error("❌ Erreur register:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de l'inscription",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// POST /api/auth/login - Connexion
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email et mot de passe requis",
      });
    }

    // Trouver l'utilisateur
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Email ou mot de passe incorrect",
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await UserModel.verifyPassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Email ou mot de passe incorrect",
      });
    }

    // Générer le token
    const token = generateToken(user.id);

    // Retourner les infos (sans le password)
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({
      success: true,
      message: "Connexion réussie",
      data: {
        token,
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    console.error("❌ Erreur login:", error);
    res.status(500).json({
      success: false,
      error: "Erreur lors de la connexion",
    });
  }
};

// GET /api/auth/me - Obtenir l'utilisateur connecté
export const getMe = async (req, res) => {
  try {
    // req.userId est ajouté par le middleware auth
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Utilisateur non trouvé",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("❌ Erreur getMe:", error);
    res.status(500).json({
      success: false,
      error: "Erreur serveur",
    });
  }
};
