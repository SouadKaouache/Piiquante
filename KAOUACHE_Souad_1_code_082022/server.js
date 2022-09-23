/************************************** SERVEUR **************************************/

// Importation du package HTTP. //
const http = require("http");
// Importation de notre application pour l'utiliser sur le serveur. //
const app = require("./app");

// NormalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne. //
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
// Si aucun port n'est fourni par l'environnement l'écoute se fera sur le port 3000. //
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Gestion des éventuelles erreurs qui seront également enregistrées sur le serveur. //
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Création d'un serveur avec express qui utilise app. //
const server = http.createServer(app);
// Lance le serveur et affiche les erreurs s'il y en a. //
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  // Envoi du port écouté dans la console. //
  console.log("Listening on " + bind);
});

// Ecoute du port. //
server.listen(port);
