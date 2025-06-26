// routes/ticketRoutes.js
const express = require('express');
const {
  createTicket,
  getUserTickets,
  getTicketById,
  addMessage,
  updateTicketStatus,
  upload,
} = require('../controllers/ticketController');

const router = express.Router();

router.post('/', upload.single('screenshot'), createTicket);
router.get('/', getUserTickets);
router.get('/:id', getTicketById);
router.post('/:id/messages', addMessage);
router.patch('/:id/status', updateTicketStatus);

module.exports = router; // ✅ CommonJS export
