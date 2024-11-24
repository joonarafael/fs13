const express = require("express");
const app = express();

const { dbConn } = require("./utils/db");

const blogsRouter = require("./controllers/blogs");

app.use(express.json());

app.use("/api/blogs", blogsRouter);

const main = async () => {
	await dbConn();

	const portNo = process.env.PORT || 3000;

	app.listen(portNo, () => {
		console.log(`Running on port ${portNo}.`);
	});
};

main();
