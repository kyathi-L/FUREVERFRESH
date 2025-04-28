import React from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import petLottie from "../animations/petLottie.json";
import "../styles/SelectAuth.css";

const SelectAuth = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-wrapper">
      <svg className="background-svg" viewBox="0 0 500 150" preserveAspectRatio="none">
        <path d="M0,0 C150,100 350,0 500,100 L500,0 L0,0 Z" style={{ stroke: "none", fill: "#e0f7fa" }}></path>
      </svg>

      <div className="auth-card">
        <Player
          autoplay
          loop
          src={petLottie}
          style={{ height: "150px", marginBottom: "10px" }}
        />

        <h2 className="auth-title">Welcome to Paw Care</h2>
        <p className="auth-subtitle">Please choose an option to proceed</p>

        <div className="auth-buttons">
          <button className="auth-btn register-btn" onClick={() => navigate("/select-register-role")}>
            Register
          </button>
          <button className="auth-btn login-btn" onClick={() => navigate("/select-login-role")}>
            Login
          </button>
        </div>

        <div className="auth-footer">
          <button onClick={() => navigate("/")} className="back-link">
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectAuth;
