// pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = ({ cartItems, marketplaceData, onCheckout }) => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalAmount = Object.entries(cartItems).reduce((acc, [name, qty]) => {
      const product = marketplaceData.find((item) => item.name === name);
      return acc + qty * parseFloat(product.cost.replace("$", ""));
    }, 0);
    setTotal(totalAmount.toFixed(2));
  }, [cartItems, marketplaceData]);

  return (
    <div className="cart-page">
      <h2>🛒 Your Cart</h2>
      {Object.entries(cartItems).length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {Object.entries(cartItems).map(([name, qty]) => {
            const item = marketplaceData.find((p) => p.name === name);
            return (
              <li key={name}>
                {name} - Qty: {qty} - Subtotal: $
                {(qty * parseFloat(item.cost.replace("$", ""))).toFixed(2)}
              </li>
            );
          })}
        </ul>
      )}
      <h3>Total: ${total}</h3>
      <button disabled={total === "0.00"} onClick={onCheckout}>
        Proceed to Checkout
      </button>
      <button onClick={() => navigate("/marketplace")}>Back to Marketplace</button>
    </div>
  );
};

export default CartPage;
