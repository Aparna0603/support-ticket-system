import React, { useState } from "react";
import TicketForm from "../components/Tickets/TicketForm";
import TicketList from "../components/Tickets/TicketList";
import TicketDetail from "../components/Tickets/TicketDetail";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CustomerDashboard = ({ user }) => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="text-center mt-20 text-purple-400 text-lg font-medium">
        Loading user info...
      </div>
    );
  }

  const handleTicketCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-pink-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-purple-800">
            Welcome, <span className="capitalize text-fuchsia-600">{user.name}</span>!
          </h1>
          
        </div>


        {/* Ticket Form */}
        <section className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl mx-auto mb-16 border border-gray-100">
          <h2 className="text-2xl font-semibold text-purple-700 mb-6 flex items-center gap-2">
            📝 Report a New Issue
          </h2>
          <TicketForm user={user} onSuccess={handleTicketCreated} />
        </section>

        {/* Dashboard Content */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Ticket List */}
          <aside className="lg:w-1/3 bg-white rounded-3xl shadow-xl p-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 sticky top-24 border border-gray-100">
            <h2 className="text-xl font-semibold mb-5 text-purple-700">
              🎟️ Your Tickets
            </h2>
            <TicketList key={refreshKey} user={user} onView={setSelectedTicket} />
          </aside>

          {/* Ticket Detail */}
          <main className="lg:w-2/3 bg-white rounded-3xl shadow-xl p-8 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-300 border border-gray-100">
            {selectedTicket ? (
              <>
                <h2 className="text-xl font-semibold mb-5 text-purple-700">
                  📄 Ticket Details
                </h2>
                <TicketDetail
                  ticket={selectedTicket}
                  user={user}
                  onClose={() => setSelectedTicket(null)}
                />
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-purple-400 italic text-center px-4">
                Select a ticket to view its details. Your opened tickets will appear here.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
