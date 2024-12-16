const { DataTypes } = require("sequelize");

// migration initializing the reading lists functionality

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable("sessions", {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			token: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: "users", key: "id" },
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		});
	},

	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable("sessions");
	},
};
