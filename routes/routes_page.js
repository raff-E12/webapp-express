
/**
 * WebApp Movie API:
 * @description - Creazione delle rotte per l'API.
 */

const express = require("express");
const { Movies_Lists, Movies_Search, Images_Add, Reviews_Lists } = require("../controllers/controllers");

const routes = express.Router();

//Chimate di Liste
routes.get("/movies/all", Movies_Lists);
routes.get("/reviews/all", Reviews_Lists);

//Chiamate Generali
routes.get("/movies/:id", Movies_Search);
routes.post("/movies/img", Images_Add);



module.exports = routes;