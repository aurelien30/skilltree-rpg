import "./LevelCard.css";

function LevelCard({ level }) {
  return (
    <div className="level-card">
      {/* En-tête du niveau */}
      <div className="level-card__header">
        <div className="level-card__number">
          <span className="level-card__number-label">NIVEAU</span>
          <span className="level-card__number-value">{level.number}</span>
        </div>
        <div className="level-card__info">
          <h3 className="level-card__title">{level.name}</h3>
          <p className="level-card__description">{level.description}</p>
        </div>
      </div>

      {/* Badge de statut */}
      <div className="level-card__status">
        <span className={`status-badge status-badge--${level.status}`}>
          {level.status === "locked" && "🔒 Verrouillé"}
          {level.status === "in-progress" && "⚡ En cours"}
          {level.status === "completed" && "✅ Terminé"}
        </span>
      </div>

      {/* Projet final */}
      {level.final_project && (
        <div className="level-card__final-project">
          <h4 className="level-card__final-project-title">
            🏆 Projet de validation du niveau
          </h4>
          <p className="level-card__final-project-text">
            {level.final_project}
          </p>
        </div>
      )}

      {/* Message temporaire */}
      <div className="level-card__nodes-placeholder">
        <p>📦 Les compétences de ce niveau seront bientôt disponibles</p>
      </div>
    </div>
  );
}

export default LevelCard;
