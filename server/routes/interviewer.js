const express = require("express");
const { createInterviewer } = require("../controllers/interviewer");
const router = express.Router();
const { createInterviewerSchema } = require("../schemas/interviewerSchema");
const { validate } = require("../middlewares/validateSchema");
router.post("/", createInterviewer);

module.exports = router;
