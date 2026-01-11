// ========================================
// DONNÉES BACKEND - SkillTree RPG
// ========================================

export const ways = [
  {
    id: 1,
    name: "🚀 Développeur Full Stack",
    description: "La voie du code créatif et technique",
    color: "#00d9ff",
    icon: "🚀",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "✍️ Scénariste",
    description: "La voie de la narration et du storytelling",
    color: "#ff6b6b",
    icon: "✍️",
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "🎨 Pixel Artist",
    description: "La voie de la création visuelle",
    color: "#a8dadc",
    icon: "🎨",
    created_at: new Date().toISOString(),
  },
];

export const levels = [
  {
    id: 1,
    way_id: 1,
    number: 1,
    name: "L'Architecte de Données & Design",
    description: "Maîtriser les fondations du développement moderne",
    final_project: "Wiki de l'univers responsive et Dockerisé",
    status: "in-progress",
  },
  {
    id: 2,
    way_id: 1,
    number: 2,
    name: "Le Maître des API",
    description: "Créer et sécuriser des API robustes",
    final_project: "API sécurisée déployée avec tests automatisés",
    status: "locked",
  },
];

export const nodes = [
  {
    id: 1,
    level_id: 1,
    name: "CSS Moderne",
    description: "Flexbox, Grid, Responsive Design",
    status: "completed",
    project: "Dashboard GM responsive avec inventaire et sidebar",
    resources: [
      {
        name: "MDN Flexbox Guide",
        url: "https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Flexible_Box_Layout",
      },
      { name: "CSS Grid Garden", url: "https://cssgridgarden.com/#fr" },
      {
        name: "Kevin Powell (YouTube)",
        url: "https://www.youtube.com/@KevinPowell",
      },
    ],
    keywords: ["CSS Grid responsive", "Flexbox dashboard layout"],
    position_x: 0,
    position_y: 0,
  },
  {
    id: 2,
    level_id: 1,
    name: "Postman Avancé",
    description: "Environnements, Tests automatisés, Scripts JS",
    status: "in-progress",
    project: "Collection Postman testant toutes les routes API avec tokens",
    resources: [
      { name: "Postman Learning Center", url: "https://learning.postman.com/" },
      {
        name: "Automating API Tests",
        url: "https://www.postman.com/automated-testing/",
      },
      {
        name: "Variables & Environments",
        url: "https://learning.postman.com/docs/sending-requests/variables/",
      },
    ],
    keywords: ["Postman automation", "API testing"],
    position_x: 1,
    position_y: 0,
  },
  {
    id: 3,
    level_id: 1,
    name: "SQL Avancé",
    description: "Jointures, Index, Transactions",
    status: "locked",
    project: "Base de données MySQL pour système de quêtes transmédia",
    resources: [
      { name: "SQLBolt Interactive", url: "https://sqlbolt.com/" },
      { name: "MySQL Official Docs", url: "https://dev.mysql.com/doc/" },
      {
        name: "Database Design Course",
        url: "https://www.coursera.org/learn/database-design",
      },
    ],
    keywords: ["SQL joins", "database indexing"],
    position_x: 0,
    position_y: 1,
  },
  {
    id: 4,
    level_id: 1,
    name: "Docker Multi-containers",
    description: "docker-compose avec services multiples",
    status: "locked",
    project: "docker-compose avec API Node, MySQL, Redis",
    resources: [
      {
        name: "Docker Official Tutorial",
        url: "https://docs.docker.com/get-started/",
      },
      { name: "Docker Compose Guide", url: "https://docs.docker.com/compose/" },
      {
        name: "Multi-container Apps",
        url: "https://docs.docker.com/get-started/07_multi_container/",
      },
    ],
    keywords: ["docker-compose tutorial", "multi container setup"],
    position_x: 1,
    position_y: 1,
  },
  {
    id: 5,
    level_id: 2,
    name: "REST API avec Express",
    description: "Routes, Middlewares, Controllers",
    status: "locked",
    project: "API complète pour gestion de personnages RPG",
    resources: [
      {
        name: "Express.js Guide",
        url: "https://expressjs.com/fr/guide/routing.html",
      },
      { name: "RESTful API Design", url: "https://restfulapi.net/" },
      {
        name: "Node.js Best Practices",
        url: "https://github.com/goldbergyoni/nodebestpractices",
      },
    ],
    keywords: ["Express REST API", "Node.js routing"],
    position_x: 0,
    position_y: 0,
  },
  {
    id: 6,
    level_id: 2,
    name: "Authentification JWT",
    description: "Tokens sécurisés, Refresh tokens",
    status: "locked",
    project: "Système d'auth complet avec JWT et rôles",
    resources: [
      { name: "JWT.io Introduction", url: "https://jwt.io/introduction" },
      {
        name: "Auth0 JWT Handbook",
        url: "https://auth0.com/resources/ebooks/jwt-handbook",
      },
      {
        name: "Secure Authentication",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html",
      },
    ],
    keywords: ["JWT authentication", "refresh token implementation"],
    position_x: 1,
    position_y: 0,
  },
  {
    id: 7,
    level_id: 2,
    name: "Validation de données",
    description: "Joi, Zod, sanitization",
    status: "locked",
    project: "Middleware de validation pour toute l'API",
    resources: [
      { name: "Joi Documentation", url: "https://joi.dev/" },
      {
        name: "Input Validation Guide",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html",
      },
      {
        name: "Security Best Practices",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html",
      },
    ],
    keywords: ["Joi validation", "input sanitization"],
    position_x: 0,
    position_y: 1,
  },
];

export const getCompleteWayData = (wayId) => {
  const way = ways.find((w) => w.id === wayId);
  if (!way) return null;

  const wayLevels = levels.filter((l) => l.way_id === wayId);

  return {
    ...way,
    levels: wayLevels.map((level) => ({
      ...level,
      nodes: nodes.filter((n) => n.level_id === level.id),
    })),
  };
};

export const getAllWaysWithData = () => {
  return ways.map((way) => getCompleteWayData(way.id));
};
