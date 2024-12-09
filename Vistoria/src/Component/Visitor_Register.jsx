import React, { useState } from "react";

function Visitor_Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    purposeOfMeet: "",
    personToMeet: "",
  });
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!photo) {
      alert("Please upload a photo before submitting the form.");
      return;
    }
    if (!formData.personToMeet) {
      alert("Please select the person you want to meet.");
      return;
    }

    console.log("Form Submitted:", formData);
    console.log("Photo Uploaded:", photo);
    alert("Form and photo submitted successfully!");

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      dob: "",
      address: "",
      purposeOfMeet: "",
      personToMeet: "",
    });
    setPhoto(null);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Visitor Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Address:
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
              style={{ marginLeft: "10px", width: "100%", height: "60px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Purpose of Visit:
            <input
              type="text"
              name="purposeOfMeet"
              value={formData.purposeOfMeet}
              onChange={handleChange}
              placeholder="Enter the purpose of visit"
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Select Person to Meet:
            <select
              name="personToMeet"
              value={formData.personToMeet}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px" }}
            >
              <option value="" disabled>
                Choose a person
              </option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Mike Johnson">Mike Johnson</option>
            </select>
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Upload Photo:
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        {photo && (
          <div style={{ marginBottom: "10px" }}>
            <p>Photo selected: {photo.name}</p>
            <img
              src={URL.createObjectURL(photo)}
              alt="Preview"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Visitor_Register;
