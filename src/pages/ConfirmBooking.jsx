// src/pages/ConfirmBooking.jsx
import { useState } from "react";
import axios from "axios";

export default function ConfirmBooking() {
  const [form, setForm] = useState({
    userName: "",
    petName: "",
    serviceType: "",
    day: "",
    time: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/book-service", form);
      alert("✅ Booking Confirmed!");
      console.log(res.data);
    } catch (error) {
      alert("❌ Booking Failed: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <input name="userName" placeholder="Your Name" onChange={handleChange} required />
      <input name="petName" placeholder="Pet Name" onChange={handleChange}
        disabled={form.serviceType === "Pet Adoption"} />
      
      <select name="serviceType" onChange={handleChange} required>
        <option value="">Select Service</option>
        <option value="Grooming">Grooming</option>
        <option value="Vaccination">Vaccination</option>
        <option value="Boarding">Boarding</option>
        <option value="Pet Walking">Pet Walking</option>
        <option value="Pet Adoption">Pet Adoption</option>
      </select>

      <input type="date" name="day" onChange={handleChange} required />
      <input type="time" name="time" onChange={handleChange} required />
      <textarea name="message" placeholder="Message" onChange={handleChange} />

      <button type="submit">Confirm Booking</button>
    </form>
  );
}
