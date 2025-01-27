const express = require("express");

const router = express.Router();

router.get("/dashboard", (req, res) => {
	res.json({ message: `Welcome ${req.user.username}` });
});

module.exports = router;
