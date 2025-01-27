// SWOT Controller

const {
  Goal,
  SWOTItem,
  SWOTData,
} = require("../models/SWOT");

// Create a new Goal associated with a user
exports.createGoal = async (req, res) => {
  const { statement, description, timeframe, progress, milestones, userId } =
    req.body;

  if (
    !statement ||
    !description ||
    !timeframe ||
    progress === undefined ||
    !userId
  ) {
    return res.status(400).json({
      success: false,
      message:
        "All required fields must be provided: statement, description, timeframe, progress, and userId.",
    });
  }
  // Changes have been made accordingly...
  try {
    const newGoal = new Goal({
      statement,
      description,
      timeframe,
      progress,
      milestones,
      userId,
    });
    await newGoal.save();

    res.status(201).json({
      success: true,
      message: "Goal created successfully.",
      data: newGoal,
    });
  } catch (error) {
    console.error("Error creating goal:", error);
    const errorMessage =
      error.message || "Internal Server Error. Please try again later.";
    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

// Get all Goals for a specific user
exports.getAllGoals = async (req, res) => {
  const { userId } = req.params;

  try {
    const goals = await Goal.find({ userId });

    res.status(200).json({
      success: true,
      data: goals,
    });
  } catch (error) {
    console.error("Error fetching goals:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

// Get a Goal by ID for a specific user
exports.getGoalById = async (req, res) => {
  const { id, userId } = req.params;

  try {
    const goal = await Goal.findOne({ _id: id, userId });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    console.error("Error fetching goal by ID:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

// Update a Goal for a specific user
exports.updateGoal = async (req, res) => {
  const { id, userId } = req.params;
  const updates = req.body;

  try {
    const updatedGoal = await Goal.findOneAndUpdate(
      { _id: id, userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Goal updated successfully.",
      data: updatedGoal,
    });
  } catch (error) {
    console.error("Error updating goal:", error);
    const errorMessage =
      error.message || "Internal Server Error. Please try again later.";
    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

// Delete a Goal for a specific user
exports.deleteGoal = async (req, res) => {
  const { id, userId } = req.params;

  try {
    const deletedGoal = await Goal.findOneAndDelete({ _id: id, userId });

    if (!deletedGoal) {
      return res.status(404).json({
        success: false,
        message: "Goal not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Goal deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting goal:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

// Create a SWOT Item associated with a user
exports.createSwotItem = async (req, res) => {
  const { title, description, effect, impact, status, meaning, use, userId } =
    req.body;

  if (
    !title ||
    !description ||
    !effect ||
    !impact ||
    !status ||
    !meaning ||
    !use ||
    !userId
  ) {
    return res.status(400).json({
      success: false,
      message:
        "All fields are required for creating a SWOT item including userId.",
    });
  }

  try {
    const newSwotItem = new SWOTItem({
      title,
      description,
      effect,
      impact,
      status,
      meaning,
      use,
      userId,
    });
    await newSwotItem.save();

    res.status(201).json({
      success: true,
      message: "SWOT item created successfully.",
      data: newSwotItem,
    });
  } catch (error) {
    console.error("Error creating SWOT item:", error);
    const errorMessage =
      error.message || "Internal Server Error. Please try again later.";
    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

// Get all SWOT Items for a specific user
exports.getAllSwotItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const swotItems = await SWOTItem.find({ userId });

    res.status(200).json({
      success: true,
      data: swotItems,
    });
  } catch (error) {
    console.error("Error fetching SWOT items:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

// Get SWOT Item by ID for a specific user
exports.getSwotItemById = async (req, res) => {
  const { id, userId } = req.params;

  try {
    const swotItem = await SWOTItem.findOne({ _id: id, userId });

    if (!swotItem) {
      return res.status(404).json({
        success: false,
        message: "SWOT item not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: swotItem,
    });
  } catch (error) {
    console.error("Error fetching SWOT item by ID:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

// Update a SWOT Item for a specific user
exports.updateSwotItem = async (req, res) => {
  const { id, userId } = req.params;
  const updates = req.body;

  try {
    const updatedSwotItem = await SWOTItem.findOneAndUpdate(
      { _id: id, userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedSwotItem) {
      return res.status(404).json({
        success: false,
        message: "SWOT item not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "SWOT item updated successfully.",
      data: updatedSwotItem,
    });
  } catch (error) {
    console.error("Error updating SWOT item:", error);
    const errorMessage =
      error.message || "Internal Server Error. Please try again later.";
    res.status(500).json({
      success: false,
      message: errorMessage,
    });
  }
};

// Delete a SWOT Item for a specific user
exports.deleteSwotItem = async (req, res) => {
  const { id, userId } = req.params;

  try {
    const deletedSwotItem = await SWOTItem.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!deletedSwotItem) {
      return res.status(404).json({
        success: false,
        message: "SWOT item not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "SWOT item deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting SWOT item:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};
