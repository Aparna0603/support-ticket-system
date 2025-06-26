const Ticket = require('../models/Ticket');
const multer = require('multer');

// File upload config
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

const createTicket = async (req, res) => {
  try {
    const { userId, name, email, issue } = req.body;
    const screenshot = req.file ? `/uploads/${req.file.filename}` : null;

    const ticket = new Ticket({
      userId,
      name,
      email,
      issue,
      screenshot,
    });

    const saved = await ticket.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating ticket:", err);
    res.status(500).json({ error: "Failed to create ticket" });
  }
};

const getUserTickets = async (req, res) => {
  try {
    const { userId } = req.query;
    const tickets = await Ticket.find({ userId }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
};

const addMessage = async (req, res) => {
  try {
    const { sender, message } = req.body;
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    ticket.messages.push({ sender, message });
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add message' });
  }
};

const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['Open', 'Resolved', 'Closed'];

    if (!allowed.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updated = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error("🔴 Update status error:", err.message);
    res.status(500).json({ error: 'Failed to update status', details: err.message });
  }
};

// ✅ Export all as CommonJS
module.exports = {
  upload,
  createTicket,
  getUserTickets,
  getTicketById,
  addMessage,
  updateTicketStatus,
};
