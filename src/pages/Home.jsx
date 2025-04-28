import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // Make sure this path matches your structure

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to <span className="highlight">Paw Care</span></h1>
        <p>Your trusted pet care platform.</p>
        <button className="home-btn" onClick={() => navigate("/select-auth")}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
