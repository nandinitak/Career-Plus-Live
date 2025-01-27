// QUIZ QUESTION ROUTES

const express = require("express");
const router = express.Router();
const quizQuestionController = require("../controllers/quiz");

// Create a new quiz question
router.post("/", quizQuestionController.createQuizQuestion);

// Get quiz question by ID
router.get("/:id", quizQuestionController.getQuizQuestionById);

// Get all quiz questions for a specific topic
router.get("/topic/:topic", quizQuestionController.getAllQuizQuestionsByTopic);

// Update a quiz question
router.put("/:id", quizQuestionController.updateQuizQuestion);

// Delete a quiz question
router.delete("/:id", quizQuestionController.deleteQuizQuestion);

module.exports = router;
