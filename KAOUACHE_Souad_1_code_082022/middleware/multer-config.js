/************************************** MIDDLEWARE DE CONFIGURATION MULTER  **************************************/

// Importation du package multer pour accepter et gérer les fichiers entrants (images) lors des requêtes HTTP. //
const multer = require("multer");

// Création d'un dictionnaire des extensions autorisées. //
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Définition de la destination des fichiers images. //
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  // Création du nom du fichier de l'image. //

  filename: (req, file, callback) => {
    // On génère un nouveau nom avec le nom d'origine, on supprime les espaces avec split, ils seront remplacés par _ grâce à la méthode .join. //
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    // Callback avec null comme premier argument pour indiquer qu'il n'y a pas d'erreur.//
    // Génération du nom de l'image avec le nom d'origine + le timestamp + . + l'extension en fonction du mime types. //
    callback(null, name + Date.now() + "." + extension);
  },
});

// Export du module avec en objet storage et la méthode single pour dire que c'est un fichier unique(on précise également que c'est une image). //
module.exports = multer({ storage: storage }).single("image");
