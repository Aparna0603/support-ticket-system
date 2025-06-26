import React, { useState } from "react";
import axios from "axios";

const SupportDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("");

  React.useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/admin/tickets");
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const handleReply = async () => {
    try {
      await axios.post(
        `http://localhost:8000/api/v1/admin/tickets/${selectedTicket._id}/reply`,
        {
          message: reply,
          sender: "Support Agent",
        }
      );
      setReply("");
      fetchTickets();
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/v1/admin/tickets/${selectedTicket._id}/status`,
        { status }
      );
      fetchTickets();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-100">
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Support Admin Panel</h1>
          <span className="text-gray-600 text-sm">Welcome, Support Agent</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ticket List */}
          <div className="md:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold">All Tickets</h2>
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                onClick={() => {
                  setSelectedTicket(ticket);
                  setStatus(ticket.status);
                }}
                className={`p-4 rounded-lg shadow cursor-pointer border-l-4 transition ${
                  ticket.status === "Resolved"
                    ? "border-green-500 bg-green-50"
                    : ticket.status === "Closed"
                    ? "border-gray-400 bg-gray-100"
                    : "border-blue-500 bg-blue-50"
                }`}
              >
                <p className="font-medium">{ticket.issue}</p>
                <p className="text-sm text-gray-600">{ticket.email}</p>
                <p className="text-xs text-gray-500">Status: {ticket.status}</p>
              </div>
            ))}
          </div>

          {/* Ticket Detail */}
          <div className="md:col-span-2">
            {selectedTicket ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Ticket Details</h2>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    ← Back to list
                  </button>
                </div>
                <p><strong>Issue:</strong> {selectedTicket.issue}</p>
                <p><strong>From:</strong> {selectedTicket.name} ({selectedTicket.email})</p>
                {selectedTicket.screenshot && (
                  <img
  src={`${import.meta.env.VITE_API_URL}${selectedTicket.screenshot}`}
  alt="screenshot"
  className="w-52 rounded border"
/>

                )}

                <div>
                  <h3 className="font-semibold mb-2">Message History</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {selectedTicket.messages.map((msg, i) => (
                      <div key={i} className="bg-gray-100 p-2 rounded">
                        <p className="text-sm">
                          <strong>{msg.sender}</strong>: {msg.message}
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
            ) : (
              <p className="text-gray-600">Select a ticket to view its details.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupportDashboard;
