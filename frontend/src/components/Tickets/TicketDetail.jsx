import React, { useState } from "react";
import axios from "axios";
import moment from "moment";

const TicketDetail = ({ ticket, user, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(ticket.messages || []);

  const handleSend = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/tickets/${ticket._id}/message`,
        { sender: user.name, message }
      );
      setMessages(res.data.messages);
      setMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  // 🟨 Status badge renderer
  const getStatusBadge = (status) => {
    const base = "px-2 py-1 rounded-full text-xs font-semibold";
    const colors = {
      Open: "bg-yellow-100 text-yellow-800",
      Resolved: "bg-green-100 text-green-800",
      Closed: "bg-red-100 text-red-800",
    };
    return <span className={`${base} ${colors[status]}`}>{status}</span>;
  };

  return (
    <div className="mt-6 bg-white shadow rounded-xl p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-purple-700">Ticket Detail</h3>
        <button
          className="text-sm text-red-500 hover:underline"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      {/* Issue Text */}
      <p className="text-md mb-2 text-gray-700">{ticket.issue}</p>

      {/* 🟩 Status Badge */}
      <div className="mb-3">
        <strong className="text-sm text-gray-700">Status:</strong>{" "}
        {getStatusBadge(ticket.status)}
      </div>

      {/* Screenshot */}
{ticket.screenshot && (
  <img
    src={`${import.meta.env.VITE_API_URL}${ticket.screenshot}`}
    alt="Screenshot"
    className="w-48 rounded mt-2"
  />
)}

      {/* Message Thread */}
      <div className="mt-4 max-h-60 overflow-y-auto bg-gray-100 p-3 rounded space-y-2">
        {messages.length === 0 ? (
          <p className="text-sm text-gray-500">No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.sender}:</strong> {msg.message}
              <div className="text-xs text-gray-400">
                {moment(msg.timestamp).fromNow()}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="mt-3 flex items-center gap-2">
        <input
          className="flex-grow px-3 py-2 border rounded-md"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default TicketDetail;
