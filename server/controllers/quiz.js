// QUIZ QUESTION CONTROLLER

const QuizQuestion = require("../models/quiz/Quiz"); // Corrected the path

// Create a new quiz question
exports.createQuizQuestion = async (req, res) => {
  const {
    question,
    options,
    correctAnswer,
    topic,
    difficultyLevel,
    explanation,
  } = req.body;

  // Validate input
  if (!question || !options || !correctAnswer || !topic || !difficultyLevel) {
    return res
      .status(400)
      .json({ message: "All fields are required except explanation" });
  }

  try {
    // Create a new quiz question with the provided details
    const quizQuestion = new QuizQuestion({
      question,
      options,
      correctAnswer,
      topic,
      difficultyLevel,
      explanation,
    });

    // Save the quiz question to the database
    await quizQuestion.save();

    // Return success response with quiz question data
    res.status(201).json(quizQuestion);
  } catch (error) {
    console.error("Error creating quiz question:", error);
    res
      .status(500)
      .json({ message: "Internal server error while creating quiz question" });
  }
};

// Get quiz question by ID
exports.getQuizQuestionById = async (req, res) => {
  try {
    const quizQuestion = await QuizQuestion.findById(req.params.id);
    if (!quizQuestion) {
      return res.status(404).json({ message: "Quiz question not found" });
    }
    res.status(200).json(quizQuestion);
  } catch (error) {
    console.error("Error fetching quiz question by ID:", error);
    res.status(500).json({
      message: "Internal server error while fetching quiz question by ID",
    });
  }
};

// Get all quiz questions for a specific topic
exports.getAllQuizQuestionsByTopic = async (req, res) => {
  try {
    const quizQuestions = await QuizQuestion.find({ topic: req.params.topic });
    if (!quizQuestions.length) {
      return res
        .status(404)
        .json({ message: "No quiz questions found for this topic" });
    }
    res.status(200).json(quizQuestions);
  } catch (error) {
    console.error("Error fetching quiz questions by topic:", error);
    res
      .status(500)
      .json({ message: "Internal server error while fetching quiz questions" });
  }
};

// Update a quiz question
exports.updateQuizQuestion = async (req, res) => {
  const {
    question,
    options,
    correctAnswer,
    topic,
    difficultyLevel,
    explanation,
  } = req.body;

  // Validate input
  if (!question || !options || !correctAnswer || !topic || !difficultyLevel) {
    return res
      .status(400)
      .json({ message: "All fields are required except explanation" });
  }

  try {
    const quizQuestion = await QuizQuestion.findByIdAndUpdate(
      req.params.id,
      {
        question,
        options,
        correctAnswer,
        topic,
        difficultyLevel,
        explanation,
      },
      { new: true, runValidators: true }
    );

    if (!quizQuestion) {
      return res.status(404).json({ message: "Quiz question not found" });
    }

    res.status(200).json(quizQuestion);
  } catch (error) {
    console.error("Error updating quiz question:", error);
    res
      .status(500)
      .json({ message: "Internal server error while updating quiz question" });
  }
};

// Delete a quiz question by ID
exports.deleteQuizQuestion = async (req, res) => {
  try {
    const quizQuestion = await QuizQuestion.findByIdAndDelete(req.params.id);
    if (!quizQuestion) {
      return res.status(404).json({ message: "Quiz question not found" });
    }
    res.status(200).json({ message: "Quiz question deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz question:", error);
    res
      .status(500)
      .json({ message: "Internal server error while deleting quiz question" });
  }
};
