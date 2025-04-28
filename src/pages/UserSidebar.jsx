import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import "../styles/UserSidebar.css";

const UserSidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".user-sidebar") && !e.target.closest(".menu-icon")) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="menu-icon" onClick={toggleSidebar}>
        <MenuIcon fontSize="large" />
      </div>

      <div className={`user-sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Paw Care</h2>
          <CloseIcon className="close-icon" onClick={toggleSidebar} />
        </div>
        <ul className="sidebar-links">
          <li className={location.pathname === "/services" ? "active" : ""}>
            <Link to="/services">Services</Link>
          </li>
          <li className={location.pathname === "/marketplace" ? "active" : ""}>
            <Link to="/marketplace">Marketplace</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserSidebar;
