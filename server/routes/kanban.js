// KHANBAN ROUTE

const express = require("express");
const router = express.Router();
const kanbanController = require("../controllers/kanban");

// Kanban Board Routes

// Create a new Kanban board or update an existing one
router.put("/", kanbanController.createOrUpdateBoard);
// Fetch Kanban board by user ID
router.get("/:userId", kanbanController.getBoardByUserId);
// Add a new column to the Kanban board by user ID
router.post("/:userId/add-list", kanbanController.addColumn);
// Add a new task to a column by user ID
router.post("/:userId/add-task", kanbanController.addTask);
// Switch a task between columns or reorder within the same column
router.put("/:userId/switch-task", kanbanController.switchTask);
// Switch a column to reorder within the board
router.put("/:userId/switch-list", kanbanController.switchList);
// Remove a task from a column by user ID
router.delete("/:userId/remove-task", kanbanController.removeTask);
// Remove a list (column) from the Kanban board by user ID
router.delete("/:userId/remove-list", kanbanController.removeColumn);

module.exports = router;
