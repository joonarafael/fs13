const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

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

	console.log(user);

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

	const userForToken = {
		username: user.username,
		id: user.id,
	};

	const token = jwt.sign(userForToken, process.env.JWT_SECRET);

	response
		.status(200)
		.send({ token, username: user.username, name: user.name });
});

module.exports = router;
