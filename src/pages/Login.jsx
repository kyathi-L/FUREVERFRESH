import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext"; // ⬅️ import AuthContext
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUser: setUserGlobal } = useUser();
  const { login: authLogin } = useContext(AuthContext); // ⬅️ from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      if (response.status === 200 && response.data.token) {
        const { _id, name, email, phone, role } = response.data.user;

        const userData = { _id, name, email, phone, role };

        // ✅ Save globally and to context
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", response.data.token);
        authLogin(userData); // AuthContext
        setUserGlobal(userData); // UserContext

        setMessage("✅ Login successful!");
        setTimeout(() => navigate("/marketplace"), 1500);
      } else {
        setMessage("❌ Login failed: " + response.data.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("❌ An error occurred during login");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-animation">
        <lord-icon
          src="https://cdn.lordicon.com/udbbfuld.json"
          trigger="loop"
          colors="primary:#121331,secondary:#f73065"
          style={{ width: "150px", height: "150px" }}
        ></lord-icon>
      </div>
      <div className="login-container fade-in">
        <h2>🔐 Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {message && (
          <p className={`message ${message.startsWith("✅") ? "success" : "error"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
