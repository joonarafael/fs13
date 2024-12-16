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

// get individual user
router.get("/:id", async (req, res) => {
	// construct search query
	const where = {};

	// with ?=read=true, only return read blogs
	// with ?=read=false, only return unread blogs
	if (req.query.read) {
		where.read = req.query.read === "true";
	}

	const user = await User.findByPk(req.params.id, {
		include: [
			{
				model: Blog,
				as: "readings",
				attributes: {
					exclude: ["userId"],
				},
				through: {
					attributes: { exclude: ["userId", "blogId"] },
					where,
				},
			},
		],
	});

	res.status(200).json(user);
});

// register
router.post("/", async (req, res) => {
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
		passwordHash: hashedPassword,
	});

	const safeUser = { ...user.get(), passwordHash: undefined };

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
