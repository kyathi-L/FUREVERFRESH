import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ViewCart.css";

const ViewCart = () => {
  const { email } = useParams();
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/cart/${email}`);
        setCartData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setLoading(false);
      }
    };

    fetchCart();
  }, [email]);

  const calculateTotal = () => {
    return cartData.cartItems.reduce((acc, item) => acc + item.cost * item.quantity, 0);
  };

  if (loading) return <p>Loading your cart...</p>;
  if (!cartData) return <p>No cart found for this user.</p>;

  return (
    <div className="view-cart-container">
      <h2>Your Cart</h2>
      <div className="user-info">
        <p><strong>Name:</strong> {cartData.user.name}</p>
        <p><strong>Phone:</strong> {cartData.user.phone}</p>
        <p><strong>Email:</strong> {cartData.user.email}</p>
      </div>

      <div className="cart-items">
        {cartData.cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <p><strong>Product:</strong> {item.name}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Cost:</strong> ${item.cost} x {item.quantity} = ${item.cost * item.quantity}</p>
          </div>
        ))}
      </div>

      <h3>Total: ${calculateTotal()}</h3>
      <button className="checkout-btn">Checkout</button>
    </div>
  );
};

export default ViewCart;
