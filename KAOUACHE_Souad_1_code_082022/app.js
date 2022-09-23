/************************************** APPLICATION **************************************/

// Importation du framework express. //
const express = require("express");
// Création de l'application qui utilisera le framework express. //
const app = express();
// Importation du module 'dotenv' pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement. //
require("dotenv").config();
// Importation de mongoose pour se connecter à la base de données mongoDB. //
const mongoose = require("mongoose");
// Importation des routes. //
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");
// Importation du module path qui nous permettra de travailler avec les chemins de fichiers et de répertoires. //
const path = require("path");
// Importation du module helmet destiné à sécuriser notre application de certaines vulnérabilités. //
const helmet = require("helmet");
// Importation du module cookie-session pour sécuriser les cookies. //
const cookieSession = require("cookie-session");
// Importation du module nocache afin de désactiver la mise en cache côté client. //
const nocache = require("nocache");
// Importation du module mongoose sanitize afin de limiter le risque d'attaque par injection. //
const mongoSanitize = require("express-mongo-sanitize");
// Connexion à la base de données en utilisant les variables d'environnement pour ne pas exposer l'URI. //
mongoose
  .connect(process.env.DbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Utilisation d'helmet sur notre application. //
app.use(helmet());
// Utilisation de mongoSanitize sur notre application.//
app.use(mongoSanitize());

// Mise en place d'un middleware permettant au front d'accéder au back afin d'éviter les erreurs CORS dûes aux deux ports différents. //
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  //  Entêtes qui seront utilisés après la vérification cross-origin afin de donner l'autorisation. //
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // Méthodes de requêtes autorisées sur notre API. //
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(
  cookieSession({
    name: "cookieSession",
    keys: process.env.Cookie,
    cookie: {
      // Expiration des cookies à 1 heure. //
      maxAge: 1 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true,
      domain: "http://localhost:3000",
    },
  })
);
// Utilisation d'express.json pour les requêtes POST et PUT pour envoyer les données sous forme d'un objet de données. //
app.use(express.json());
// Utilisation de nocache sur notre application. //
app.use(nocache());
// Routes destinées à l'authentification des utilisateurs. //
app.use("/api/auth", userRoutes);
// Routes destinées aux sauces. //
app.use("/api/sauces", sauceRoutes);
// Gestion des images contenues dans notre dossier. //
app.use("/images", express.static(path.join(__dirname, "images")));
// Export de l'application qui sera utilisée dans notre serveur. //
module.exports = app;
