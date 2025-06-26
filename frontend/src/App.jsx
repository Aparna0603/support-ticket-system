import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import SupportDashboard from "./pages/SupportDashboard";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={
            user
              ? user.role === "support"
                ? <Navigate to="/admin" />
                : <Navigate to="/dashboard" />
              : <Login />
          }
        />
        <Route
          path="/register"
          element={
            user
              ? user.role === "support"
                ? <Navigate to="/admin" />
                : <Navigate to="/dashboard" />
              : <Register />
          }
        />
        <Route
          path="/dashboard"
          element={
            user?.role === "customer" ? <CustomerDashboard user={user} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin"
          element={
            user?.role === "support" ? <SupportDashboard /> : <Navigate to="/login" />
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
