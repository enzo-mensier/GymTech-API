const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const config = require('../config');

// Middleware pour vérifier le token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({
      success: false,
      message: 'Token d\'authentification manquant'
    });
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Token d\'authentification invalide ou expiré'
      });
    }
    req.user = user;
    next();
  });
}

// Routes d'authentification
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/me', authenticateToken, authController.getCurrentUser);

// Exporter le routeur et le middleware d'authentification
module.exports = {
  router,
  authenticateToken
};