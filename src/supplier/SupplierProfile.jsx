import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SupplierProfile = () => {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const res = await fetch(`http://localhost:3000/supplier/${id}`);
        if (!res.ok) throw new Error("Failed to fetch supplier data");
        const data = await res.json();
        setSupplier(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSupplier();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("profileImage", image);

    try {
      const res = await fetch(`http://localhost:3000/api/supplier/${id}/upload-image`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      setSupplier(data);
      alert("Image updated!");
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    }
  };

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!supplier) return <p>Loading supplier data...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h2>Supplier Profile</h2>
      <p><strong>Name:</strong> {supplier.name}</p>
      <p><strong>Email:</strong> {supplier.email}</p>
      <p><strong>Company:</strong> {supplier.company}</p>
      <p><strong>Phone:</strong> {supplier.phone}</p>

      {supplier.profileImage && (
        <img
          src={`http://localhost:3000/uploads/${supplier.profileImage}`}
          alt="Profile"
          style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover", marginTop: "10px" }}
        />
      )}

      <div style={{ marginTop: "20px" }}>
        <input type="file" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" width="100" style={{ marginTop: "10px" }} />}
        <br />
        <button onClick={handleUpload} style={{ marginTop: "10px" }}>Upload Profile Image</button>
      </div>
    </div>
  );
};

export default SupplierProfile;
