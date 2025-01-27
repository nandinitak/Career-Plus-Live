const validate = (schema) => (req, res, next) => {
	try {
		schema.parse({
			body: req.body,
			query: req.query,
			params: req.params,
		});

		next();
	} catch (err) {
		return res
			.status(400)
			.json({ code: "BAD_RQST", message: "Schema Validation Failed" })
			.send(err.errors);
	}
};

module.exports = { validate };
