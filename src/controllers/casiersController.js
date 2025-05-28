const pool = require('../utils/db');

// Récupérer tous les casiers
async function getAllCasiers(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM casiers');
    
    const response = {
      success: true,
      data: {
        casiers: rows
      },
      message: 'Liste des casiers récupérée avec succès'
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la récupération des casiers',
      error: error.message 
    });
  }
}

// Récupérer un casier par son ID
async function getCasierById(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM casiers WHERE id_casier = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Casier non trouvé' 
      });
    }
    
    const response = {
      success: true,
      data: {
        casier: rows[0]
      },
      message: 'Casier récupéré avec succès'
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la récupération du casier',
      error: error.message 
    });
  }
}

// Récupérer le casier d'un utilisateur spécifique
async function getCasierByUserId(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT c.*, 
              CASE 
                WHEN c.id_vestiaire = 1 THEN 'Homme' 
                ELSE 'Femme' 
              END as type_vestiaire
       FROM casiers c 
       WHERE c.id_utilisateur = ?`, 
      [req.params.userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Aucun casier trouvé pour cet utilisateur' 
      });
    }

    const response = {
      success: true,
      data: {
        casier: rows[0]
      },
      message: 'Casier récupéré avec succès'
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la récupération du casier',
      error: error.message 
    });
  }
}

// Créer un nouveau casier
async function createCasier(req, res) {
  try {
    const { numero_casier, id_vestiaire, id_utilisateur } = req.body;
    
    // Vérifier si le numéro de casier existe déjà dans ce vestiaire
    const [existing] = await pool.query(
      'SELECT * FROM casiers WHERE numero_casier = ? AND id_vestiaire = ?',
      [numero_casier, id_vestiaire]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Ce numéro de casier existe déjà dans ce vestiaire' 
      });
    }
    
    // Vérifier si l'utilisateur a déjà un casier
    if (id_utilisateur) {
      const [userCasier] = await pool.query(
        'SELECT * FROM casiers WHERE id_utilisateur = ?',
        [id_utilisateur]
      );
      
      if (userCasier.length > 0) {
        return res.status(400).json({ 
          success: false,
          message: 'Cet utilisateur a déjà un casier attribué' 
        });
      }
    }
    
    const [result] = await pool.query(
      'INSERT INTO casiers (numero_casier, id_vestiaire, id_utilisateur) VALUES (?, ?, ?)',
      [numero_casier, id_vestiaire, id_utilisateur || null]
    );
    
    const response = {
      success: true,
      data: {
        id: result.insertId,
        numero_casier,
        id_vestiaire,
        id_utilisateur: id_utilisateur || null
      },
      message: 'Casier créé avec succès'
    };
    
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la création du casier',
      error: error.message 
    });
  }
}

// Mettre à jour un casier
async function updateCasier(req, res) {
  try {
    const { numero_casier, id_vestiaire, id_utilisateur } = req.body;
    const { id } = req.params;
    
    // Vérifier si le casier existe
    const [casier] = await pool.query('SELECT * FROM casiers WHERE id_casier = ?', [id]);
    
    if (casier.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Casier non trouvé' 
      });
    }
    
    // Vérifier si le numéro de casier existe déjà dans ce vestiaire (sauf pour ce casier)
    if (numero_casier && id_vestiaire) {
      const [existing] = await pool.query(
        'SELECT * FROM casiers WHERE numero_casier = ? AND id_vestiaire = ? AND id_casier != ?',
        [numero_casier, id_vestiaire, id]
      );
      
      if (existing.length > 0) {
        return res.status(400).json({ 
          success: false,
          message: 'Ce numéro de casier existe déjà dans ce vestiaire' 
        });
      }
    }
    
    // Vérifier si l'utilisateur a déjà un casier (sauf si c'est le même casier)
    if (id_utilisateur) {
      const [userCasier] = await pool.query(
        'SELECT * FROM casiers WHERE id_utilisateur = ? AND id_casier != ?',
        [id_utilisateur, id]
      );
      
      if (userCasier.length > 0) {
        return res.status(400).json({ 
          success: false,
          message: 'Cet utilisateur a déjà un casier attribué' 
        });
      }
    }
    
    // Mettre à jour le casier
    await pool.query(
      'UPDATE casiers SET numero_casier = COALESCE(?, numero_casier), id_vestiaire = COALESCE(?, id_vestiaire), id_utilisateur = ? WHERE id_casier = ?',
      [
        numero_casier || null,
        id_vestiaire || null,
        id_utilisateur || null,
        id
      ]
    );
    
    // Récupérer le casier mis à jour
    const [updatedCasier] = await pool.query('SELECT * FROM casiers WHERE id_casier = ?', [id]);
    
    const response = {
      success: true,
      data: {
        casier: updatedCasier[0]
      },
      message: 'Casier mis à jour avec succès'
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la mise à jour du casier',
      error: error.message 
    });
  }
}

// Supprimer un casier
async function deleteCasier(req, res) {
  try {
    const { id } = req.params;
    
    // Vérifier si le casier existe
    const [casier] = await pool.query('SELECT * FROM casiers WHERE id_casier = ?', [id]);
    
    if (casier.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Casier non trouvé' 
      });
    }
    
    // Supprimer le casier
    await pool.query('DELETE FROM casiers WHERE id_casier = ?', [id]);
    
    const response = {
      success: true,
      data: {
        id: parseInt(id)
      },
      message: 'Casier supprimé avec succès'
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de la suppression du casier',
      error: error.message 
    });
  }
}

module.exports = {
  getAllCasiers,
  getCasierById,
  getCasierByUserId,
  createCasier,
  updateCasier,
  deleteCasier,
};