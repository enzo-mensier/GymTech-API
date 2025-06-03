const pool = require('../utils/db');

// Récupérer tous les créneaux
async function getAllCreneaux(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM creneaux ORDER BY date_creneau, heure_debut');
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des créneaux:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des créneaux' });
  }
}

// Mettre à jour la disponibilité d'un créneau
async function updateCreneauDisponibilite(req, res) {
  const { id } = req.params;
  const { disponibilite } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE creneaux SET disponibilite = ? WHERE id_creneau = ?',
      [disponibilite, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Créneau non trouvé' });
    }

    res.json({ message: 'Disponibilité du créneau mise à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la disponibilité:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la disponibilité du créneau' });
  }
}

// Récupérer un créneau par son ID
async function getCreneauById(req, res) {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM creneaux WHERE id_creneau = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Créneau non trouvé' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération du créneau:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du créneau' });
  }
}

module.exports = {
  getAllCreneaux,
  updateCreneauDisponibilite,
  getCreneauById,
};