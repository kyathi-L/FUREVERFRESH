// src/pages/SelectLoginRole.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SelectLoginRole.css";

const SelectLoginRole = () => {
  const navigate = useNavigate();

  return (
    <div className="select-login-role-container">
      <div className="login-role-box">
        <h2>Select Login Role</h2>
        <div className="login-role-buttons">
          <button onClick={() => navigate("/login-admin")}>Admin</button>
          <button onClick={() => navigate("/login-supplier")}>Supplier</button>
          <button onClick={() => navigate("/login")}>User</button>
        </div>
      </div>
    </div>
  );
};

export default SelectLoginRole;
