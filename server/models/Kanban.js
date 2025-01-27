// KHANBAN BOARD DATABASE

const mongoose = require("mongoose");

// Task Schema
const TaskSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required for the task"], // Custom error message for required field
      minlength: [5, "Task content must be at least 5 characters long"], // Add validation for minimum length
      maxlength: [500, "Task content can't be longer than 500 characters"], // Add validation for maximum length
    },
    state: {
      type: String,
      enum: ["todo", "in-progress", "done"], // Define possible states for the task
      default: "todo", // Default state is 'todo'
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Column Schema
const ColumnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Column title is required"], // Custom error message for required field
      minlength: [3, "Column title must be at least 3 characters long"], // Column title length validation
      maxlength: [100, "Column title can't be longer than 100 characters"], // Column title length validation
    },
    tasks: {
      type: [TaskSchema],
      default: [], // Default value for tasks
    }, // Array of tasks within the column
  },
  {
    timestamps: true,
  }
);

// Kanban Board Schema
const KanbanBoardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"], // Custom error message for required field
      ref: "User", // Reference to a User model (optional, if user system exists)
    },
    columns: {
      type: [ColumnSchema],
      default: [], // Default value for columns
      validate: {
        validator: function (v) {
          return v && v.length > 0; // Ensure that at least one column exists
        },
        message: "A Kanban board must have at least one column", // Custom error message for column validation
      },
    }, // Array of columns
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Error Handling Middleware
KanbanBoardSchema.post("save", function (error, doc, next) {
  if (error.name === "ValidationError") {
    const errorMessages = Object.values(error.errors).map((err) => err.message);
    next(new Error(`Validation Error: ${errorMessages.join(", ")}`));
  } else {
    next(error);
  }
});

KanbanBoardSchema.post("update", function (error, doc, next) {
  if (error.name === "ValidationError") {
    const errorMessages = Object.values(error.errors).map((err) => err.message);
    next(new Error(`Validation Error: ${errorMessages.join(", ")}`));
  } else {
    next(error);
  }
});

KanbanBoardSchema.post("findOneAndUpdate", function (error, doc, next) {
  if (error.name === "ValidationError") {
    const errorMessages = Object.values(error.errors).map((err) => err.message);
    next(new Error(`Validation Error: ${errorMessages.join(", ")}`));
  } else {
    next(error);
  }
});

// Export the Kanban Board model
module.exports = mongoose.model("KanbanBoard", KanbanBoardSchema);
