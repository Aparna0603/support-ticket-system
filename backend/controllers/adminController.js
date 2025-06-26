const Ticket = require('../models/Ticket');

// GET all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};

// POST reply to a ticket
const replyToTicket = async (req, res) => {
  const { id } = req.params;
  const { message, sender } = req.body;

  if (!message || !sender) {
    return res.status(400).json({ error: 'Missing message or sender' });
  }

  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    ticket.messages.push({ sender, message });
    await ticket.save();

    res.json({ message: 'Reply added', ticket });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reply to ticket' });
  }
};

// PUT change status
const updateTicketStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Open', 'Resolved', 'Closed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const ticket = await Ticket.findByIdAndUpdate(id, { status }, { new: true });
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    res.json({ message: 'Status updated', ticket });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};

module.exports = {
  getAllTickets,
  replyToTicket,
  updateTicketStatus,
};
