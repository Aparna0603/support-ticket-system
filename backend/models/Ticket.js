const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true, // Make sure the frontend always sends this
  },
  email: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  screenshot: String,
  status: {
    type: String,
    enum: ['Open', 'Resolved', 'Closed'],
    default: 'Open',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      sender: String,
      message: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model('Ticket', ticketSchema);
