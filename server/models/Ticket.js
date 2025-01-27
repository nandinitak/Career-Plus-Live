const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the ticket schema
const ticketSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: Number, required: true },
    progress: { type: Number, default: 0 },
    status: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Export the Ticket model
const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
