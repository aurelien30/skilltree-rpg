import { useState, useEffect } from "react";
import SkillTree from "./components/SkillTree";

function App() {
  // États
  const [skillTreeData, setSkillTreeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour charger les données
  const fetchSkillTreeData = async () => {
    // Réinitialiser les états
    setIsLoading(true);
    setError(null);

    try {
      console.log("🔄 Récupération des données depuis l'API...");

      const response = await fetch("http://localhost:3000/api/ways/1");

      // Vérifier le statut HTTP
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      console.log("✅ Données récupérées avec succès:", result);

      // Vérifier que les données sont bien présentes
      if (!result.success || !result.data) {
        throw new Error("Format de données invalide");
      }

      setSkillTreeData({ way: result.data });
      setIsLoading(false);
    } catch (err) {
      console.error("❌ Erreur lors du chargement des données:", err);

      // Gestion spécifique selon le type d'erreur
      let errorMessage = "Une erreur est survenue";

      if (err.message.includes("fetch")) {
        errorMessage =
          "Impossible de se connecter au serveur. Vérifiez que le backend est démarré sur http://localhost:3000";
      } else if (err.message.includes("404")) {
        errorMessage = "Données introuvables (404)";
      } else if (err.message.includes("500")) {
        errorMessage = "Erreur serveur (500)";
      } else {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setIsLoading(false); // Arrête le chargement même en cas d'erreur
    }
  };

  // Charger les données au montage du composant
  useEffect(() => {
    fetchSkillTreeData();
  }, []);

  // ========================================
  // AFFICHAGE
  // ========================================

  // Pendant le chargement
  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Chargement de l'arbre de compétences...</p>
      </div>
    );
  }

  // En cas d'erreur
  if (error) {
    return (
      <div className="app-error">
        <div className="error-icon">❌</div>
        <h2>Oups ! Une erreur est survenue</h2>
        <p className="error-message">{error}</p>
        <button onClick={fetchSkillTreeData} className="retry-button">
          🔄 Réessayer
        </button>
        <p className="error-hint">
          Assurez-vous que le backend tourne sur http://localhost:3000
        </p>
      </div>
    );
  }

  // Si aucune donnée n'est chargée et qu'il n'y a pas d'erreur
  if (!skillTreeData) {
    return (
      <div className="app-error">
        <p>Aucune donnée disponible</p>
        <button onClick={fetchSkillTreeData}>Réessayer</button>
      </div>
    );
  }

  // Données chargées avec succès
  return <SkillTree data={skillTreeData} />;
}

export default App;
