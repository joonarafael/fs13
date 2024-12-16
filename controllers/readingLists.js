const express = require("express");
const { Blog, ReadingList } = require("../models");

const { authProvider } = require("../utils/authorization");

const router = express.Router();

// middleware to find a blog by id (id as the value for key 'blog_id' in request)
const blogFinder = async (req, _, next) => {
	req.blog = await Blog.findByPk(req.body.blogId);

	next();
};

// add a blog to readingList
router.post("/", authProvider, blogFinder, async (req, res) => {
	if (!req.user) {
		return res.status(401).json({ error: "Unauthorized." });
	}

	if (!req.blog) {
		return res.status(404).json({ error: "Invalid blog ID." });
	}

	await ReadingList.create({
		userId: req.user.id,
		blogId: req.blog.id,
	});

	res.status(201).send();
});

router.put("/:id", authProvider, async (req, res) => {
	const readingList = await ReadingList.findByPk(req.params.id);
	await readingList.update({ read: req.body.read });

	res.status(200).json(readingList);
});

module.exports = router;
