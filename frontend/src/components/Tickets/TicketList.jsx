import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const TicketList = ({ user, onView }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (user?._id) {
      axios
        .get(`http://localhost:8000/api/v1/tickets?userId=${user._id}`)
        .then((res) => setTickets(res.data))
        .catch((err) => console.error("Error fetching tickets:", err));
    }
  }, [user]);

  // Add inside TicketDetail.jsx, top of the component
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
    <div className="bg-white rounded-xl shadow p-4 mt-6">
      <h3 className="text-lg font-semibold mb-4">Your Tickets</h3>
      {tickets.length === 0 ? (
        <p className="text-sm text-gray-500">No tickets submitted yet.</p>
      ) : (
        <ul className="space-y-3 max-h-64 overflow-y-auto">
          {tickets.map((ticket) => (
            <li
              key={ticket._id}
              className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
              onClick={() => onView(ticket)}
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-medium text-gray-800">{ticket.issue}</p>
                  <p className="text-xs text-gray-500">
                    Submitted on {moment(ticket.createdAt).format("LL")}
                  </p>
                </div>
                {getStatusBadge(ticket.status)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TicketList;
