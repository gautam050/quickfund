import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import rupeeing from "../images/rupeeimg.png"

export default function Home() {
  return (
    <div className="home-container">
      <main className="home-content">
        <div className="home-text">
          <h1>Welcome to <span>QuickFund</span></h1>
          <p>
            Fast, secure, and transparent loan management.  
            Apply for loans, track your status, and manage repayments — all in one place.
          </p>
          <div className="home-buttons">
            <Link to="/signup" className="btn-primary">Get Started</Link>
            <Link to="/login" className="btn-secondary">Login</Link>
          </div>
        </div>

        <div className="home-image">
          <img
            src={rupeeing} 
            alt="QuickFund Illustration"
          />
        </div>
      </main>
    </div>
  );
}
