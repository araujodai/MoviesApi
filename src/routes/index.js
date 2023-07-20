const { Router } = require("express");

const usersRouter = require("./users.routes");
const movieNotesRouter = require("./movies.routes");
const sessionsRouter = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/movies", movieNotesRouter);

module.exports = routes;