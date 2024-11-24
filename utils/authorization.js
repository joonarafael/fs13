const jwt = require("jsonwebtoken");

const { User } = require("../models");

const authProvider = async (req, res, next) => {
	const authorization = req.get("authorization");

	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		try {
			const decodedToken = jwt.verify(
				authorization.substring(7),
				process.env.JWT_SECRET
			);
			req.userId = decodedToken.id;

			const user = await User.findByPk(req.userId);
			req.user = user;
		} catch (error) {
			console.log(error);
			return res.status(401).json({ error: "Invalid authorization token." });
		}
	} else {
		return res.status(401).json({ error: "Authorization token missing." });
	}
	next();
};

module.exports = { authProvider };
