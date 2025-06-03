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
      `SELECT r.*, c.date_creneau, c.heure_debut, c.heure_fin 
       FROM reservations r 
       JOIN creneaux c ON r.ID_CRENEAU = c.ID_CRENEAU 
       WHERE r.ID_UTILISATEUR = ? 
       ORDER BY c.date_creneau DESC, c.heure_debut DESC`,
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.json([]);
    }
    
    // Transformer les résultats en format plus lisible
    const reservations = rows.map(row => ({
      id_reservation: row.ID_RESERVATION,
      id_utilisateur: row.ID_UTILISATEUR,
      id_creneau: row.ID_CRENEAU,
      date_reservation: row.DATE_RESERVATION,
      creneau: {
        date_creneau: row.date_creneau,
        heure_debut: row.heure_debut,
        heure_fin: row.heure_fin
      }
    }));
    
    res.json(reservations);
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des réservations' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { idUtilisateur, idCreneau } = req.body;
    const [result] = await pool.query(
      'INSERT INTO reservations (ID_UTILISATEUR, ID_CRENEAU) VALUES (?, ?)',
      [idUtilisateur, idCreneau]
    );
    const reservation = new Reservation(result.insertId, idUtilisateur, idCreneau);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;