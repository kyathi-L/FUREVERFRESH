import React from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../animations/pet2.json"; // Adjust path as needed
import "../styles/SelectRegistrationRole.css";

const SelectRegisterRole = () => {
  const navigate = useNavigate();

  return (
    <div className="select-register-container">
      <div className="register-role-box">
        <Player
          autoplay
          loop
          src={animationData}
          style={{ height: "200px", marginBottom: "20px" }}
        />
        <h2 className="title">Choose Registration Type</h2>
        <div className="button-container">
          <button className="auth-btn" onClick={() => navigate("/register")}>
            Register as User
          </button>
          <button className="auth-btn supplier-btn" onClick={() => navigate("/register-supplier")}>
            Register as Supplier
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectRegisterRole;
