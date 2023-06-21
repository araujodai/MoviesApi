const { Router } = require("express");

const usersRouter = require("./users.routes");
const movieNotesRouter = require("./movies.routes");
const movieTagsRouter = require("./tags.routes");
const sessionsRouter = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/movies", movieNotesRouter);
routes.use("/tags", movieTagsRouter);

module.exports = routes;