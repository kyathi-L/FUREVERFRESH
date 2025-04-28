// src/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Create the context
const UserContext = createContext();

// 2. Custom hook to use the context
export const useUser = () => useContext(UserContext);

// 3. Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 4. Load user data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsedUser = JSON.parse(stored);
        if (parsedUser?._id && parsedUser?.email) {
          setUser(parsedUser);
        }
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
