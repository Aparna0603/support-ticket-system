import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-xl font-bold text-gray-900">🎫 Support System</h1>

      {user && (
        <div className="flex gap-6 items-center text-sm font-medium">
          {user.role === "customer" && (
            <Link to="/dashboard" className="text-blue-800">
              Customer Dashboard
            </Link>
          )}
          {user.role === "support" && (
            <Link to="/admin" className="text-blue-800">
              Admin Dashboard
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
