const { Router } = require("express");

const MovieTagsController = require("../controllers/MovieTagsController");
const ensureAuthentication = require('../middlewares/ensureAuthentication');

const movieTagsRoutes = Router();

const movieTagsController = new MovieTagsController();

movieTagsRoutes.get("/", ensureAuthentication, movieTagsController.index);

module.exports = movieTagsRoutes;