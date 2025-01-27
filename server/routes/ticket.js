const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket");

// Routes
router.get("/:id", ticketController.getTicketById);
router.put("/:id", ticketController.updateTicket);
router.delete("/:id", ticketController.deleteTicket);
router.get("/", ticketController.getAllTickets);
router.post("/", ticketController.createTicket);

module.exports = router;
