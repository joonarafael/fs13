const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const express = require("express");

const { User, Session } = require("../models");

const router = express.Router();

// login
router.post("/", async (request, response) => {
	const { username, password } = request.body;

	if (!username || !password) {
		return response.status(400).json({
			error: "Username or password missing.",
		});
	}

	const user = await User.findOne({
		where: {
			username: username,
		},
		attributes: ["id", "username", "passwordHash"],
	});

	if (!user) {
		return response.status(401).json({
			error: "Invalid username or password.",
		});
	}

	const passwordMatch = await bcrypt.compare(password, user.passwordHash);

	if (!passwordMatch) {
		return response.status(401).json({
			error: "Invalid username or password.",
		});
	}

	const sessionToken = crypto.randomBytes(32).toString("hex");

	await Session.create({
		userId: user.id,
		token: sessionToken,
	});

	response
		.status(200)
		.send({ token: sessionToken, username: user.username, name: user.name });
});

module.exports = router;
