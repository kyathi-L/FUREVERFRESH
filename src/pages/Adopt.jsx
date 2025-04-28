import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdoptPet.css";

const Adopt = () => {
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/pets");
      setPets(response.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
      alert("⚠️ Failed to load pet data.");
    }
  };

  const handleAdopt = async (pet) => {
    if (!userName.trim() || !phone.trim()) {
      return alert("Please enter your name and phone number before adopting.");
    }

    const confirmAdopt = window.confirm(
      `Are you sure you want to adopt ${pet.name}?`
    );
    if (!confirmAdopt) return;

    try {
      const response = await axios.post("http://localhost:3000/api/adopt", {
        userName,
        phone,
        ...pet,
      });

      if (response.data.success) {
        alert("🎉 Adoption successful!");
        fetchPets(); // Refresh pet list
      } else {
        alert("❌ Adoption failed: " + response.data.message);
      }
    } catch (err) {
      console.error("Adoption Error:", err);
      alert("⚠️ Error while adopting.");
    }
  };

  return (
    <div className="adopt-pet-container">
      <h2>🐾 Pets Available for Adoption</h2>

      <div className="user-details">
        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="pet-cards">
        {pets.length > 0 ? (
          pets.map((pet, index) => (
            <div key={index} className="pet-card">
              <img src={pet.image} alt={pet.name} />
              <h3>{pet.name}</h3>
              <p><strong>Age:</strong> {pet.age}</p>
              <p><strong>Breed:</strong> {pet.breed}</p>
              <p><strong>Weight:</strong> {pet.weight}</p>
              <p><strong>Color:</strong> {pet.color}</p>
              <p><strong>Species:</strong> {pet.species}</p>
              <button
                className="adopt-btn"
                onClick={() => handleAdopt(pet)}
                disabled={!pet.available}
              >
                {pet.available ? "Adopt" : "❌ Not Available"}
              </button>
            </div>
          ))
        ) : (
          <p>Loading pets...</p>
        )}
      </div>
    </div>
  );
};

export default Adopt;
