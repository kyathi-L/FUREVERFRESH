import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminPayments.css";

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/payments")
      .then(res => setPayments(res.data))
      .catch(err => console.error("Error fetching payments:", err));
  }, []);

  const updateStatus = (id, status) => {
    axios.put(`http://localhost:3000/payments/${id}`, { status })
      .then(res => {
        setPayments(prev =>
          prev.map(p => (p._id === id ? res.data : p))
        );
      })
      .catch(err => console.error("Update failed:", err));
  };

  const deletePayment = id => {
    if (!window.confirm("Are you sure you want to delete this payment?")) return;
    axios.delete(`http://localhost:3000/payments/${id}`)
      .then(() => setPayments(prev => prev.filter(p => p._id !== id)))
      .catch(err => console.error("Delete failed:", err));
  };

  return (
    <div className="admin-payments">
      <h2>🧾 All Payments</h2>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>Items</th><th>Total</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment._id}>
                <td>{payment.name}</td>
                <td>{payment.email}</td>
                <td>{payment.phone}</td>
                <td>
                  <ul>
                    {payment.cartItems.map((item, i) => (
                      <li key={i}>{item.name} x {item.quantity}</li>
                    ))}
                  </ul>
                </td>
                <td>${payment.totalAmount.toFixed(2)}</td>
                <td>
                  <select
                    value={payment.status}
                    onChange={e => updateStatus(payment._id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>Paid</option>
                    <option>Failed</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => deletePayment(payment._id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPayments;
