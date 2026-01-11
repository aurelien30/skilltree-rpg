import LevelCard from "./LevelCard";
import "./WayCard.css";

function WayCard({ way }) {
  return (
    <div className="way-card">
      {/* En-tête de la voie */}
      <div className="way-card__header">
        <h2 className="way-card__title">{way.name}</h2>
        <p className="way-card__description">{way.description}</p>
        <div className="way-card__stats">
          <div className="way-card__stat">
            <span className="way-card__stat-value">{way.levels.length}</span>
            <span className="way-card__stat-label">Niveaux</span>
          </div>
          <div className="way-card__stat">
            <span className="way-card__stat-value">
              {way.levels.reduce(
                (total, level) => total + level.nodes.length,
                0
              )}
            </span>
            <span className="way-card__stat-label">Compétences</span>
          </div>
        </div>
      </div>

      {/* Liste des niveaux */}
      <div className="way-card__levels">
        {way.levels.map((level) => (
          <LevelCard key={level.id} level={level} />
        ))}
      </div>
    </div>
  );
}

export default WayCard;
