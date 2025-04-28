import React, { useState } from "react";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = () => {
    // Save user info, maybe save to localStorage or send to the backend.
    console.log("User Info Saved:", userInfo);
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={userInfo.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={userInfo.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Your Phone"
        value={userInfo.phone}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Save Info</button>
    </div>
  );
};

export default UserProfile;
