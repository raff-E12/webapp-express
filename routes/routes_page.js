
/**
 * WebApp Movie API:
 * @description - Creazione delle rotte per l'API.
 */

const express = require("express");
const { Movies_Lists, Movies_Search, Images_Add, Reviews_Lists, Reviews_id, Add_Reviews, Add_Movies } = require("../controllers/controllers");

const routes = express.Router();

// 1. Movies - Routes
routes.get("/movies/all", Movies_Lists);
routes.post("/movies/add", Add_Movies);
routes.get("/movies/:id", Movies_Search);
routes.post("/movies/img", Images_Add);

// 2. Reviews - Routes
routes.post("/reviews/add",  Add_Reviews);
routes.get("/reviews/all", Reviews_Lists);
routes.get("/reviews/:id", Reviews_id);


module.exports = routes;