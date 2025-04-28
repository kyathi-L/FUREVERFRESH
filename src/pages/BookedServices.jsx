import React, { useEffect, useState } from "react";
import axios from "axios";

const BookedServices = () => {
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newDay, setNewDay] = useState("");
  const [newTime, setNewTime] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get(`http://localhost:3000/api/bookings/user/${userId}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  const handleCancel = (id) => {
    axios.delete(`http://localhost:3000/bookings/${id}`)
      .then(() => setBookings((prev) => prev.filter(b => b._id !== id)))
      .catch((err) => console.error(err));
  };

  const handleReschedule = (id) => {
    axios.put(`http://localhost:3000/bookings/${id}`, {
      day: newDay,
      time: newTime,
    })
      .then(() => {
        setBookings((prev) =>
          prev.map(b =>
            b._id === id ? { ...b, day: newDay, time: newTime } : b
          )
        );
        setEditingId(null);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="booked-services" style={{ padding: "1rem" }}>
      <h2>Your Booked Services</h2>
      {bookings.length === 0 && <p>No bookings yet.</p>}

      {bookings.map((booking) => (
        <div key={booking._id} className="booking-card" style={{ border: "1px solid #ccc", margin: "1rem 0", padding: "1rem", borderRadius: "8px" }}>
          <p><strong>Service:</strong> {booking.serviceType}</p>
          <p><strong>Day:</strong> {booking.day}</p>
          <p><strong>Time:</strong> {booking.time}</p>
          <p><strong>Message:</strong> {booking.message || "None"}</p>

          {editingId === booking._id ? (
            <div style={{ marginTop: "1rem" }}>
              <input
                type="date"
                value={newDay}
                onChange={(e) => setNewDay(e.target.value)}
              />
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
              <button onClick={() => handleReschedule(booking._id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          ) : (
            <div style={{ marginTop: "1rem" }}>
              <button onClick={() => setEditingId(booking._id)}>Reschedule</button>
              <button onClick={() => handleCancel(booking._id)} style={{ marginLeft: "1rem", color: "red" }}>
                Cancel
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookedServices;
