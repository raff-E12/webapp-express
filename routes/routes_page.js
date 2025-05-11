
/**
 * WebApp Movie API:
 * @description - Creazione delle rotte per l'API.
 */

const express = require("express");
const { Movies_Lists, Movies_Search } = require("../controllers/controllers");

const routes = express.Router();

//Chiamate GET
routes.get("/movies/all", Movies_Lists);
routes.get("/movies/:id", Movies_Search);

module.exports = routes;