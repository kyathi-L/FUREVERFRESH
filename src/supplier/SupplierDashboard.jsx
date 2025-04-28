import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SupplierDashboard.css"; // Link to external CSS

const SupplierDashboard = () => {
  const navigate = useNavigate();

  const supplier = JSON.parse(localStorage.getItem("supplier"));

  const sections = [
    {
      title: "Product Management",
      desc: "Manage your product listings: add, update, or delete items.",
      onClick: () => navigate("/supplier/products")
    },
    {
      title: "Profile / Account Settings",
      desc: "Update your company and contact information.",
      onClick: () => navigate(`/supplier/profile/${supplier._id}`)
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem("supplierToken");
    navigate("/login-supplier");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Supplier Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="dashboard-grid">
        {sections.map((section, index) => (
          <div className="dashboard-card" key={index}>
            <h3>{section.title}</h3>
            <p>{section.desc}</p>
            <button onClick={section.onClick}>Open</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupplierDashboard;
