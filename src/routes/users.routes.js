const { Router, response } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require("../controllers/UsersController");
const ensureAuthentication = require("../middlewares/ensureAuthentication");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthentication, usersController.update);
usersRoutes.patch("/avatar", ensureAuthentication, upload.single("avatar"), (request, response) => {
  console.log(request.file.filename);
  response.json();
});

module.exports = usersRoutes;