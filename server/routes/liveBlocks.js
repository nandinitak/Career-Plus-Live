const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../controllers/liveBlocks");

router.post("/auth", authenticateUser);

module.exports = router;
