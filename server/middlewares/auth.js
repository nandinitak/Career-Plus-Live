const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res
			.status(401)
			.json({ error: "Authentication Required", code: "AUTH_REQ" });
	}

	try {
		const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decodedToken;
		next();
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			return res
				.status(401)
				.json({ error: "Token expired", code: "TOKEN_EXPIRED" });
		} else {
			return res
				.status(401)
				.send({ error: "Invalid token", code: "INVALID_TOKEN" });
		}
	}
};

module.exports = { authenticate };
