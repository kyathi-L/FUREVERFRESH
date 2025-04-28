// src/pages/AdminSupplier.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Supplier.css";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../animations/Animation - 1745385877393.json"; // adjust path as needed

const AdminSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/suppliers");
        setSuppliers(res.data);
      } catch (err) {
        console.error("Error fetching suppliers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <div className="supplier-container">
      <h2>Supplier Details</h2>

      {loading ? (
        <div className="lottie-loader">
          <Player
            autoplay
            loop
            src={animationData}
            style={{ height: "200px", width: "200px" }}
          />
          <p>Loading suppliers...</p>
        </div>
      ) : (
        <table className="supplier-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => (
              <tr key={index}>
                <td>{supplier.name}</td>
                <td>{supplier.email}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminSupplier;
