import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🎮 SkillTree RPG</h1>
        <p>Arbre de compétences interactif</p>
      </header>

      <main className="main-content">
        <div className="welcome-card">
          <h2>Bienvenue !</h2>
          <p>🚀 Construction en cours... Restez connecté !</p>

          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">Niveau</span>
              <span className="stat-value">1</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">XP</span>
              <span className="stat-value">0 / 100</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Points disponibles</span>
              <span className="stat-value">3</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
