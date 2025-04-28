import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../admin/style/AdminLogin.css";
import animationData from "../animations/Animation - 1745383669367.json";
import { Player } from "@lottiefiles/react-lottie-player";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "Kyathi" && password === "1234@K") {
      navigate("/admin-home");
    } else {
      setError("Invalid Admin Credentials");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-animation">
          <Player autoplay loop src={animationData} />
        </div>
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
