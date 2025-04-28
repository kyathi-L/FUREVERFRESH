import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/Supplier.css';

const SupplierProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    img: '',
    quantity: '',
    cost: '',
    supplier: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/supplier/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch list of suppliers
  const fetchSuppliers = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/suppliers');
      setSuppliers(res.data);
    } catch (err) {
      console.error('Error fetching suppliers:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate quantity and cost
    if (isNaN(form.quantity) || isNaN(form.cost)) {
      return setError('Quantity and Cost must be valid numbers.');
    }

    try {
      if (editingId) {
        await axios.put(`/api/supplier/products/${editingId}`, form);
      } else {
        await axios.post('/api/supplier/products', form);
      }

      // Reset form after submission
      setForm({ name: '', img: '', quantity: '', cost: '', supplier: '' });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      setError('Something went wrong while saving.');
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      img: product.img,
      quantity: product.quantity,
      cost: product.cost,
      supplier: product.supplier || ''
    });
    setEditingId(product._id);
    setError('');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/supplier/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
      setError('Error deleting product.');
    }
  };

  const handleCancelEdit = () => {
    setForm({ name: '', img: '', quantity: '', cost: '', supplier: '' });
    setEditingId(null);
    setError('');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editingId ? 'Edit Product' : 'Add New Product'}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Image URL</label>
            <input
              type="text"
              name="img"
              value={form.img}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Quantity</label>
            <input
              type="text"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Cost (₹)</label>
            <input
              type="number"
              name="cost"
              value={form.cost}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          {suppliers.length > 0 && (
            <div className="md:col-span-2">
              <label className="block mb-1">Supplier (optional)</label>
              <select
                name="supplier"
                value={form.supplier}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select a supplier</option>
                {suppliers.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Submit Button */}
        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
          >
            {editingId ? 'Update' : 'Add'} Product
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-gray-600 hover:underline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Product Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <table className="min-w-full bg-white rounded shadow text-center">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Cost</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">
                    {product.img ? (
                      <img
                        src={product.img}
                        alt="Product"
                        className="h-12 w-12 object-cover mx-auto rounded"
                      />
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">{product.quantity}</td>
                  <td className="py-2 px-4 border-b">₹{product.cost}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="text-yellow-600 hover:underline mr-2"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-4 text-gray-500">
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SupplierProducts;
