
/**
 * WebApp Movie API:
 * @description - Creazione delle rotte per l'API.
 */

const express = require("express");
const { Movies_Lists, Movies_Search } = require("../controllers/controllers");

const routes = express.Router();

//Chiamate GET
routes.get("/movies", Movies_Search);
routes.get("/movies/:id", Movies_Lists);

module.exports = routes;