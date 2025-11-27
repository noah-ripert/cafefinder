# Café Finder ☕️

**Remerciements :**  
Merci à [Gabriela Banaag (gbanaag)](https://github.com/gbanaag) pour son **template initial** qui m’a permis de démarrer ce projet.

## Description
Café Finder est une application web qui te permet de **trouver et sauvegarder les meilleurs cafés près de ta position**.  
Les utilisateurs peuvent swiper les cafés pour les sauvegarder et consulter leur liste de favoris.

Cette application utilise :

- **Google Places API** (Places et Photos)  
- **Node.js + Express** pour sécuriser la clé API  
- **Vanilla JavaScript** pour le front-end  
- **localStorage** pour sauvegarder les cafés favoris  
- **Hammer.js** pour le swipe interactif  

---

## Table des matières
1. [Installation](#installation)  
2. [Configuration](#configuration)  
3. [Lancement](#lancement)  
4. [Fonctionnalités](#fonctionnalités)  
5. [Structure du projet](#structure-du-projet)  
6. [Notes importantes](#notes-importantes)  
7. [Licence](#licence)  

---

## Installation

### Prérequis
- Node.js (version 14 ou supérieure recommandée)  
- NPM (installé avec Node.js)  
- Un navigateur moderne (Chrome, Edge, Firefox…)  

### Étapes
1. Clone le projet :  

```bash
git clone https://github.com/ton-utilisateur/cafe-curator.git
cd cafe-curator
Installe les dépendances Node :

bash
Copier le code
npm install express node-fetch
Configuration
Crée un fichier server.js (déjà fourni dans le projet) avec ta clé Google sans restriction de referer.

Active l’API Google Places (NEW) et Photos API dans Google Cloud Console.

Vérifie que la clé est valide et remplace TA_CLE_NODE dans server.js et script.js si nécessaire.

Lancement
Lance le serveur Node :

bash
Copier le code
node server.js
Le serveur écoute par défaut sur http://localhost:3000.

Ouvre index.html dans ton navigateur.

Accès sur téléphone
Assure-toi que ton téléphone et ton PC sont sur le même réseau Wi-Fi.

Trouve ton IP locale (ipconfig sous Windows, ifconfig sous Mac/Linux).

Dans script.js, remplace localhost par ton IP locale :

js
Copier le code
fetch(`http://192.168.1.X:3000/api/cafes?lat=${lat}&lng=${lng}`);
Accède à ton projet depuis ton téléphone via l’IP locale.

Fonctionnalités
📍 Géolocalisation : Trouve les cafés proches de toi.

🖼️ Affichage cartes : Affiche les cafés avec photo, nom, adresse et rating.

💖 Swipe interactif : Swipe droite pour sauvegarder, gauche pour ignorer.

💾 Sauvegarde locale : Les cafés sauvegardés sont stockés dans le localStorage.

📋 Voir cafés sauvegardés : Bouton “Show Saved Cafes” pour consulter la liste.

Structure du projet
bash
Copier le code
cafe-curator/
│
├─ index.html          # Page principale
├─ script.js           # Logique front-end (fetch, swipe, affichage)
├─ styles.css          # Styles pour les cartes et l’interface
├─ server.js           # Serveur Node.js pour sécuriser la clé API
├─ package.json        # Dépendances Node
└─ README.md           # Documentation du projet
Notes importantes
La clé Google doit rester côté serveur pour ne pas être exposée.

Le projet utilise Node.js pour contourner les restrictions CORS.

cors-anywhere n’est plus nécessaire.

Pour un accès sur mobile en local, Node.js doit être actif et le front pointer vers l’IP locale.


