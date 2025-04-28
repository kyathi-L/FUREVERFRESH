import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "../styles/MyOrders.css";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`/payments/user/${user._id}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="orders-page">
      <h2>🛒 My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <h4>Order ID: {order._id}</h4>
              {order.cartItems.map((item, idx) => (
                <div key={idx}>
                  <p>{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Cost: ₹{item.cost * item.quantity}</p>
                </div>
              ))}
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
              <p>Status: {order.status}</p>
              <p>Ordered On: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
