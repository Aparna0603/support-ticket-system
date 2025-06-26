const express = require('express');
const {
  getAllTickets,
  replyToTicket,
  updateTicketStatus,
} = require('../controllers/adminController');

const router = express.Router();

router.get('/tickets', getAllTickets);
router.post('/tickets/:id/reply', replyToTicket);
router.put('/tickets/:id/status', updateTicketStatus);

module.exports = router;
