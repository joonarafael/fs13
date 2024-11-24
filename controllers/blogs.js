const express = require("express");
const { Blog } = require("../models");

const router = express.Router();

router.post("/", async (req, res) => {
	const blog = await Blog.create({
		...req.body,
	});
	res.status(200).json(blog);
});

router.get("/", async (_, res) => {
	const allBlogs = await Blog.findAll({
		attributes: ["author", "url", "title", "likes"],
	});

	res.status(200).json(allBlogs);
});

router.delete("/:id", async (req, res) => {
	const blogToDelete = await Blog.findByPk(req.params.id);

	if (!blogToDelete) {
		return res.status(404).json({ error: "Invalid blog id." });
	}

	await blogToDelete.destroy();
	res.status(204).send();
});

module.exports = router;
