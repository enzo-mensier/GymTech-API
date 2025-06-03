const pool = require('../utils/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Récupérer l'utilisateur avec son casier
    const [rows] = await pool.query(`
      SELECT u.*, 
             c.id_casier, 
             c.numero_casier
      FROM utilisateurs u
      LEFT JOIN casiers c ON u.id_utilisateur = c.id_utilisateur
      WHERE u.email = ?
    `, [email]);

    if (rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Aucun utilisateur trouvé avec cet email' 
      });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.mot_de_passe);

    if (!passwordMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Mot de passe incorrect' 
      });
    }

    // Création du token JWT
    const token = jwt.sign(
      { 
        id: user.id_utilisateur, 
        email: user.email 
      },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    // Construction de la réponse
    const response = {
      success: true,
      data: {
        token,
        user: {
          id: user.id_utilisateur,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          genre: user.genre,
          date_naissance: user.date_naissance,
          date_inscription: user.date_inscription,
          casier: user.id_casier ? {
            id: user.id_casier,
            numero: user.numero_casier,
            type_vestiaire: user.type_vestiaire
          } : null
        }
      },
      message: 'Connexion réussie'
    };
    
    res.status(200).json(response);

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la connexion',
      error: error.message 
    });
  }
}

async function register(req, res) {
  const { nom, prenom, email, password, genre, date_naissance } = req.body;

  try {
    // Vérifier si l'email est déjà utilisé
    const [rows] = await pool.query(
      'SELECT * FROM utilisateurs WHERE email = ?',
      [email]
    );

    if (rows.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email déjà utilisé' 
      });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const [result] = await pool.query(
      'INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, genre, date_naissance) VALUES (?, ?, ?, ?, ?, ?)',
      [nom, prenom, email, hashedPassword, genre, date_naissance]
    );

    // Récupérer l'utilisateur créé
    const [newUser] = await pool.query(
      'SELECT id_utilisateur, nom, prenom, email, genre, date_naissance, date_inscription FROM utilisateurs WHERE id_utilisateur = ?',
      [result.insertId]
    );

    const response = {
      success: true,
      data: {
        user: newUser[0]
      },
      message: 'Inscription réussie'
    };

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de l\'inscription',
      error: error.message 
    });
  }
}

async function getCurrentUser(req, res) {
  try {
    // Récupérer l'utilisateur avec son casier
    const [rows] = await pool.query(`
      SELECT u.*, 
             c.id_casier, 
             c.numero_casier
      FROM utilisateurs u
      LEFT JOIN casiers c ON u.id_utilisateur = c.id_utilisateur
      WHERE u.id_utilisateur = ?
    `, [req.user.id]);


    if (rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Utilisateur non trouvé' 
      });
    }


    const user = rows[0];
    
    // Construction de la réponse
    const response = {
      success: true,
      data: {
        user: {
          id: user.id_utilisateur,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          genre: user.genre,
          date_naissance: user.date_naissance,
          date_inscription: user.date_inscription,
          casier: user.id_casier ? {
            id: user.id_casier,
            numero: user.numero_casier
          } : null
        }
      },
      message: 'Utilisateur récupéré avec succès'
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des données' });
  }
}

module.exports = {
  login,
  register,
  getCurrentUser
};