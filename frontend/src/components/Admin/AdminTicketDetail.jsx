import React, { useState } from 'react';
import axios from 'axios';

const AdminTicketDetail = ({ ticket, onClose }) => {
  const [reply, setReply] = useState('');
  const [status, setStatus] = useState(ticket.status);

  const handleReply = async () => {
    try {
      await axios.post(`http://localhost:8000/api/v1/admin/tickets/${ticket._id}/reply`, {
        message: reply,
        sender: 'Support Agent',
      });
      setReply('');
      window.location.reload();
    } catch (error) {
      console.error('Reply failed:', error);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/api/v1/admin/tickets/${ticket._id}/status`, {
        status,
      });
      window.location.reload();
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Ticket Detail</h2>
        <button onClick={onClose} className="text-sm text-blue-600 hover:underline">
          ← Back
        </button>
      </div>

      <p><strong>Issue:</strong> {ticket.issue}</p>
      <p><strong>From:</strong> {ticket.name} ({ticket.email})</p>

      {ticket.screenshot && (
        <img
          src={ticket.screenshot}
          alt="Screenshot"
          className="w-52 rounded border"
        />
      )}

      <div>
        <h3 className="font-semibold mb-2">Message History</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {ticket.messages.map((msg, idx) => (
            <div key={idx} className="bg-gray-100 p-2 rounded">
              <p className="text-sm">
                <strong>{msg.sender}:</strong> {msg.message}
              </p>
              <p className="text-xs text-right text-gray-400">
                {new Date(msg.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <textarea
          className="w-full border rounded p-2"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Type your reply..."
        />
        <button
          onClick={handleReply}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send Reply
        </button>
      </div>

      <div className="space-y-2">
        <select
          className="w-full border rounded p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Open">Open</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
        <button
          onClick={handleStatusUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update Status
        </button>
      </div>
    </div>
  );
};

export default AdminTicketDetail;
