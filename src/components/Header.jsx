import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // or your auth key
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        <h2 className="logo">QuickFund</h2>

        <nav className="nav-links">
          <Link to="/dashboard">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/dashboard"></Link>
          {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
