import React, { useEffect, useState } from "react";
import axios from "axios";
import "../admin/style/Ser.css";

const Ser = () => {
  const [view, setView] = useState("services");
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [editBooking, setEditBooking] = useState(null);

  // Fetch services data from the backend
  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/serviceData');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  // Fetch bookings data
  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/bookedServices");
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  // Effect to fetch data based on the selected view
  useEffect(() => {
    if (view === "services") {
      fetchServices();
    } else if (view === "booked") {
      fetchBookings();
    }
  }, [view]);

  // Handle booking edit form changes
  const handleEditChange = (e) => {
    setEditBooking({ ...editBooking, [e.target.name]: e.target.value });
  };

  // Update a booking
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/api/bookedServices/${editBooking._id}`, editBooking);
      alert("Updated successfully!");
      setEditBooking(null);
      fetchBookings();
    } catch (err) {
      alert("Error updating booking.");
      console.error(err);
    }
  };

  // Delete a booking
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/bookedServices/${id}`);
      fetchBookings();
    } catch (err) {
      alert("Error deleting booking.");
      console.error(err);
    }
  };

  // Export booked services data as CSV
  const exportBookingsAsCSV = () => {
    const csvRows = [
      ["User", "Pet", "Service", "Day", "Time", "Message"],
      ...bookings.map(b => [b.userName, b.petName || "", b.serviceType, b.day, b.time, b.message])
    ];
    const csvContent = csvRows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "booked_services.csv";
    a.click();
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Manage Services</h2>
      <div className="view-buttons">
        <button className="view-button" onClick={() => setView("services")}>View Services</button>
        <button className="view-button" onClick={() => setView("booked")}>View Booked Services</button>
      </div>

      {view === "services" && (
        <div className="services-container">
          <h3 className="section-title">All Services</h3>
          <div className="services-grid">
            {services.map(service => (
              <div key={service._id} className="service-card">
                <img src={service.img} alt={service.name} className="service-image" />
                <h4 className="service-name">{service.name}</h4>
                <div className="service-prices">
                  <p><strong>Basic:</strong> ₹{service.price.basic}</p>
                  <p><strong>Premium:</strong> ₹{service.price.premium}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "booked" && (
        <div className="booked-container">
          <h3 className="section-title">Booked Services</h3>
          <button className="export-button" onClick={exportBookingsAsCSV}>Export as CSV</button>
          <table className="bookings-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Pet</th>
                <th>Service</th>
                <th>Day</th>
                <th>Time</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b._id}>
                  <td>{b.userName}</td>
                  <td>{b.petName}</td>
                  <td>{b.serviceType}</td>
                  <td>{b.day}</td>
                  <td>{b.time}</td>
                  <td>{b.message}</td>
                  <td>
                    <button className="edit-button" onClick={() => setEditBooking(b)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(b._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {view === "booked" && (
  <>
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <button className="view-button" onClick={exportBookingsAsCSV}>
        Export Bookings as CSV
      </button>
    </div>
    <div className="booked-container">
      <table className="bookings-table">
        {/* Table Head and Body here */}
      </table>
    </div>
  </>
)}


          {editBooking && (
            <div className="edit-booking-form">
              <h4>Edit Booking</h4>
              {["userName", "petName", "serviceType", "day", "time", "message"].map(field => (
                (field !== "petName" || editBooking.serviceType !== "Pet Adoption") && (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    value={editBooking[field] || ""}
                    onChange={handleEditChange}
                    placeholder={field}
                    className="input-field"
                  />
                )
              ))}

              <div className="form-buttons">
                <button className="save-button" onClick={handleUpdate}>Save</button>
                <button className="cancel-button" onClick={() => setEditBooking(null)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Ser;
