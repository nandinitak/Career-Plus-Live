const Ticket = require("../models/Ticket");

exports.getTicketById = async (req, res) => {
  const { id } = req.params;

  try {
    const foundTicket = await Ticket.findOne({ _id: id });
    res.status(200).json({ foundTicket });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

exports.updateTicket = async (req, res) => {
  const { id } = req.params;
  const ticketData = req.body.formData;

  try {
    await Ticket.findByIdAndUpdate(id, { ...ticketData });
    res.status(200).json({ message: "Ticket updated" });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

exports.deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    await Ticket.findByIdAndDelete(id);
    res.status(200).json({ message: "Ticket Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

exports.createTicket = async (req, res) => {
  const ticketData = req.body;

  try {
    await Ticket.create(ticketData);
    res.status(201).json({ message: "Ticket Created" });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};
