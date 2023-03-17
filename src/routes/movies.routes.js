const { Router } = require("express");

const MoviesController = require("../controllers/MoviesController");

const moviesRoutes = Router();

const moviesController = new MoviesController();

moviesRoutes.post("/", moviesController);

module.exports = moviesRoutes;