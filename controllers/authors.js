const express = require("express");
const { fn, col } = require("sequelize");

const { Blog } = require("../models");

const router = express.Router();

router.get("/", async (_, res) => {
	const authorList = await Blog.findAll({
		attributes: [
			"author",
			[fn("COUNT", col("author")), "blogs"],
			[fn("SUM", col("likes")), "likes"],
		],
		group: ["author"],
		order: [["likes", "DESC"]],
	});

	res.status(200).json(authorList);
});

module.exports = router;
