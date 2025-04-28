import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";
import { Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../styles/Services.css";

const Marketplace = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Failed to fetch products:", err));
  }, []);

  const updateQuantity = (product, qty) => {
    if (qty < 0) return;
    setCartItems((prev) => {
      const updated = { ...prev };
      if (qty === 0) {
        delete updated[product.name];
      } else {
        updated[product.name] = qty;
      }
      return updated;
    });
  };

  const getTotal = () => {
    return Object.entries(cartItems)
      .reduce((total, [name, qty]) => {
        const product = products.find((p) => p.name === name);
        let cost = product?.cost || 0;
        if (typeof cost === "string") cost = parseFloat(cost.replace("$", ""));
        return total + qty * (cost || 0);
      }, 0)
      .toFixed(2);
  };

  const handleCheckout = async () => {
    if (!user?.name || !user?.phone || !user?.email) {
      alert("Please log in or complete your profile to continue.");
      return;
    }

    if (Object.keys(cartItems).length === 0) {
      alert("Your cart is empty. Add items before checkout.");
      return;
    }

    const cartPayload = Object.entries(cartItems).map(([name, qty]) => {
      const product = products.find((p) => p.name === name);
      return {
        name: product.name,
        quantity: qty,
        cost: parseFloat((product.cost || "0").toString().replace("$", "")),
      };
    });

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/checkout", {
        name: user.name,
        email: user.email,
        phone: user.phone,
        cartItems: cartPayload,
      });

      const paymentId = res.data.paymentId;

      navigate("/payments", {
        state: {
          paymentId,
          paymentData: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            cartItems: cartPayload,
            totalAmount: parseFloat(getTotal()),
          },
        },
      });
    } catch (err) {
      console.error("❌ Checkout error:", err.response?.data || err.message);
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="marketplace-section">
      <h2>🛍️ Our Marketplace</h2>

      <div className="marketplace-cart-icon">
        <Badge badgeContent={Object.keys(cartItems).length} color="success">
          <ShoppingCartIcon sx={{ fontSize: 30 }} />
        </Badge>
      </div>

      <div className="marketplace-container">
        {products.map((product) => (
          <motion.div
            key={product._id}
            className="marketplace-card"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={product.img || "https://dummyimage.com/150x150/ccc/000&text=No+Image"}
              alt={product.name}
            />
            <div className="marketplace-overlay">
              <h3>{product.name}</h3>
              <p>Package: {product.quantity}</p>
              <p>Price: ₹{product.cost}</p>

              <div className="quantity-controls">
                <button onClick={() => updateQuantity(product, (cartItems[product.name] || 0) - 1)}>-</button>
                <span>{cartItems[product.name] || 0}</span>
                <button onClick={() => updateQuantity(product, (cartItems[product.name] || 0) + 1)}>+</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {Object.keys(cartItems).length > 0 && (
        <div className="cart-actions">
          <button onClick={() => setShowCartModal(true)}>View Cart</button>
          <button onClick={() => setCartItems({})}>Clear Cart</button>
        </div>
      )}

      <div className="checkout-summary">
        <h3>Total Amount: ₹{getTotal()}</h3>
        {getTotal() > 0 && (
          <button onClick={handleCheckout} disabled={loading}>
            {loading ? "Processing..." : "Proceed to Checkout"}
          </button>
        )}
      </div>

      {showCartModal && (
        <div className="modal-overlay">
          <div className="cart-modal">
            <button className="close-modal" onClick={() => setShowCartModal(false)}>&times;</button>
            <h2>🛒 Cart Details</h2>
            <ul>
              {Object.entries(cartItems).map(([name, qty]) => {
                const item = products.find((p) => p.name === name);
                const cost = parseFloat((item?.cost || "0").toString().replace("$", ""));
                return (
                  <li key={name}>
                    {name} - Qty: {qty} - Subtotal: ₹{(qty * cost).toFixed(2)}
                  </li>
                );
              })}
            </ul>
            <h3>Total: ₹{getTotal()}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
