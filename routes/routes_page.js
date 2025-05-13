
/**
 * WebApp Movie API:
 * @description - Creazione delle rotte per l'API.
 */

const express = require("express");
const { Movies_Lists, Movies_Search, Images_Add, Reviews_Lists, Reviews_id, Add_Reviews } = require("../controllers/controllers");

const routes = express.Router();

//Chimate di Usate
routes.get("/movies/all", Movies_Lists);
routes.get("/reviews/all", Reviews_Lists);
routes.get("/reviews/:id", Reviews_id);

//Chiamate Secondarie
routes.get("/movies/:id", Movies_Search);
routes.post("/movies/img", Images_Add);
routes.post("/reviews/add",  Add_Reviews);


module.exports = routes;