import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const BookedSer = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchBookedServices = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/bookings/user/${userId}`);
        setServices(response.data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load booked services.");
      }
    };
    if (userId) {
      fetchBookedServices();
    }
  }, [userId])

  if (!user) return <p>Please log in to see your booked services.</p>;

  return (
    <div className="booked-services-container">
      <h2>🐾 Your Booked Services</h2>
      {error && <p className="error">{error}</p>}
      {services.length === 0 ? (
        <p>No services booked yet.</p>
      ) : (
        <ul className="booked-services-list">
          {services.map((service) => (
            <li key={service._id} className="service-item">
              <h3>{service.serviceType}</h3>
              {service.petName && <p><strong>Pet:</strong> {service.petName}</p>}
              <p><strong>Date:</strong> {new Date(service.day).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {service.time}</p>
              {service.message && <p><strong>Note:</strong> {service.message}</p>}
              <p><strong>Status:</strong> Pending</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookedSer;
