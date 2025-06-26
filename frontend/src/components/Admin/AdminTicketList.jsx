import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminTicketList = ({ onSelectTicket }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/admin/tickets');
      setTickets(res.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">All Tickets</h2>
      {tickets.map((ticket) => (
        <div
          key={ticket._id}
          onClick={() => onSelectTicket(ticket)}
          className={`p-4 rounded-lg shadow cursor-pointer border-l-4 transition ${
            ticket.status === 'Resolved'
              ? 'border-green-500 bg-green-50'
              : ticket.status === 'Closed'
              ? 'border-gray-400 bg-gray-100'
              : 'border-blue-500 bg-blue-50'
          }`}
        >
          <p className="font-medium">{ticket.issue}</p>
          <p className="text-sm text-gray-600">{ticket.email}</p>
          <p className="text-xs text-gray-500">Status: {ticket.status}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminTicketList;
