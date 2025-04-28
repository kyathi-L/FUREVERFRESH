import React, { useState, useEffect } from "react";
import axios from "axios";
import AdoptPet from "../pages/Adopt";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem
} from "@mui/material";

const serviceOptions = [
  "Pet Grooming",
  "Pet Boarding",
  "Pet Veterinary",
  "Pet Photography",
  "Pet Adoption"
];

const BookingForm = ({ open, handleClose, serviceData, servicePrices }) => {
  const [formData, setFormData] = useState({
    userName: "",
    petName: "",
    serviceType: serviceData.name || "",
    serviceId: serviceData._id || "",
    day: "",
    time: "",
    message: "",
    selectedPrice: "basic" // Default selection
  });

  const [existingBookings, setExistingBookings] = useState([]);
  const today = new Date().toISOString().split("T")[0]; // Default to today's date

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Check existing bookings when the form data changes
  useEffect(() => {
    const { serviceType, day, time } = formData;

    if (serviceType && day && time && serviceType !== "Pet Adoption") {
      axios.get(`http://localhost:3000/bookings/check`, {
        params: { serviceType, day, time }
      })
        .then((res) => setExistingBookings(res.data))
        .catch((err) => console.error("Booking check error:", err));
    }
  }, [formData.serviceType, formData.day, formData.time]);

  // Check if the selected date is in the past
  const isPastDate = (dateStr) => {
    const selected = new Date(dateStr);
    const now = new Date();
    selected.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    return selected < now;
  };

  // Check if the selected time is in the past
  const isPastTime = (dateStr, timeStr) => {
    const now = new Date();
    const selected = new Date(`${dateStr}T${timeStr}`);
    return selected < now;
  };

  // Handle form submission
  const handleSubmit = async () => {
    const { userName, petName, serviceType, day, time, message, selectedPrice } = formData;

    if (!userName || !serviceType || (serviceType !== "Pet Adoption" && !petName)) {
      return alert("❌ Please fill all required fields.");
    }

    if (serviceType !== "Pet Adoption") {
      if (isPastDate(day)) {
        return alert("❌ You cannot book for a past date.");
      }

      if (isPastTime(day, time)) {
        return alert("❌ You cannot book for a past time.");
      }

      if (existingBookings.length >= 10) {
        return alert(`❌ Service '${serviceType}' is fully booked for ${day} at ${time}`);
      }
    }

    try {
      const payload = {
        userName,
        petName: serviceType !== "Pet Adoption" ? petName : undefined,
        serviceType,
        serviceId: formData.serviceId,
        price: servicePrices[selectedPrice], // Send selected price
        day,
        time,
        message
      };

      // Send booking data to the backend
      await axios.post("http://localhost:3000/api/bookedService", payload);
      alert("✅ Booking successful!");
      handleClose(); // Close the dialog on success
    } catch (error) {
      console.error("📛 Booking Error:", error.response?.data || error.message);
      alert("❌ Failed to book service");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Book a Pet Service</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Your Name"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        {formData.serviceType !== "Pet Adoption" && (
          <TextField
            label="Pet Name"
            name="petName"
            value={formData.petName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
        )}

        <TextField
          label="Select Service"
          name="serviceType"
          select
          value={formData.serviceType}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {serviceOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Select Price"
          name="selectedPrice"
          select
          value={formData.selectedPrice}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {["basic", "premium"].map((option) => (
            <MenuItem key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)} - ₹{servicePrices[option]}
            </MenuItem>
          ))}
        </TextField>

        {formData.serviceType === "Pet Adoption" ? (
          <AdoptPet formData={formData} setFormData={setFormData} />
        ) : (
          <>
            <TextField
              label="Preferred Day"
              name="day"
              value={formData.day}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              type="date"
              inputProps={{ min: today }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Preferred Time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              type="time"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Additional Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
              margin="normal"
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">Cancel</Button>
        <Button onClick={handleSubmit} color="success" variant="contained">
          Confirm Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingForm;
