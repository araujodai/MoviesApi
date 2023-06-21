const { Router } = require("express");

const UsersController = require("../controllers/UsersController");
const ensureAuthentication = require("../middlewares/ensureAuthentication");

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthentication, usersController.update);

module.exports = usersRoutes;