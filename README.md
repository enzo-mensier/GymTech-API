# 📚 Documentation Complète - Projet GymTech

         ┌─────────────────────────────────────────────┐
         │    ____               _____         _       │
         │   / ___|_   _ _ __ __|_   _|__  ___| |__    │
         │  | |  _| | | | '_ ` _ \| |/ _ \/ __| '_ \   │
         │  | |_| | |_| | | | | | | |  __/ (__| | | |  │
         │   \____|\__, |_| |_| |_|_|\___|\___|_| |_|  │
         │         |___/                               │
         └─────────────────────────────────────────────┘

## 🛠 Stack Technique

### Frontend
- **Framework** : Flutter (Dart)
- **IDE Recommandé** : Android Studio / Visual Studio Code
- **Requêtes HTTP** : http package

### Backend
- **Runtime** : Node.js avec Express.js
- **Base de données** : MySQL (hébergée sur Clever Cloud)
- **Gestion de base de données** : phpMyAdmin
- **Authentification** : JWT (JSON Web Tokens)

### Déploiement
- **Serveur API REST** : Render (Node.js)
- **Base de données** : MySQL sur Clever Cloud avec phpMyAdmin
- **Build mobile** : Flutter (Android/iOS/Web)

## 📋 Table des matières
1. [Installation](#-installation)
   - [Prérequis](#-prérequis)
   - [Frontend (Application Mobile)](#-frontend-application-mobile)
   - [Backend (API)](#-backend-api)
   - [Déploiement](#-déploiement)
2. [Utilisation](#-utilisation)
   - [Navigation dans l'application](#-navigation-dans-lapplication)
   - [Fonctionnalités principales](#-fonctionnalités-principales)
3. [Dépannage](#-dépannage)
   - [Problèmes courants](#-problèmes-courants)
   - [Codes d'erreur](#-codes-derreur)

## 🚀 Installation

### 📋 Prérequis

#### Pour le développement Frontend :
- Flutter SDK (version 3.6.1 ou supérieure)
- Dart SDK (version 3.1.5 ou supérieure)
- Android Studio avec SDK Android
- Un émulateur Android ou un appareil physique
- Git pour le contrôle de version
- Android SDK (via Android Studio)

#### Pour le développement Backend :
- Node.js (version 18.x LTS recommandée)
- npm (version 9.x ou supérieure)
- MySQL Workbench ou TablePlus (pour la gestion de la base de données)
- Postman ou Insomnia (pour tester les endpoints API)

#### Pour le déploiement :
- Compte Clever Cloud avec service MySQL
- Accès à phpMyAdmin (fourni par Clever Cloud)
- Compte Render (hébergement de l'API)
- Compte GitHub (intégration continue)

### 📱 Installation accès Android

#### Configuration requise
- Android 8.0 (niveau d'API 26) ou supérieur
- Connexion Internet stable
- 100 Mo d'espace de stockage disponible

### Installation de l'application

1. **Télécharger l'APK**
   - Téléchargez la dernière version de l'application :
     [![Télécharger APK](https://img.shields.io/badge/Télécharger-APK-brightgreen?style=for-the-badge&logo=android)](https://github.com/enzo-mensier/GymTech-APP/releases/download/v1.3.3/app-release.apk)
   - Version actuelle : **v1.3.3** (9 juin 2024)
   - Taille : ~50 Mo
   - Compatibilité : Android 8.0+ (API 26+)

2. **Activer l'installation depuis des sources inconnues**
   - Allez dans `Paramètres > Sécurité`
   - Activez l'option "Sources inconnues"
   - Confirmez l'activation

3. **Installer l'application**
   - Ouvrez le gestionnaire de fichiers et localisez l'APK téléchargé
   - Appuyez sur le fichier APK
   - Appuyez sur "Installer"
   - Attendez la fin de l'installation
   - Optionnel : Désactivez "Sources inconnues" pour plus de sécurité
   - Appuyez sur "Ouvrir" pour lancer l'application

#### Dépannage de l'installation

- **Erreur "Application non installée"**
  - Vérifiez la version d'Android (minimum 8.0 requis)
  - Désinstallez les versions précédentes
  - Téléchargez à nouveau le fichier APK

- **Espace de stockage insuffisant**
  - Libérez de l'espace en supprimant des applications inutilisées
  - Videz le cache de l'appareil

- **Problème de compatibilité**
  - Contactez le support avec le modèle de votre appareil
  - Vérifiez les mises à jour système disponibles

### ⚙️ Backend (API)

1. **Cloner le dépôt de l'API**
   ```bash
   git clone https://github.com/enzo-mensier/GymTech-API.git
   cd GymTech-API
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou avec Yarn
   yarn install
   ```

3. **Configurer les variables d'environnement**
   - Créer un fichier `.env` à la racine du projet
   - Configurer les variables nécessaires :
     ```
     # Configuration de base
     PORT=3000
     NODE_ENV=development
     
     # MySQL (Clever Cloud)
     DB_HOST=votre-host-mysql.clever-cloud.com
     DB_USER=votre_utilisateur
     DB_PASSWORD=votre_mot_de_passe
     DB_NAME=votre_base_de_donnees
     DB_PORT=3306
     
     # JWT
     JWT_SECRET=votre_secret_jwt_secure
     JWT_EXPIRES_IN=30d
     
     # CORS
     CORS_ORIGIN=http://localhost:3000,http://localhost:8080
     
     # Autres configurations
     ```

4. **Démarrer le serveur**
   ```bash
   # Installation des dépendances
   npm install
   
   # Mode développement avec rechargement automatique
   npm run dev
   
   # Mode production (après build)
   npm run build
   npm start
   
   # Lancer les tests
   npm test
   ```

## 📱 Utilisation

### 🎯 Fonctionnalités principales

#### 🔐 Authentification
- Création/Connexion à un compte utlisateur
- Gestion du profil utilisateur

#### 📅 Gestion des créneaux/réservations
- Consultation des créneaux disponibles
- Réservation de créneaux
- Consultation des réservations
- Annulation de réservation

#### 🗄️ Données utilisateur
- Information du compte client
- Vestiaire/Casier attribué

## 🛠 Dépannage

### ⚠️ Problèmes courants

#### Frontend
1. **Échec de l'installation des dépendances**
   ```bash
   flutter clean
   flutter pub get
#### Connexion
- **Erreur "Impossible de se connecter au serveur"**
  - Vérifiez votre connexion mobile/wi-fi
  - Désactivez temporairement le VPN si vous en utilisez un
  - Vérifiez que l'URL de l'API est correcte dans les paramètres
  - Code d'erreur : `NETWORK_ERROR`

#### Authentification
- **Erreur "Identifiants invalides"**
  - Vérifiez votre email et mot de passe (attention à la casse)
  - Si vous avez oublié votre mot de passe, utilisez la fonction de réinitialisation
  - Code d'erreur : `AUTH_001`

- **Erreur "Compte non vérifié"**
  - Vérifiez votre boîte mail (et les spams) pour le lien de vérification
  - Code d'erreur : `AUTH_002`

#### Réservations
- **Erreur "Créneau non disponible"**
  - Le créneau sélectionné est peut-être déjà réservé
  - Vérifiez les horaires d'ouverture de la salle
  - Code d'erreur : `SLOT_UNAVAILABLE`

#### Synchronisation
- **Erreur "Échec de synchronisation"**
  - Vérifiez votre connexion Internet
  - Essayez de rafraîchir les données
  - Si le problème persiste, déconnectez-vous puis reconnectez-vous
  - Code d'erreur : `SYNC_FAILED`

### Codes d'erreur API

#### Erreurs client (4xx)
- **400** : Requête incorrecte - Vérifiez les données envoyées
- **401** : Non autorisé - Reconnectez-vous
- **403** : Accès refusé - Vérifiez vos permissions
- **404** : Ressource non trouvée
- **429** : Trop de requêtes - Attendez quelques instants

#### Erreurs serveur (5xx)
- **500** : Erreur interne du serveur - Réessayez plus tard
- **502** : Mauvaise passerelle - Le serveur est en maintenance
- **503** : Service indisponible - Le serveur est surchargé

#### Codes d'erreur personnalisés
- **AUTH_001** : Identifiants invalides
- **AUTH_002** : Compte non vérifié
- **AUTH_003** : Jeton expiré - Reconnectez-vous
- **RES_001** : Créneau déjà réservé
- **LOCK_001** : Casier déjà occupé
- **API_001** : Version d'API obsolète - Mettez à jour l'application
- **DEVICE_001** : Appareil non autorisé - Contactez le support

### Solution rapide pour Android
1. **Forcez l'arrêt** de l'application
2. **Effacez le cache** (Paramètres > Applications > GymTech > Stockage > Vider le cache)
3. **Redémarrez** votre appareil
4. **Mettez à jour** l'application si disponible
5. Si le problème persiste, **contactez le support** avec le code d'erreur

## ☁️ Déploiement

### Déploiement de l'API sur Render
1. Créer un nouveau service Web sur Render
2. Lier le dépôt GitHub du backend
3. Configurer les variables d'environnement dans le tableau de bord Render
4. Définir la commande de démarrage : `npm start`
5. Activer le déploiement automatique

### Configuration de la base de données MySQL sur Clever Cloud
1. Créer une nouvelle base de données MySQL sur Clever Cloud
2. Récupérer les informations de connexion :
   - Hôte
   - Nom d'utilisateur
   - Mot de passe
   - Nom de la base de données
   - Port
3. Configurer les variables d'environnement dans Render avec ces informations
4. Accéder à phpMyAdmin via le tableau de bord Clever Cloud pour gérer la base de données

### Build de l'application Flutter
```bash
# Build pour Android
flutter build apk --release

# Build pour le web
flutter build web

# Build pour iOS (sur macOS)
flutter build ios --release
```

## 📊 Gestion de la base de données

### Accès à phpMyAdmin
1. Connectez-vous à votre compte Clever Cloud
2. Sélectionnez votre base de données MySQL
3. Cliquez sur l'onglet "phpMyAdmin"
4. Utilisez les identifiants fournis par Clever Cloud

### Structure de la base de données
Les principales tables à créer sont :
- `users` : Gestion des utilisateurs
- `reservations` : Réservations de créneaux
- `lockers` : Gestion des casiers
- `sessions` : Sessions utilisateurs

## 📞 Support

Pour toute question ou problème, veuillez contacter l'équipe de développement :
- Email : [support@gymtech.com](mailto:support@gymtech.com)
- Issues GitHub : 
  - [Frontend](https://github.com/enzo-mensier/GymTech-APP/issues)
  - [Backend](https://github.com/enzo-mensier/GymTech-API/issues)

### Liens utiles
- [Documentation Flutter](https://flutter.dev/docs)
- [Documentation Node.js](https://nodejs.org/en/docs/)
- [Documentation Express](https://expressjs.com/)
- [Documentation MySQL](https://dev.mysql.com/doc/)
- [Documentation Clever Cloud MySQL](https://www.clever-cloud.com/doc/extensions/mysql/)
- [Documentation phpMyAdmin](https://docs.phpmyadmin.net/)
- [Documentation Render](https://render.com/docs)

---
© 2025 GymTech - Tous droits réservés - Développé avec Flutter, Node.js, Express, MongoDB, hébergé sur Render et Clever Cloud
