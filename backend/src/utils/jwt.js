import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// Générer un token JWT
export const generateToken = (userId) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET n'est pas défini dans .env");
  }

  return jwt.sign({ userId: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

// Vérifier un token JWT
export const verifyToken = (token) => {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET n'est pas défini dans .env");
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("❌ Erreur verifyToken:", error.message);
    return null;
  }
};
