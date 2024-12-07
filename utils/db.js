require("dotenv").config();

const { Umzug, SequelizeStorage } = require("umzug");
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
		console.log("DB conn authenticated!");

		await runMigrations();

		console.log("DB conn successful!");
	} catch (error) {
		console.error("DB conn unsuccessful:", error);
		return process.exit(1);
	}
};

const migrationConf = {
	migrations: {
		glob: "migrations/*.js",
	},
	storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
	context: sequelize.getQueryInterface(),
	logger: console,
};

const runMigrations = async () => {
	const migrator = new Umzug(migrationConf);
	const migrations = await migrator.up();
	console.log("Migrations up to date:", {
		files: migrations.map((mig) => mig.name),
	});
};

const rollbackMigration = async () => {
	await sequelize.authenticate();
	const migrator = new Umzug(migrationConf);
	await migrator.down();
};

module.exports = { dbConn, sequelize, runMigrations, rollbackMigration };
