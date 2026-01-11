// ========================================
// DONNÉES STATIQUES - MVP SkillTree RPG
// ========================================

export const skillTreeData = {
  way: {
    id: 1,
    name: "🚀 Développeur Full Stack",
    description: "La voie du code créatif et technique",
    color: "#00d9ff", // Cyan cyberpunk
    levels: [
      {
        id: 1,
        number: 1,
        name: "L'Architecte de Données & Design",
        description: "Maîtriser les fondations du développement moderne",
        nodes: [
          {
            id: 1,
            name: "CSS Moderne",
            description: "Flexbox, Grid, Responsive Design",
            status: "completed", // completed | in-progress | locked
            resources: [
              "MDN Flexbox Guide",
              "CSS Grid Garden",
              "Kevin Powell (YouTube)",
            ],
            project: "Dashboard GM responsive avec inventaire et sidebar",
          },
          {
            id: 2,
            name: "Postman Avancé",
            description: "Environnements, Tests automatisés, Scripts JS",
            status: "in-progress",
            resources: [
              "Postman Learning Center",
              "Automating API Tests",
              "Variables & Environments",
            ],
            project:
              "Collection Postman testant toutes les routes API avec tokens",
          },
          {
            id: 3,
            name: "SQL Avancé",
            description: "Jointures, Index, Transactions",
            status: "locked",
            resources: [
              "SQLBolt Interactive Tutorial",
              "MySQL Official Docs",
              "Database Design Course",
            ],
            project: "Base de données MySQL pour système de quêtes transmédia",
          },
          {
            id: 4,
            name: "Docker Multi-containers",
            description: "docker-compose avec services multiples",
            status: "locked",
            resources: [
              "Docker Official Tutorial",
              "Docker Compose Guide",
              "Multi-container Apps",
            ],
            project: "docker-compose avec API Node, MySQL, Redis",
          },
        ],
        finalProject: "Wiki de l'univers responsive et Dockerisé",
        status: "in-progress", // based on nodes completion
      },
      {
        id: 2,
        number: 2,
        name: "Le Maître des API",
        description: "Créer et sécuriser des API robustes",
        nodes: [
          {
            id: 5,
            name: "REST API avec Express",
            description: "Routes, Middlewares, Controllers",
            status: "locked",
            resources: [
              "Express.js Guide",
              "RESTful API Design",
              "Node.js Best Practices",
            ],
            project: "API complète pour gestion de personnages RPG",
          },
          {
            id: 6,
            name: "Authentification JWT",
            description: "Tokens sécurisés, Refresh tokens",
            status: "locked",
            resources: [
              "JWT.io Introduction",
              "Auth0 JWT Handbook",
              "Secure Authentication",
            ],
            project: "Système d'auth complet avec JWT et rôles",
          },
          {
            id: 7,
            name: "Validation de données",
            description: "Joi, Zod, sanitization",
            status: "locked",
            resources: [
              "Joi Documentation",
              "Input Validation Guide",
              "Security Best Practices",
            ],
            project: "Middleware de validation pour toute l'API",
          },
        ],
        finalProject: "API sécurisée déployée avec tests automatisés",
        status: "locked",
      },
    ],
  },
};
