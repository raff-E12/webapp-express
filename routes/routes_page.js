
/**
 * WebApp Movie API:
 * @description - Creazione delle rotte per l'API.
 */

const express = require("express");
const { Movies_Lists, Movies_Search, images_Add } = require("../controllers/controllers");

const routes = express.Router();

//Chiamate GET
routes.get("/movies/all", Movies_Lists);
routes.get("/movies/:id", Movies_Search);

//Chiamata POST
routes.post("/movies8789ikii/img", images_Add);


module.exports = routes;