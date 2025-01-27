// KHANBAN CONTROLLER

const KanbanBoard = require("../models/Kanban");

// Create or update a Kanban board
exports.createOrUpdateBoard = async (req, res) => {
  const { userId } = req.body;
  const { columns } = req.body;

  if (!userId || !columns) {
    return res.status(400).json({
      success: false,
      message: "User ID and columns data are required.",
    });
  }

  try {
    let board = await KanbanBoard.findOne({ userId });

    if (board) {
      // Update existing board
      board.columns = columns;
      await board.save();
      res.status(200).json({
        success: true,
        message: "Kanban board updated successfully.",
        data: board,
      });
    } else {
      // Create a new board if none exists
      board = new KanbanBoard({ userId, columns });
      await board.save();
      res.status(201).json({
        success: true,
        message: "Kanban board created successfully.",
        data: board,
      });
    }
  } catch (error) {
    console.error("Error creating/updating board:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

// Fetch the Kanban board by user ID
exports.getBoardByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const board = await KanbanBoard.findOne({ userId });

    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Kanban board not found for this user.",
      });
    }

    res.status(200).json({
      success: true,
      data: board,
    });
  } catch (error) {
    console.error("Error fetching board:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

// Add a new column to the Kanban board by user ID
exports.addColumn = async (req, res) => {
  const { userId } = req.params;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Column title is required.",
    });
  }

  try {
    let board = await KanbanBoard.findOne({ userId });

    if (!board) {
      // Create a new board if one doesn't exist
      board = await KanbanBoard.create({ userId, columns: [] });
    }

    board.columns.push({ title, tasks: [] });
    await board.save();

    res.status(201).json({
      success: true,
      message: "Column added successfully.",
      data: board,
    });
  } catch (error) {
    console.error("Error adding column:", error);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal Server Error.",
    });
  }
};

// Add a new task to a column by user ID
exports.addTask = async (req, res) => {
  const { userId } = req.params;
  const { columnId, content } = req.body;

  if (!columnId || !content) {
    return res.status(400).json({
      success: false,
      message: "Both Column ID and Task content are required.",
    });
  }

  try {
    const board = await KanbanBoard.findOne({ userId });

    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Kanban board not found for this user.",
      });
    }

    const column = board.columns.id(columnId);
    if (!column) {
      return res.status(404).json({
        success: false,
        message: "Column not found.",
      });
    }

    column.tasks.push({ content });
    await board.save();

    res.status(201).json({
      success: true,
      message: "Task added successfully.",
      data: board,
    });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

// Switch a task between columns or reorder within the same column
exports.switchTask = async (req, res) => {
  const { userId } = req.params;
  const { taskId, fromColumnId, toColumnId } = req.body;

  if (!taskId || !fromColumnId || !toColumnId) {
    return res.status(400).json({
      success: false,
      message: "Task ID and column IDs are required.",
    });
  }

  try {
    const board = await KanbanBoard.findOne({ userId });

    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Kanban board not found for this user.",
      });
    }

    const fromColumn = board.columns.id(fromColumnId);
    const toColumn = board.columns.id(toColumnId);

    if (!fromColumn || !toColumn) {
      return res.status(404).json({
        success: false,
        message: "Column(s) not found.",
      });
    }

    const task = fromColumn.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    // Remove task from the original column and add to the new column
    fromColumn.tasks.pull(taskId);
    toColumn.tasks.push(task);

    await board.save();

    res.status(200).json({
      success: true,
      message: "Task moved successfully.",
      data: board,
    });
  } catch (error) {
    console.error("Error switching task:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

// Switch a column to reorder within the board
exports.switchList = async (req, res) => {
  const { userId } = req.params;
  const { fromIndex, toIndex } = req.body;

  if (fromIndex === undefined || toIndex === undefined) {
    return res.status(400).json({
      success: false,
      message: "Both fromIndex and toIndex are required.",
    });
  }

  try {
    const board = await KanbanBoard.findOne({ userId });

    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Kanban board not found for this user.",
      });
    }

    const column = board.columns.splice(fromIndex, 1)[0]; // Remove the column from its original position
    board.columns.splice(toIndex, 0, column); // Insert the column at the new position

    await board.save();

    res.status(200).json({
      success: true,
      message: "Column reordered successfully.",
      data: board,
    });
  } catch (error) {
    console.error("Error switching list:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

// Remove a task from a column by user ID
exports.removeTask = async (req, res) => {
  const { userId } = req.params;
  const { columnId, taskId } = req.body;

  if (!columnId || !taskId) {
    return res.status(400).json({
      success: false,
      message: "Both Column ID and Task ID are required.",
    });
  }

  try {
    const board = await KanbanBoard.findOne({ userId });

    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Kanban board not found for this user.",
      });
    }

    const column = board.columns.id(columnId);
    if (!column) {
      return res.status(404).json({
        success: false,
        message: "Column not found.",
      });
    }

    const task = column.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    task.remove();
    await board.save();

    res.status(200).json({
      success: true,
      message: "Task removed successfully.",
      data: board,
    });
  } catch (error) {
    console.error("Error removing task:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

// Remove a column (list) from the Kanban board by user ID
exports.removeColumn = async (req, res) => {
  const { userId } = req.params;
  const { columnId } = req.body;

  if (!columnId) {
    return res.status(400).json({
      success: false,
      message: "Column ID is required.",
    });
  }

  try {
    const board = await KanbanBoard.findOne({ userId });

    if (!board) {
      return res.status(404).json({
        success: false,
        message: "Kanban board not found for this user.",
      });
    }

    const column = board.columns.id(columnId);
    if (!column) {
      return res.status(404).json({
        success: false,
        message: "Column not found.",
      });
    }

    column.remove();
    await board.save();

    res.status(200).json({
      success: true,
      message: "Column removed successfully.",
      data: board,
    });
  } catch (error) {
    console.error("Error removing column:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};
