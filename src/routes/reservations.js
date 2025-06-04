const express = require('express');
const router = express.Router();
const pool = require('../utils/db');

class Reservation {
  constructor(idReservation, idUtilisateur, idCreneau) {
    this.idReservation = idReservation;
    this.idUtilisateur = idUtilisateur;
    this.idCreneau = idCreneau;
  }

  static fromJson(json) {
    return new Reservation(
      json.ID_RESERVATION,
      json.ID_UTILISATEUR,
      json.ID_CRENEAU
    );
  }
}

// Routes
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reservations');
    const reservations = rows.map(row => Reservation.fromJson(row));
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM reservations WHERE ID_RESERVATION = ?', [req.params.id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Réservation non trouvée' });
    } else {
      const reservation = Reservation.fromJson(rows[0]);
      res.json(reservation);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/utilisateur/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT r.*, c.date_creneau, c.heure_debut, c.heure_fin, c.disponibilite 
       FROM reservations r 
       JOIN creneaux c ON r.id_creneau = c.id_creneau 
       WHERE r.id_utilisateur = ? 
       ORDER BY c.date_creneau DESC, c.heure_debut DESC`,
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.json([]);
    }
    
    // Transformer les résultats en format plus lisible
    const reservations = rows.map(row => ({
      id_reservation: row.id_reservation,
      id_utilisateur: row.id_utilisateur,
      id_creneau: row.id_creneau,
      date_reservation: row.date_reservation,
      creneau: {
        id_creneau: row.id_creneau,
        date_creneau: row.date_creneau,
        heure_debut: row.heure_debut,
        heure_fin: row.heure_fin,
        disponibilite: row.disponibilite === 1
      }
    }));
    
    res.json(reservations);
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des réservations' });
  }
});

router.post('/', async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const { id_utilisateur, id_creneau } = req.body;
    
    // Vérifier si l'utilisateur existe
    const [userRows] = await connection.query(
      'SELECT id_utilisateur FROM utilisateurs WHERE id_utilisateur = ?', 
      [id_utilisateur]
    );
    
    if (userRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ 
        success: false, 
        message: 'Utilisateur non trouvé' 
      });
    }
    
    // Vérifier si le créneau existe et est disponible avec verrouillage
    const [creneauRows] = await connection.query(
      'SELECT * FROM creneaux WHERE id_creneau = ? AND disponibilite = 1 FOR UPDATE',
      [id_creneau]
    );
    
    if (creneauRows.length === 0) {
      await connection.rollback();
      return res.status(400).json({ 
        success: false, 
        message: 'Créneau non disponible ou introuvable' 
      });
    }
    
    // Vérifier si l'utilisateur n'a pas déjà réservé ce créneau
    const [existingReservation] = await connection.query(
      'SELECT * FROM reservations WHERE id_utilisateur = ? AND id_creneau = ?',
      [id_utilisateur, id_creneau]
    );
    
    if (existingReservation.length > 0) {
      await connection.rollback();
      return res.status(400).json({
        success: false,
        message: 'Vous avez déjà réservé ce créneau'
      });
    }
    
    // Créer la réservation
    const [result] = await connection.query(
      'INSERT INTO reservations (id_utilisateur, id_creneau, date_reservation) VALUES (?, ?, NOW())',
      [id_utilisateur, id_creneau]
    );
    
    // Mettre à jour la disponibilité du créneau
    await connection.query(
      'UPDATE creneaux SET disponibilite = 0 WHERE id_creneau = ?',
      [id_creneau]
    );
    
    await connection.commit();
    
    // Récupérer les détails complets de la réservation
    const [newReservation] = await connection.query(
      `SELECT r.*, c.date_creneau, c.heure_debut, c.heure_fin 
       FROM reservations r
       JOIN creneaux c ON r.id_creneau = c.id_creneau
       WHERE r.id_reservation = ?`,
      [result.insertId]
    );
    
    res.status(201).json({
      success: true,
      message: 'Réservation effectuée avec succès',
      data: {
        ...newReservation[0],
        creneau: {
          id_creneau: newReservation[0].id_creneau,
          date_creneau: newReservation[0].date_creneau,
          heure_debut: newReservation[0].heure_debut,
          heure_fin: newReservation[0].heure_fin,
          disponibilite: false
        }
      }
    });
    
  } catch (error) {
    await connection.rollback();
    console.error('Erreur lors de la création de la réservation:', error);
    
    let errorMessage = 'Erreur lors de la création de la réservation';
    
    // Gestion des erreurs spécifiques
    if (error.code === 'ER_DUP_ENTRY') {
      errorMessage = 'Ce créneau est déjà réservé';
    } else if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      errorMessage = 'Créneau ou utilisateur invalide';
    }
    
    res.status(500).json({ 
      success: false, 
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    if (connection) await connection.release();
  }
});

module.exports = router;