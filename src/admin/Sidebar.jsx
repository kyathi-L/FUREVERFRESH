import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../admin/style/Sidebar.css";

// Material UI Icons - Filled style
import PeopleIcon from "@mui/icons-material/PeopleRounded";
import StoreIcon from "@mui/icons-material/StoreMallDirectory";
import BuildIcon from "@mui/icons-material/BuildCircle";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PetsIcon from "@mui/icons-material/Pets";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Sidebar = () => {
  const navigate = useNavigate();
  const [showUserSubmenu, setShowUserSubmenu] = useState(false);

  const toggleUserSubmenu = () => {
    setShowUserSubmenu((prev) => !prev);
  };

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li onClick={toggleUserSubmenu}>
          <PeopleIcon className="icon" />
          Users ▼
        </li>
        {showUserSubmenu && (
          <ul className="submenu">
            <li onClick={() => navigate("/admin/users")}>
              <PeopleIcon className="icon-sm" />
              Users
            </li>
            <li onClick={() => navigate("/admin/supplier")}>
              <StoreIcon className="icon-sm" />
              Supplier
            </li>
          </ul>
        )}
        <li onClick={() => navigate("/admin/services")}>
          <BuildIcon className="icon" />
          Services
        </li>
        <li onClick={() => navigate("/admin/market")}>
          <ShoppingBagIcon className="icon" />
          Marketplace
        </li>
        <li onClick={() => navigate("/admin/adoption")}>
          <PetsIcon className="icon" />
          Adoption
        </li>
        <li onClick={() => navigate("/admin/dashboard")}>
          <DashboardIcon className="icon" />
          Dashboard
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
