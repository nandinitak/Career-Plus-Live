const express = require("express");
const router = express.Router();
const achievementTokensController = require("../controllers/achievementToken");

// Routes for Achievement Tokens
router.post("/", achievementTokensController.createAchievementToken); // Create achievement tokens for a user
router.get("/:userId", achievementTokensController.getAchievementTokenByUserId); // Get tokens for a specific user
router.put("/:userId/badge", achievementTokensController.updateBadgeProgress); // Update badge progress
router.put("/:userId/certificate", achievementTokensController.addCertificate); // Add a new certificate
router.delete("/:userId", achievementTokensController.deleteAchievementToken); // Delete all tokens for a user

module.exports = router;
