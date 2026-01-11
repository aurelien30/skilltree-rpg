import "./NodeCard.css";

function NodeCard({ node }) {
  // Icône selon le statut
  const getStatusIcon = () => {
    switch (node.status) {
      case "locked":
        return "🔒";
      case "in-progress":
        return "⚡";
      case "completed":
        return "✅";
      default:
        return "❓";
    }
  };

  // Classe CSS selon le statut
  const getCardClass = () => {
    return `node-card node-card--${node.status}`;
  };

  return (
    <div className={getCardClass()}>
      {/* Badge de statut */}
      <div className="node-card__badge">{getStatusIcon()}</div>

      {/* Contenu */}
      <div className="node-card__content">
        <h4 className="node-card__title">{node.name}</h4>
        <p className="node-card__description">{node.description}</p>

        {/* Projet associé */}
        {node.project && (
          <div className="node-card__project">
            <span className="node-card__project-label">🎯 Projet :</span>
            <p className="node-card__project-text">{node.project}</p>
          </div>
        )}
      </div>

      {/* Effet glow */}
      <div className="node-card__glow"></div>
    </div>
  );
}

export default NodeCard;
