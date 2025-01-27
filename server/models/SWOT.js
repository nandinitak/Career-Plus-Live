// SWOT DATABASE

const mongoose = require("mongoose");

// Milestone Schema with Error Handling
const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Milestone title is required"],
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Goal Schema with Detailed Error Handling
const goalSchema = new mongoose.Schema(
  {
    statement: {
      type: String,
      required: [true, "Goal statement is required"],
      trim: true,
      minlength: [5, "Goal statement must be at least 5 characters long"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters long"],
    },
    timeframe: {
      type: String,
      required: [true, "Timeframe is required"],
    },
    progress: {
      type: Number,
      required: [true, "Progress is required"],
      min: [0, "Progress cannot be less than 0"],
      max: [100, "Progress cannot exceed 100"],
    },
    milestones: {
      type: [milestoneSchema],
      validate: [arrayLimit, "A goal must have at least one milestone"],
    },
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length > 0;
}

// SWOT Item Schema with Enum and Validation
const swotItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "SWOT item title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    effect: {
      type: String,
      required: [true, "Effect is required"],
    },
    impact: {
      type: String,
      enum: {
        values: ["high", "medium", "low"],
        message: "Impact must be either high, medium, or low",
      },
      required: [true, "Impact is required"],
    },
    status: {
      type: String,
      enum: {
        values: ["active", "monitoring", "resolved"],
        message: "Status must be either active, monitoring, or resolved",
      },
      required: [true, "Status is required"],
    },
    meaning: {
      type: String,
      required: [true, "Meaning is required"],
      trim: true,
    },
    use: {
      type: String,
      required: [true, "Use is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

// SWOT Data Schema
const swotDataSchema = new mongoose.Schema(
  {
    strengths: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SWOTItem",
      },
    ],
    weaknesses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SWOTItem",
      },
    ],
    opportunities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SWOTItem",
      },
    ],
    threats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SWOTItem",
      },
    ],
  },
  { timestamps: true }
);

// Error Handling Middleware for validation errors
swotDataSchema.post("save", (error, doc, next) => {
  if (error.name === "ValidationError") {
    next(
      new Error(
        `SWOT Data validation failed: ${Object.values(error.errors)
          .map((e) => e.message)
          .join(", ")}`
      )
    );
  } else {
    next(error);
  }
});

goalSchema.post("save", (error, doc, next) => {
  if (error.name === "ValidationError") {
    next(
      new Error(
        `Goal validation failed: ${Object.values(error.errors)
          .map((e) => e.message)
          .join(", ")}`
      )
    );
  } else {
    next(error);
  }
});

// Export Models
module.exports = {
  Goal: mongoose.model("Goal", goalSchema),
  SWOTItem: mongoose.model("SWOTItem", swotItemSchema),
  SWOTData: mongoose.model("SWOTData", swotDataSchema),
};
