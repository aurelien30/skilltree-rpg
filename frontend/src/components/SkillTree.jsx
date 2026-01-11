import WayCard from "./WayCard";
import "./SkillTree.css";

function SkillTree({ data }) {
  return (
    <div className="skill-tree">
      <header className="skill-tree__header">
        <h1 className="skill-tree__title">🎮 SkillTree RPG</h1>
        <p className="skill-tree__subtitle">
          Progressez dans vos compétences de manière gamifiée
        </p>
      </header>

      <main className="skill-tree__content">
        <WayCard way={data.way} />
      </main>
    </div>
  );
}

export default SkillTree;
