# 📚 Documentation API - SkillTree RPG

## Base URL
```
http://localhost:3000
```

## Endpoints

### 1. Informations générales

#### GET /
Retourne les informations sur l'API

**Réponse** :
```json
{
  "message": "🎮 API SkillTree RPG est en ligne !",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

---

#### GET /health
Vérifie l'état du serveur

**Réponse** :
```json
{
  "status": "OK",
  "timestamp": "2026-01-08T12:00:00.000Z",
  "uptime": 123.456
}
```

---

### 2. Voies (Ways)

#### GET /api/ways
Récupère toutes les voies avec leurs niveaux et nœuds

**Réponse** :
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "🚀 Développeur Full Stack",
      "description": "La voie du code créatif et technique",
      "color": "#00d9ff",
      "icon": "🚀",
      "levels": [...]
    }
  ]
}
```

---

#### GET /api/ways/:id
Récupère une voie spécifique

**Paramètres** :
- `id` (number) : ID de la voie

**Exemple** : `/api/ways/1`

**Réponse** :
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "🚀 Développeur Full Stack",
    "levels": [...]
  }
}
```

**Erreurs** :
- `400` : ID invalide
- `404` : Voie non trouvée

---

#### GET /api/ways/:wayId/levels/:levelId
Récupère un niveau spécifique

**Paramètres** :
- `wayId` (number) : ID de la voie
- `levelId` (number) : ID du niveau

**Exemple** : `/api/ways/1/levels/1`

**Réponse** :
```json
{
  "success": true,
  "data": {
    "id": 1,
    "number": 1,
    "name": "L'Architecte de Données & Design",
    "nodes": [...]
  }
}
```

---

## Codes de statut HTTP

- `200` : OK - Requête réussie
- `400` : Bad Request - Paramètres invalides
- `404` : Not Found - Ressource introuvable
- `500` : Internal Server Error - Erreur serveur

---

## Format des réponses

### Succès
```json
{
  "success": true,
  "data": { ... }
}
```

### Erreur
```json
{
  "success": false,
  "error": "Message d'erreur"
}
```

---

## Données

### Structure d'une Voie (Way)
```json
{
  "id": 1,
  "name": "🚀 Développeur Full Stack",
  "description": "La voie du code créatif et technique",
  "color": "#00d9ff",
  "icon": "🚀",
  "created_at": "2026-01-08T...",
  "levels": [...]
}
```

### Structure d'un Niveau (Level)
```json
{
  "id": 1,
  "way_id": 1,
  "number": 1,
  "name": "L'Architecte de Données & Design",
  "description": "Maîtriser les fondations du développement moderne",
  "final_project": "Wiki de l'univers responsive et Dockerisé",
  "status": "in-progress",
  "nodes": [...]
}
```

### Structure d'un Nœud (Node)
```json
{
  "id": 1,
  "level_id": 1,
  "name": "CSS Moderne",
  "description": "Flexbox, Grid, Responsive Design",
  "status": "completed",
  "project": "Dashboard GM responsive avec inventaire et sidebar",
  "resources": [
    {
      "name": "MDN Flexbox Guide",
      "url": "https://..."
    }
  ],
  "keywords": ["CSS Grid responsive", "Flexbox dashboard layout"],
  "position_x": 0,
  "position_y": 0
}
```

### Statuts possibles
- `completed` : Terminé
- `in-progress` : En cours
- `locked` : Verrouillé
```

---

