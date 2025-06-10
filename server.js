const express = require('express');
const cors = require('cors');
const utilisateursRoutes = require('./src/routes/utilisateurs');
const reservationsRoutes = require('./src/routes/reservations');
const casiersRoutes = require('./src/routes/casiers');
const creneauxRoutes = require('./src/routes/creneaux');
const { router: authRouter } = require('./src/routes/auth'); // Import du routeur d'authentification

const app = express();

// Configuration du port (utilise le port de l'environnement en production, sinon 3002 en développement)
const port = process.env.PORT || 3002;

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration CORS étendue
app.use((req, res, next) => {
  // Autoriser toutes les origines (à restreindre en production)
  res.header('Access-Control-Allow-Origin', '*');
  
  // Autoriser les méthodes HTTP
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
  // Autoriser les en-têtes
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Autoriser les cookies et les sessions
  res.header('Access-Control-Allow-Credentials', true);
  
  // Répondre directement aux requêtes OPTIONS (prévol)
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
  
  next();
});

// Middleware de logging amélioré
app.use((req, res, next) => {
  const start = Date.now();
  
  // Log de la requête entrante
  console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  
  // Capturer la fin de la réponse
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  
  next();
});

// Routes API
app.use('/api/utilisateurs', utilisateursRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/casiers', casiersRoutes);
app.use('/api/creneaux', creneauxRoutes);
app.use('/api/auth', authRouter); // Utilisation des routes d'authentification

// Route de test
app.get('/api/status', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API en cours d\'exécution',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Gestion des routes inconnues
app.use('/api', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Route non trouvée: ${req.method} ${req.originalUrl}` 
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Erreur serveur interne',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
  console.log(`Environnement: ${process.env.NODE_ENV || 'development'}`);
});