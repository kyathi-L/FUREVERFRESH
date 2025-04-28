import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Payment.css";

const Payments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);

  const paymentId = location.state?.paymentId;

  useEffect(() => {
    if (!paymentId) {
      alert("Invalid payment reference. Redirecting to Marketplace.");
      navigate("/marketplace");
      return;
    }

    axios.get(`http://localhost:3000/checkout/${paymentId}`)
      .then(res => setPaymentData(res.data.payment))
      .catch(err => {
        console.error("Failed to fetch payment:", err);
        alert("Error fetching payment details.");
        navigate("/marketplace");
      });
  }, [paymentId, navigate]);

  if (!paymentData) {
    return <div className="payments-section">Loading payment details...</div>;
  }

  return (
    <div className="payments-section">
      <h2>Payment Confirmation</h2>
      <div className="payment-card">
        <h3>Thank you, {paymentData.name}!</h3>
        <p><strong>Email:</strong> {paymentData.email}</p>
        <p><strong>Phone:</strong> {paymentData.phone}</p>
        <p><strong>Status:</strong> {paymentData.status}</p>
        <p><strong>Placed On:</strong> {new Date(paymentData.createdAt).toLocaleString()}</p>

        <h4>Items:</h4>
        <ul>
          {paymentData.cartItems.map((item, idx) => (
            <li key={idx}>
              {item.name} - Qty: {item.quantity} - ${item.cost} each
            </li>
          ))}
        </ul>

        <h3>Total Paid: ${paymentData.totalAmount.toFixed(2)}</h3>

        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
};

export default Payments;
