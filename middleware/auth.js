/************************************** MIDDLEWARE D'AUTHENTIFICATION **************************************/

// Importation du package jsonwebtoken. //
const jwt = require("jsonwebtoken");
// Importation du package dotenv afin de sécuriser certaines données sensibles liées au mdp ou à la base de données. //
require("dotenv").config();
// Stockage du token dans la constante RANDOM_TOKEN_SECRET. //
const RANDOM_TOKEN_SECRET = process.env.RANDOM_TOKEN_SECRET;

// Ce middleware servira à toutes les authentifications sur toutes les routes. //
module.exports = (req, res, next) => {
  try {
    // On récupère le token dans le header de la requête authorization. Grâce à la méthode split on récupère le deuxième élément du tableau. //
    const token = req.headers.authorization.split(" ")[1];
    // On vérifie le token décodé avec la clé secrète initiée avec la création du token encodé précédemment, les clés doivent correspondre. //
    const decodedToken = jwt.verify(token, RANDOM_TOKEN_SECRET);
    // On vérifie que le userId envoyé dans la requête correspond au userId encodé dans le token. //
    const userId = decodedToken.userId;
    req.auth = { userId };
    // Si le token est différent de celui de l'userId alors on envoi une erreur. //
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID invalide. ";
    } else {
      // Si la requête est authentifiée on passe au middleware suivant grâce à la méthode next(). //
      next();
    }
    // Si l'authentification rencontre une erreur on envoi un code 401 et le message correspondant. //
  } catch (error) {
    res.status(401).json({ error: "Authentification échouée. " });
  }
};
