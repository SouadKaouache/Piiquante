/************************************** MODELE SAUCE **************************************/

// Importation de mongoose qui nous servira à faire le lien entre notre serveur Node.js et le serveur MongoDB. //
const mongoose = require("mongoose");
// Création du schéma des sauces. Les objets soumis ne pourront différer de ce schéma. //
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true, min: 1, max: 10 },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

// Export du module pour l'utiliser ailleurs. //
module.exports = mongoose.model("Sauce", sauceSchema);
