import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    profilePic: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
      }
    };

    fetchUserProfile();
  }, [token]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>

      <div className="mb-4">
        <strong>Name:</strong> {userData.name}
      </div>

      <div className="mb-4">
        <strong>Email:</strong> {userData.email}
      </div>

      <div className="mb-4">
        <strong>Phone:</strong> {userData.phone}
      </div>

      <div className="mb-4">
        <strong>Profile Image:</strong><br />
        {userData.profilePic ? (
          <img
            src={`http://localhost:3000/uploads/${userData.profilePic}`}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border mt-2"
          />
        ) : (
          <p>No profile image uploaded.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
