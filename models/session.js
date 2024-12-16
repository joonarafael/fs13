const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../utils/db");

class Session extends Model {}

Session.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		token: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: "users", key: "id" },
		},
	},
	{
		modelName: "session",
		sequelize,
		timestamps: true,
		underscored: true,
	}
);

module.exports = Session;
