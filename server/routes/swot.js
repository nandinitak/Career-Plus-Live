// SWOT ROUTE

const express = require("express");
const router = express.Router();
const {
  createGoal,
  getAllGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
  createSwotItem,
  getAllSwotItems,
  getSwotItemById,
  updateSwotItem,
  deleteSwotItem,
} = require("../controllers/swot");

// Goal routes
router.post("/goals", createGoal); // Create a new goal
router.get("/goals/user/:userId", getAllGoals); // Get all goals for a specific user (updated to match route pattern)
router.get("/goals/user/:userId/:id", getGoalById); // Get a goal by ID for a specific user
router.put("/goals/user/:userId/:id", updateGoal); // Update a goal for a specific user
router.delete("/goals/user/:userId/:id", deleteGoal); // Delete a goal for a specific user

// SWOT Item routes
router.post("/swot-items", createSwotItem); // Create a new SWOT item
router.get("/swot-items/user/:userId", getAllSwotItems); // Get all SWOT items for a specific user
router.get("/swot-items/user/:userId/:id", getSwotItemById); // Get a SWOT item by ID for a specific user
router.put("/swot-items/user/:userId/:id", updateSwotItem); // Update a SWOT item for a specific user
router.delete("/swot-items/user/:userId/:id", deleteSwotItem); // Delete a SWOT item for a specific user

module.exports = router;
