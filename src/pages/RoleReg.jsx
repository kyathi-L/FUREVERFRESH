import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Register.css";

const RoleReg = () => {
  const navigate = useNavigate();

  return (
    <div className="register-choice-container">
      <h2>Register As</h2>
      <div className="register-buttons">
        <button onClick={() => navigate("/register")}>User</button>
        <button onClick={() => navigate("/register-supplier")}>Supplier</button>
      </div>
    </div>
  );
};

export default RoleReg;
