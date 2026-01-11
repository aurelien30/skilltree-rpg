import NodeCard from "./NodeCard";
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

      {/* Liste des nœuds */}
      <div className="level-card__nodes">
        {level.nodes.map((node) => (
          <NodeCard key={node.id} node={node} />
        ))}
      </div>

      {/* Projet final */}
      {level.finalProject && (
        <div className="level-card__final-project">
          <h4 className="level-card__final-project-title">
            🏆 Projet de validation du niveau
          </h4>
          <p className="level-card__final-project-text">{level.finalProject}</p>
        </div>
      )}
    </div>
  );
}

export default LevelCard;
