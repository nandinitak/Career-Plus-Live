// ROUTES FOR AT CONTROLLER

const AchievementTokens = require("../models/AchievementToken");

// Create achievement tokens for a user
exports.createAchievementToken = async (req, res) => {
  const { userId, badges, certificates } = req.body;

  try {
    const achievementToken = new AchievementTokens({
      userId,
      badges,
      certificates,
    });
    await achievementToken.save();
    res.status(201).json(achievementToken);
  } catch (error) {
    console.error("Error creating achievement token:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Get achievement tokens by user ID
exports.getAchievementTokenByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const achievementToken = await AchievementTokens.findOne({ userId });
    if (!achievementToken) {
      return res
        .status(404)
        .json({ message: "Achievement tokens not found for this user." });
    }
    res.status(200).json(achievementToken);
  } catch (error) {
    console.error("Error fetching achievement tokens:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update badge progress for a user
exports.updateBadgeProgress = async (req, res) => {
  const { userId } = req.params;
  const { badgeName, completed } = req.body;

  try {
    const updated = await AchievementTokens.findOneAndUpdate(
      { userId, "badges.name": badgeName },
      {
        $set: {
          "badges.$.milestone.completed": completed,
          "badges.$.viewBadge": true, // Mark badge as viewed
        },
      },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Badge not found for this user." });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating badge progress:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Add a new certificate for a user
exports.addCertificate = async (req, res) => {
  const { userId } = req.params;
  const { title, issuer } = req.body;

  try {
    const updated = await AchievementTokens.findOneAndUpdate(
      { userId },
      {
        $push: {
          certificates: { title, issuer },
        },
      },
      { new: true }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Achievement tokens not found for this user." });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error adding certificate:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete achievement tokens for a user
exports.deleteAchievementToken = async (req, res) => {
  const { userId } = req.params;

  try {
    const deleted = await AchievementTokens.findOneAndDelete({ userId });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Achievement tokens not found for this user." });
    }

    res
      .status(200)
      .json({ message: "Achievement tokens deleted successfully." });
  } catch (error) {
    console.error("Error deleting achievement tokens:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
