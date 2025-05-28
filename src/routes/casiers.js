const express = require('express');
const router = express.Router();
const casiersController = require('../controllers/casiersController');
const { authenticateToken } = require('./auth');

// Routes publiques
router.get('/', casiersController.getAllCasiers);
router.get('/:id', casiersController.getCasierById);

// Routes protégées par authentification
router.use(authenticateToken);

// Routes pour la gestion des casiers
router.post('/', casiersController.createCasier);
router.put('/:id', casiersController.updateCasier);
router.delete('/:id', casiersController.deleteCasier);

// Récupérer le casier d'un utilisateur spécifique
router.get('/utilisateur/:userId', casiersController.getCasierByUserId);

module.exports = router;