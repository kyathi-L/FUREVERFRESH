import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductManagement.css";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", img: "", quantity: "", cost: "",availableQuantity: "" });
  const [editId, setEditId] = useState(null);
  const [showFormFor, setShowFormFor] = useState(null);

  const fetchProducts = async () => {
    const supplier = JSON.parse(localStorage.getItem("supplier"));
    if (!supplier?._id) return;
  
    try {
      const res = await axios.get(`/api/supplier/products?supplierId=${supplier._id}`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return form.name && form.img && form.quantity && form.cost;
  };

  const handleAdd = async () => {
    if (!isFormValid()) {
      alert("Please fill in all fields!");
      return;
    }
  
    const supplier = JSON.parse(localStorage.getItem("supplier"));
  
    try {
      const payload = {
        ...form,
        supplierId: supplier._id,
        quantity: parseInt(form.quantity),
        availableQuantity: parseInt(form.availableQuantity),
        cost: parseFloat(form.cost),
      };
      await axios.post("/api/supplier/products", payload);
      setForm({ name: "", img: "", quantity: "", cost: "",availableQuantity: ""  });
      setShowFormFor(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };
  

  const handleUpdate = async () => {
    if (!isFormValid()) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const payload = {
        ...form,
        quantity: parseInt(form.quantity),
        availableQuantity: parseInt(form.availableQuantity),
        cost: parseFloat(form.cost),
      };
      await axios.put(`/api/supplier/products/${editId}`, payload);
      setForm({ name: "", img: "", quantity: "", cost: "" ,availableQuantity: ""});
      setEditId(null);
      setShowFormFor(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name || "",
      img: product.img || "",
      quantity: product.quantity || "",
      cost: product.cost || "",
      availableQuantity: product.availableQuantity || "",
    });
    setEditId(product._id);
    setShowFormFor(product._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/supplier/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setForm({ name: "", img: "", quantity: "", cost: "",availableQuantity: ""  });
    setEditId(null);
    setShowFormFor(null);
  };

  return (
    <div className="product-management-container">
      <div className="header">
        <h2>📦 Product Management</h2>
        <button
          className="add-btn"
          onClick={() => {
            setForm({ name: "", img: "", quantity: "", cost: "",availableQuantity: "" });
            setEditId(null);
            setShowFormFor("new");
          }}
        >
          Add Product
        </button>
      </div>

      <div className="products-grid">
        {showFormFor === "new" && (
          <div className="product-card form">
            <h3>Add New Product</h3>
            <input name="name" placeholder="Name" value={form.name || ""} onChange={handleChange} />
            <input name="img" placeholder="Image URL" value={form.img || ""} onChange={handleChange} />
            <input name="quantity" placeholder="Quantity" value={form.quantity || ""} onChange={handleChange} />
            <input name="cost" type="number" placeholder="Cost" value={form.cost || ""} onChange={handleChange} />
            <input name="availableQuantity" placeholder="Available Quantity" value={form.availableQuantity || ""} onChange={handleChange} />
            <div className="form-actions">
              <button className="submit-btn" onClick={handleAdd}>Submit</button>
              <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        )}

        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.img} alt={product.name} />
            <h4>{product.name}</h4>
            <p>Quantity: {product.quantity}</p>
            <p>Available: {product.availableQuantity}</p>
            <p>Cost: ₹{product.cost}</p>
            <div className="actions">
              <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
            </div>

            {showFormFor === product._id && (
              <div className="product-form-inline">
                <input name="name" placeholder="Name" value={form.name || ""} onChange={handleChange} />
                <input name="img" placeholder="Image URL" value={form.img || ""} onChange={handleChange} />
                <input name="quantity" placeholder="Quantity" value={form.quantity || ""} onChange={handleChange} />
                <input name="availableQuantity" placeholder="Available Quantity" value={form.availableQuantity} onChange={handleChange} />
                <input name="cost" type="number" placeholder="Cost" value={form.cost || ""} onChange={handleChange} />
                <div className="form-actions">
                  <button className="submit-btn" onClick={handleUpdate}>Update</button>
                  <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
