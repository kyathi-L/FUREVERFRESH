import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "../admin/style/Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedData, setEditedData] = useState({ name: "", email: "", phone: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/all");
      setUsers(res.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/admin/delete-user/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditedData({ name: user.name, email: user.email, phone: user.phone });
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditedData({ name: "", email: "", phone: "" });
  };

  const handleSave = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3000/admin/users/${id}`, editedData);
      const updatedUser = res.data.updatedUser;
      setUsers(users.map(user => user._id === id ? updatedUser : user));
      handleCancelEdit();
    } catch (err) {
      console.error("Update error", err);
    }
  };

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page">
      <Sidebar />
      <div className="users-wrapper">
        <div className="users-container">
          <h2 className="users-title">Registered Users</h2>

          <div className="top-bar">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            <span className="user-count">Total: {filteredUsers.length}</span>
          </div>

          <div className="table-scroll">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>
                        {editingUserId === user._id ? (
                          <input name="name" value={editedData.name} onChange={handleChange} />
                        ) : (
                          user.name
                        )}
                      </td>
                      <td>
                        {editingUserId === user._id ? (
                          <input name="email" value={editedData.email} onChange={handleChange} />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td>
                        {editingUserId === user._id ? (
                          <input name="phone" value={editedData.phone} onChange={handleChange} />
                        ) : (
                          user.phone
                        )}
                      </td>
                      <td>
                        {editingUserId === user._id ? (
                          <>
                            <button className="save-btn" onClick={() => handleSave(user._id)}>Save</button>
                            <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
                          </>
                        ) : (
                          <>
                            <button className="edit-btn" onClick={() => handleEditClick(user)}>Edit</button>
                            <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
