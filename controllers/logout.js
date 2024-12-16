const express = require("express");

const { Session } = require("../models");
const { authProvider } = require("../utils/authorization");

const router = express.Router();

// logout
router.delete("/", authProvider, async (req, res) => {
	const session = await Session.findOne({
		where: { token: req.sessionToken },
	});

	if (!session) {
		return res.status(400).json({
			error: "Logout unsuccessful, unknown session.",
		});
	}

	await session.destroy();

	res.status(200).send("Logout successful.");
});

module.exports = router;
