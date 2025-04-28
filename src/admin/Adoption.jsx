// src/admin/Adoption.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../admin/style/Adoption.css";
import { CSVLink } from "react-csv";

const Adoption = () => {
  const [view, setView] = useState("pets");
  const [pets, setPets] = useState([]);
  const [adoptedPets, setAdoptedPets] = useState([]);

  useEffect(() => {
    if (view === "pets") {
      axios.get("http://localhost:3000/api/pets")
        .then((res) => setPets(res.data))
        .catch((err) => console.error("Failed to fetch pets:", err));
    } else {
      axios.get("http://localhost:3000/api/adoptedPets")
        .then((res) => setAdoptedPets(res.data))
        .catch((err) => console.error("Failed to fetch adopted pets:", err));
    }
  }, [view]);

  const handleUndoAdoption = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3000/adopt/undo/${id}`);
      if (res.data.success) {
        alert("Adoption undone successfully!");
        fetchPets(); // refresh both lists
        fetchAdoptedPets();
      } else {
        alert(res.data.message || "Failed to undo adoption");
      }
    } catch (error) {
      console.error("Undo error:", error);
      alert("Server error");
    }
  };
  

  return (
    <div className="adoption-container">
      <h2>Adoption Section</h2>
      <div className="view-buttons">
        <button onClick={() => setView("pets")}>All Pets</button>
        <button onClick={() => setView("adopted")}>Adopted Pets</button>
      </div>

      {view === "pets" && (
        <div className="pets-list">
          <h3>All Pets</h3>
          <div className="grid">
            {pets.map((pet) => (
              <div key={pet._id} className="card">
                <img src={pet.image} alt={pet.name} />
                <h4>{pet.name}</h4>
                <p><strong>Species:</strong> {pet.species}</p>
                <p><strong>Breed:</strong> {pet.breed}</p>
                <p><strong>Age:</strong> {pet.age}</p>
                <p><strong>Weight:</strong> {pet.weight}</p>
                <p><strong>Color:</strong> {pet.color}</p>
                <p className={pet.available ? "status-available" : "status-adopted"}>
                  {pet.available ? "Available for Adoption" : "Already Adopted"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "adopted" && (
        <div className="adopted-list">
          <h3>Adopted Pets</h3>
          <CSVLink
            data={adoptedPets} filename="adopted_pets.csv" className="export-button"> Export to CSV </CSVLink>
          <table>
            <thead>
              <tr>
                <th>Pet Name</th>
                <th>Species</th>
                <th>Breed</th>
                <th>Age</th>
                <th>Color</th>
                <th>Weight</th>
                <th>Adopted By</th>
                <th>Phone</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {adoptedPets.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.species}</td>
                  <td>{item.breed}</td>
                  <td>{item.age}</td>
                  <td>{item.color}</td>
                  <td>{item.weight}</td>
                  <td>{item.userName}</td>
                  <td>{item.phone}</td>
                  <td>{new Date(item.adoptedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            
            
            <td>
            <button onClick={() => handleUndoAdoption(item._id)}>Undo</button></td>
          </table>
        </div>
      )}
    </div>
  );
};

export default Adoption;
