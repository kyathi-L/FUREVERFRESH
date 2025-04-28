import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import "../styles/UserLayout.css"; // Your layout styles

const UserLayout = () => {
  return (
    <div className="user-layout">
      <UserSidebar />
      <main className="user-main">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
