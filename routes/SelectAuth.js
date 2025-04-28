import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SelectAuth.css"; // Add styles for this page

const SelectAuth = () => {
  const navigate = useNavigate();

  return (
    <div className="select-auth-container">
      <h2>Get Started</h2>
      <p>Choose an option to continue</p>
      <div className="auth-buttons">
      <button onClick={() => navigate("/select-login-role")} className="login-btn1">Login</button>
        <button className="register-btn" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default SelectAuth;
