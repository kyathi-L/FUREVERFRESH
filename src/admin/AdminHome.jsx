import React from "react";
import { useNavigate } from "react-router-dom";
import "../admin/style/AdminHome.css";
import { Player } from "@lottiefiles/react-lottie-player";
import adminAnimation from "../animations/Animation - 1745383662657.json"; // adjust path if needed

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-home-container">
      <Player
        autoplay
        loop
        src={adminAnimation}
        style={{ height: "220px", marginBottom: "20px" }}
      />

      <h1>Welcome Admin</h1>

      <div className="admin-buttons">
        <button onClick={() => navigate("/admin/users")}>Users</button>
        <button onClick={() => navigate("/admin/supplier")}>Supplier</button>
        <button onClick={() => navigate("/admin/services")}>Services</button>
        <button onClick={() => navigate("/admin/adoption")}>Adoption</button>
        <button onClick={() => navigate("/admin/market")}>Marketplace</button>
        <button onClick={() => navigate("/admin/dashboard")}>Dashboard</button>
      </div>
    </div>
  );
};

export default AdminHome;
