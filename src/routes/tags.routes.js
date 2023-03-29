const { Router } = require("express");

const MovieTagsController = require("../controllers/MovieTagsController");

const movieTagsRoutes = Router();

const movieTagsController = new MovieTagsController();

movieTagsRoutes.post("/", movieTagsController.index);

module.exports = tagsRoutes;