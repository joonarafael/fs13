const express = require("express");
const { Blog, User } = require("../models");

const { authProvider } = require("../utils/authorization");

const router = express.Router();

// middleware to find a blog by id
const blogFinder = async (req, _, next) => {
	req.blog = await Blog.findByPk(req.params.id);
	next();
};

// list all blogs
router.get("/", async (_, res) => {
	// search query
	const where = {};

	if (req.query.search) {
		where[Op.or] = [
			{
				title: {
					[Op.substring]: req.query.search,
				},
			},
			{
				author: {
					[Op.substring]: req.query.search,
				},
			},
		];
	}

	const allBlogs = await Blog.findAll({
		attributes: ["author", "url", "title", "likes"],
		include: {
			model: User,
			attributes: ["name"],
		},
		where,
		order: [["likes", "DESC"]],
	});

	res.status(200).json(allBlogs);
});

// post a new blog
router.post("/", authProvider, async (req, res) => {
	const blog = await Blog.create({
		...req.body,
		likes: 0,
		userId: req.user.id,
	});

	res.status(201).json(blog);
});

// delete a blog by id
router.delete("/:id", authProvider, blogFinder, async (req, res) => {
	if (!req.user) {
		return res.status(401).json({ error: "Unauthorized." });
	}

	if (!req.blog) {
		return res.status(404).json({ error: "Invalid blog ID." });
	}

	if (req.blog.userId.toString() !== req.user.id.toString()) {
		return res.status(403).json({ error: "Forbidden: This is not your blog." });
	}

	await req.blog.destroy();

	res.status(204).send();
});

// like a blog by id
router.put("/:id", blogFinder, async (req, res) => {
	if (req.blog) {
		await req.blog.update({
			likes: Number.parseInt(JSON.stringify(req.blog.likes)) + 1,
		});

		res.status(200).json({
			likes: req.blog.likes,
		});
	} else {
		res.status(404).send();
	}
});

module.exports = router;
