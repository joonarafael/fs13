const { DataTypes, Model } = require("sequelize");

const { sequelize } = require("../utils/db");

class User extends Model {}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				isEmail: true,
			},
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		passwordHash: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		defaultScope: {
			attributes: { exclude: ["passwordHash"] },
		},
		modelName: "user",
		sequelize,
		timestamps: true,
		underscored: true,
	}
);

module.exports = User;
