const express = require("express");
require("express-async-errors");

const app = express();

const { dbConn } = require("./utils/db");

const middleware = require("./utils/middleware");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorsRouter = require("./controllers/authors");

app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorsRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpointHandler);

const start = async () => {
	await dbConn();

	const portNo = process.env.PORT || 3000;

	app.listen(portNo, () => {
		console.log(`Running on port ${portNo}.`);
	});
};

start();
