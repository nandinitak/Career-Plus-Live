// MODULE FOR ACHIEVEMENT TOKENS

const mongoose = require("mongoose");

// Define schema for badges
const badgeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    dateAchieved: {
      type: Date,
      default: Date.now,
    },
    viewBadge: {
      type: Boolean,
      default: false, // Whether the badge is viewed by the user
    },
    claimed: {
      type: Boolean,
      default: false, // Whether the badge has been claimed by the user
    },
    milestone: {
      completed: {
        type: Number,
        required: true, // e.g., 1, 5
        default: 0,
      },
      percentage: {
        type: String,
        get: function () {
          // Calculate and return the percentage
          return ((this.completed / this.total) * 100).toFixed(2) + "%";
        },
      },
    },
  },
  { _id: false } // Disable _id for subdocuments like badges
);

// Define schema for certificates
const certificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    issuer: {
      type: String,
      required: true,
    },
    dateAchieved: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // Disable _id for subdocuments like certificates
);

// Define schema for achievement tokens
const achievementTokensSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming a User model exists
      required: true,
    },
    badges: [badgeSchema],
    certificates: [certificateSchema],
  },
  { timestamps: true } // Automatically handle createdAt and updatedAt fields
);

// Create model for achievement tokens
const AchievementTokens = mongoose.model(
  "AchievementTokens",
  achievementTokensSchema
);

module.exports = AchievementTokens;
