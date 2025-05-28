-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : b5ngvhiao4vdzqoon1ab-mysql.services.clever-cloud.com:3306
-- Généré le : mer. 28 mai 2025 à 09:13
-- Version du serveur : 8.0.22-13
-- Version de PHP : 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `b5ngvhiao4vdzqoon1ab`
--

-- --------------------------------------------------------

--
-- Structure de la table `casiers`
--

CREATE TABLE `casiers` (
  `id_casier` int NOT NULL,
  `numero_casier` int NOT NULL,
  `id_vestiaire` int NOT NULL,
  `id_utilisateur` int DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `casiers`
--

INSERT INTO `casiers` (`id_casier`, `numero_casier`, `id_vestiaire`, `id_utilisateur`) VALUES
(1, 101, 1, 1),
(2, 102, 2, 2),
(3, 103, 1, 3),
(4, 104, 2, 4),
(5, 105, 1, 5),
(6, 106, 2, 6),
(7, 107, 1, 7);

-- --------------------------------------------------------

--
-- Structure de la table `creneaux`
--

CREATE TABLE `creneaux` (
  `id_creneau` int NOT NULL,
  `date_creneau` date NOT NULL,
  `heure_debut` time NOT NULL,
  `heure_fin` time NOT NULL,
  `disponibilite` tinyint(1) DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `creneaux`
--

INSERT INTO `creneaux` (`id_creneau`, `date_creneau`, `heure_debut`, `heure_fin`, `disponibilite`) VALUES
(1, '2025-02-05', '09:00:00', '10:00:00', 0),
(2, '2025-02-05', '10:00:00', '11:00:00', 0),
(3, '2025-02-06', '14:00:00', '15:00:00', 1),
(4, '2025-06-30', '10:00:00', '11:00:00', 1),
(5, '2025-06-30', '12:00:00', '13:00:00', 0);

-- --------------------------------------------------------

--
-- Structure de la table `energieproduite`
--

CREATE TABLE `energieproduite` (
  `id_energie` int NOT NULL,
  `id_utilisateur` int NOT NULL,
  `date_enregistrement` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `energie_kWh` decimal(10,3) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `energieproduite`
--

INSERT INTO `energieproduite` (`id_energie`, `id_utilisateur`, `date_enregistrement`, `energie_kWh`) VALUES
(1, 1, '2025-02-04 07:10:00', 1.250),
(2, 2, '2025-02-04 07:15:00', 1.500),
(3, 3, '2025-02-04 07:20:00', 2.000);

-- --------------------------------------------------------

--
-- Structure de la table `performances`
--

CREATE TABLE `performances` (
  `id_performance` int NOT NULL,
  `id_utilisateur` int NOT NULL,
  `date_enregistrement` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `frequence_cardiaque` int DEFAULT NULL,
  `calories_brulees` decimal(10,2) DEFAULT NULL,
  `duree_exercice` time DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `performances`
--

INSERT INTO `performances` (`id_performance`, `id_utilisateur`, `date_enregistrement`, `frequence_cardiaque`, `calories_brulees`, `duree_exercice`) VALUES
(1, 1, '2025-02-04 07:12:00', 120, 200.50, '00:30:00'),
(2, 2, '2025-02-04 07:17:00', 115, 180.30, '00:35:00'),
(3, 3, '2025-02-04 07:22:00', 130, 220.00, '00:40:00');

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

CREATE TABLE `reservations` (
  `id_reservation` int NOT NULL,
  `id_utilisateur` int NOT NULL,
  `id_creneau` int NOT NULL,
  `date_reservation` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `reservations`
--

INSERT INTO `reservations` (`id_reservation`, `id_utilisateur`, `id_creneau`, `date_reservation`) VALUES
(1, 1, 1, '2025-02-04 07:00:00'),
(2, 2, 3, '2025-02-04 07:10:00'),
(3, 3, 2, '2025-02-04 07:15:00'),
(4, 1, 1, '2025-05-26 11:32:20'),
(5, 1, 1, '2025-05-26 11:32:57'),
(6, 1, 5, '2025-05-26 12:20:00'),
(7, 5, 1, '2025-05-26 12:20:18');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id_utilisateur` int NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `genre` enum('Homme','Femme','Autre') NOT NULL,
  `date_naissance` date NOT NULL,
  `date_inscription` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id_utilisateur`, `nom`, `prenom`, `email`, `mot_de_passe`, `genre`, `date_naissance`, `date_inscription`) VALUES
(1, 'mensier', 'enzo', 'enzo@test.com', '$2b$10$YK6P0QRWCY7c7.YvuQytyeJ0JGL3ABxTrWjguT5N3gj72KnS9H1C6', 'Homme', '2005-11-03', '2025-05-28 08:58:37'),
(2, 'mboumba', 'reine', 'reine@test.com', '$2b$10$JzORibK/8PKNMIgEKJMgZeDwjuaM1noxGJajJ4JN6derdexSkQsfW', 'Femme', '2003-04-01', '2025-05-28 09:00:52');

-- --------------------------------------------------------

--
-- Structure de la table `vestiaires`
--

CREATE TABLE `vestiaires` (
  `id_vestiaire` int NOT NULL,
  `genre` enum('Homme','Femme') NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `vestiaires`
--

INSERT INTO `vestiaires` (`id_vestiaire`, `genre`) VALUES
(1, 'Homme'),
(2, 'Femme');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `casiers`
--
ALTER TABLE `casiers`
  ADD PRIMARY KEY (`id_casier`),
  ADD UNIQUE KEY `numero_casier` (`numero_casier`),
  ADD UNIQUE KEY `id_utilisateur` (`id_utilisateur`),
  ADD KEY `id_vestiaire` (`id_vestiaire`);

--
-- Index pour la table `creneaux`
--
ALTER TABLE `creneaux`
  ADD PRIMARY KEY (`id_creneau`);

--
-- Index pour la table `energieproduite`
--
ALTER TABLE `energieproduite`
  ADD PRIMARY KEY (`id_energie`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Index pour la table `performances`
--
ALTER TABLE `performances`
  ADD PRIMARY KEY (`id_performance`),
  ADD KEY `id_utilisateur` (`id_utilisateur`);

--
-- Index pour la table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id_reservation`),
  ADD KEY `id_utilisateur` (`id_utilisateur`),
  ADD KEY `id_creneau` (`id_creneau`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id_utilisateur`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `vestiaires`
--
ALTER TABLE `vestiaires`
  ADD PRIMARY KEY (`id_vestiaire`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `casiers`
--
ALTER TABLE `casiers`
  MODIFY `id_casier` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `creneaux`
--
ALTER TABLE `creneaux`
  MODIFY `id_creneau` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `energieproduite`
--
ALTER TABLE `energieproduite`
  MODIFY `id_energie` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `performances`
--
ALTER TABLE `performances`
  MODIFY `id_performance` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id_reservation` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id_utilisateur` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `vestiaires`
--
ALTER TABLE `vestiaires`
  MODIFY `id_vestiaire` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
