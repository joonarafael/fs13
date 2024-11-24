require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
	process.env.POSTGRES_DB,
	process.env.POSTGRES_USER,
	process.env.POSTGRES_PASS,
	{
		host: process.env.POSTGRES_HOST,
		dialect: "postgres",
		port: process.env.POSTGRES_PORT,
	}
);

const dbConn = async () => {
	try {
		await sequelize.authenticate();
		console.log("DB conn successful!");
	} catch (error) {
		console.error("DB conn unsuccessful:", error);
		return process.exit(1);
	}
};

module.exports = { dbConn, sequelize };
