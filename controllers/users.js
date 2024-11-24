const express = require("express");
const bcrypt = require("bcryptjs");

const { Blog, User } = require("../models");

const router = express.Router();

// list all users
router.get("/", async (_, res) => {
	const users = await User.findAll({
		include: [
			{
				model: Blog,
			},
		],
	});

	res.status(200).json(users);
});

// register
router.post("/", async (req, res) => {
	console.log("POST request to /api/users");

	const body = req.body;

	if (!body.password || body.password.length < 3) {
		return res.status(400).json({
			error: "Password must be at least 3 characters long.",
		});
	}

	const hashedPassword = await bcrypt.hash(body.password, 10);

	const user = await User.create({
		name: body.name,
		username: body.username,
		hashedPassword,
	});

	const safeUser = { ...user.get(), hashedPassword: undefined };

	res.status(201).json(safeUser);
});

// update name
router.put("/:username", async (req, res) => {
	const user = await User.findOne({
		where: {
			username: req.params.username,
		},
	});

	await user.update({ name: req.body.name });

	res.status(200).json(user);
});

module.exports = router;
