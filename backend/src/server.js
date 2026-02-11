import app from "./app.js";
import { testConnection } from "./config/database.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

// ========================================
// DÉMARRAGE DU SERVEUR
// ========================================

const startServer = async () => {
  try {
    // Test de connexion à la base de données
    console.log("🔄 Connexion à la base de données...");
    const connected = await testConnection();

    if (!connected) {
      console.warn("⚠️  Le serveur démarre mais MySQL n'est pas connecté");
      console.warn("⚠️  Vérifiez votre configuration dans .env");
    }

    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log("");
      console.log("╔════════════════════════════════════════╗");
      console.log("║  🚀 SERVEUR DÉMARRÉ AVEC SUCCÈS       ║");
      console.log("╠════════════════════════════════════════╣");
      console.log(
        `║  📍 URL: http://localhost:${PORT.toString().padEnd(13)} ║`
      );
      console.log(`║  🗄️  Base: MySQL                      ║`);
      console.log(
        `║  🌍 Env: ${(process.env.NODE_ENV || "development").padEnd(20)} ║`
      );
      console.log("╠════════════════════════════════════════╣");
      console.log("║  Endpoints disponibles:                ║");
      console.log("║  • GET  /health                        ║");
      console.log("║  • GET  /api                           ║");
      console.log("║  • POST /api/auth/register             ║");
      console.log("║  • POST /api/auth/login                ║");
      console.log("║  • GET  /api/auth/me                   ║");
      console.log("║  • GET  /api/ways                      ║");
      console.log("╚════════════════════════════════════════╝");
      console.log("");
    });
  } catch (error) {
    console.error("❌ Erreur fatale au démarrage:", error);
    process.exit(1);
  }
};

// Gestion propre de l'arrêt
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM reçu, arrêt gracieux du serveur...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("👋 SIGINT reçu, arrêt gracieux du serveur...");
  process.exit(0);
});

// Démarrer
startServer();
