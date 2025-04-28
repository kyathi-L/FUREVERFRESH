import React, { useState, useEffect } from "react";
import axios from "axios";

const Stats = () => {
  // State to hold the statistics data
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSuppliers: 0,
    totalBookedProducts: 0,
    totalAdoptedPets: 0,
    totalBookedServices: 0,
  });

  // State to track loading state
  const [loading, setLoading] = useState(true);

  // State to track any error
  const [error, setError] = useState(null);

  // Fetch statistics from the backend
  useEffect(() => {
    axios
      .get("/api/admin/stats")
      .then((response) => {
        // Set the statistics data
        setStats(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching statistics.");
        setLoading(false);
      });
  }, []);

  // Render the statistics
  return (
    <div className="stats-container">
      <h1>Admin Statistics</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="stats-list">
          <p><strong>Total Users:</strong> {stats.totalUsers}</p>
          <p><strong>Total Suppliers:</strong> {stats.totalSuppliers}</p>
          <p><strong>Total Adopted Pets:</strong> {stats.totalAdoptedPets}</p>
          <p><strong>Total Booked Services:</strong> {stats.totalBookedServices}</p>
        </div>
      )}
    </div>
  );
};

export default Stats;
