const { DataTypes } = require("sequelize");

// migration adding the disabled flag to users

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.addColumn("users", "disabled", {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: false,
		});
	},

	down: async ({ context: queryInterface }) => {
		await queryInterface.removeColumn("users", "disabled");
	},
};
