const { User, Session } = require("../models");

const authProvider = async (req, res, next) => {
	const authorization = req.get("authorization");

	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		try {
			// extract session token
			const sessionToken = authorization.substring(7);

			// check that the session actually exists
			const session = await Session.findOne({
				where: { token: sessionToken },
				include: User,
			});

			if (!session) {
				return res.status(401).json({ error: "Unauthorized." });
			}

			req.userId = session.userId;

			// check that the user actually exists
			const user = await User.findByPk(req.userId);

			if (!user) {
				return res.status(401).json({ error: "Unauthorized." });
			}

			// user & session OK, execute authorization
			req.user = user;
			req.sessionToken = sessionToken;
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
