const { DataTypes } = require("sequelize");

// migration adding a year field to the blogs table

module.exports = {
	up: async ({ context: queryInterface }) => {
		const currentYear = new Date().getFullYear();

		await queryInterface.addColumn("blogs", "year", {
			type: DataTypes.INTEGER,
			allowNull: true, // optional
			validate: {
				min: 1991,
				max: currentYear,
			},
		});

		await queryInterface.sequelize.query(`
			ALTER TABLE blogs
			ADD CONSTRAINT year_range CHECK (year IS NULL OR (year > 1990 AND year <= ${currentYear}));
		`);
	},

	down: async ({ context: queryInterface }) => {
		await queryInterface.removeColumn("blogs", "year");
	},
};
