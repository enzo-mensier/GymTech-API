-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : b5ngvhiao4vdzqoon1ab-mysql.services.clever-cloud.com:3306
-- Généré le : mer. 28 mai 2025 à 09:24
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
(12, 111, 1, 11),
(11, 109, 1, 9),
(10, 107, 1, 7),
(9, 105, 1, 5),
(8, 103, 1, 3),
(13, 113, 1, 13),
(14, 115, 1, 15),
(15, 104, 2, 4),
(16, 106, 2, 6),
(17, 108, 2, 8),
(18, 110, 2, 10),
(19, 112, 2, 12),
(20, 114, 2, 14),
(21, 116, 2, 16);

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
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `casiers`
--
ALTER TABLE `casiers`
  MODIFY `id_casier` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
