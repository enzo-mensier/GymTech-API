-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : b5ngvhiao4vdzqoon1ab-mysql.services.clever-cloud.com:3306
-- Généré le : mer. 04 juin 2025 à 19:15
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
  `id_utilisateur` int DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `casiers`
--

INSERT INTO `casiers` (`id_casier`, `numero_casier`, `id_utilisateur`) VALUES
(1, 101, 1),
(2, 102, 2),
(12, 111, 11),
(11, 109, 9),
(10, 107, 7),
(9, 105, 5),
(8, 103, 3),
(13, 113, 13),
(14, 115, 15),
(15, 104, 4),
(16, 106, 6),
(17, 108, 8),
(18, 110, 10),
(19, 112, 12),
(20, 114, 14),
(21, 116, 16);

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
(1, '2025-06-28', '08:00:00', '10:00:00', 1),
(2, '2025-06-28', '10:00:00', '11:00:00', 1),
(3, '2025-06-28', '11:00:00', '12:00:00', 1),
(4, '2025-06-28', '14:00:00', '15:00:00', 1),
(5, '2025-06-29', '08:00:00', '10:00:00', 1),
(6, '2025-06-29', '10:00:00', '11:00:00', 1);

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
(2, 1, 6, '2025-05-28 11:00:00'),
(1, 1, 2, '2025-05-28 08:00:00');

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
  `date_inscription` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `rfid_uid` varchar(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id_utilisateur`, `nom`, `prenom`, `email`, `mot_de_passe`, `genre`, `date_naissance`, `date_inscription`, `rfid_uid`) VALUES
(1, 'mensier', 'enzo', 'enzo@gymtech.com', '$2b$10$YK6P0QRWCY7c7.YvuQytyeJ0JGL3ABxTrWjguT5N3gj72KnS9H1C6', 'Homme', '2005-11-03', '2025-01-28 09:00:00', '7AA3AD15'),
(2, 'mboumba', 'reine', 'reine@gymtech.com', '$2b$10$JzORibK/8PKNMIgEKJMgZeDwjuaM1noxGJajJ4JN6derdexSkQsfW', 'Femme', '2003-04-01', '2025-03-19 15:20:00', '63789594'),
(3, 'dolium', 'mael', 'mael@gymtech.com', '$2b$10$ixg131Y0u.piMDEtiQbZuuii6Eyq4xf9kqh8niI/ZrD21/nEJIUyu', 'Homme', '2002-02-14', '2025-05-11 10:45:00', 'F99794A3');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `casiers`
--
ALTER TABLE `casiers`
  ADD PRIMARY KEY (`id_casier`),
  ADD UNIQUE KEY `numero_casier` (`numero_casier`),
  ADD UNIQUE KEY `id_utilisateur` (`id_utilisateur`);

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
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `rfid_uid` (`rfid_uid`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `casiers`
--
ALTER TABLE `casiers`
  MODIFY `id_casier` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `creneaux`
--
ALTER TABLE `creneaux`
  MODIFY `id_creneau` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  MODIFY `id_reservation` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id_utilisateur` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
