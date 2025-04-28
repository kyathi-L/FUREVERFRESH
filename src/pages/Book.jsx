import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Paw Care</h1>
        <p>Your trusted pet care platform.</p>
        <button className="home-btn" onClick={() => navigate("/register")}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
