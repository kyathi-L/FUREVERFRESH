import React, { useEffect, useState } from "react";
import axios from "axios";
import "../admin/style/Market.css";

const Market = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [view, setView] = useState("products");
  const [payments, setPayments] = useState([]);
  const [restockQty, setRestockQty] = useState({});

  const fetchProducts = () => {
    axios.get("http://localhost:3000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (view === "booked") {
      axios.get("http://localhost:3000/payments")
        .then(res => setPayments(res.data))
        .catch(err => console.error("Error fetching payments:", err));
    }
  }, [view]);

  const addToCart = (product) => {
    const existing = cartItems.find(item => item.name === product.name);
    if (existing) {
      setCartItems(cartItems.map(item =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleCheckout = async () => {
    const name = prompt("Enter your name:");
    const email = prompt("Enter your email:");
    const phone = prompt("Enter your phone:");

    if (!name || !email || !phone || cartItems.length === 0) {
      alert("Please complete all fields and add at least one item.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/checkout", {
        name,
        email,
        phone,
        cartItems
      });
      alert("Checkout successful!");
      setCartItems([]);
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Checkout failed.");
    }
  };

  const handleRestock = async (productId) => {
    const quantity = parseInt(restockQty[productId]);
    if (!quantity || quantity <= 0) {
      alert("Enter a valid quantity.");
      return;
    }

    try {
      await axios.patch(`http://localhost:3000/products/restock/${productId}`, {
        quantity
      });
      alert("Product restocked!");
      setRestockQty(prev => ({ ...prev, [productId]: "" }));
      fetchProducts(); // Refresh product list
    } catch (err) {
      console.error("Restock error:", err);
      alert("Failed to restock.");
    }
  };

  return (
    <div className="market-container">
      <h2>Marketplace</h2>
      <div className="market-nav">
        <button onClick={() => setView("products")}>View Products</button>
        <button onClick={() => setView("booked")}>Booked Products & Payments</button>
      </div>

      {view === "products" && (
        <div>
          <div className="product-grid">
            {products.map(product => (
              <div key={product._id} className="product-card">
                <img src={product.img} alt={product.name} />
                <h4>{product.name}</h4>
                <p>Price: ₹{product.cost}</p>
                <p>Qty Available: {product.quantity}</p>
              </div>
            ))}
          </div>

          {cartItems.length > 0 && (
            <div className="cart-summary">
              <h3>Cart Summary</h3>
              {cartItems.map(item => (
                <p key={item.name}>
                  {item.name} x {item.quantity} = ₹{item.quantity * item.cost}
                </p>
              ))}
              <p><strong>Total:</strong> ₹{cartItems.reduce((sum, item) => sum + item.quantity * item.cost, 0)}</p>
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          )}
        </div>
      )}

      {view === "booked" && (
        <div className="payments-section">
          <h3>Booked Payments</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment._id}>
                  <td>{payment.name}</td>
                  <td>{payment.email}</td>
                  <td>{payment.phone}</td>
                  <td>
                    {payment.cartItems.map(item => (
                      <div key={item.name}>
                        {item.name} x {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td>₹{payment.totalAmount}</td>
                  <td>{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Market;
