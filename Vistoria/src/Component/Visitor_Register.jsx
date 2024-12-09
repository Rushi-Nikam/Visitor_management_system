import React, { useState } from "react";

function VisitorRegister() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    dob: "",
    primaryPhone: "",
    aadhar: "",
    secondaryPhone: "",
    pancard: "",
    email: "",
    whomToMeet: "",
    date: "",
    purposeOfMeet: "",
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

    // Create a new FormData object and append the form data and photo
    const visitorData = new FormData();
    Object.keys(formData).forEach((key) => {
      visitorData.append(key, formData[key]);
    });
    visitorData.append("photo", photo);

    // Send the form data to the backend
    fetch("http://localhost:5000/add-visitor", {
      method: "POST",
      body: visitorData,
    })
      .then((response) => response.json()) // Expecting JSON response
      .then((data) => {
        console.log(data);
        alert("Form submitted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error submitting the form.");
      });

    // Reset the form after submission
    setFormData({
      name: "",
      address: "",
      dob: "",
      primaryPhone: "",
      aadhar: "",
      secondaryPhone: "",
      pancard: "",
      email: "",
      whomToMeet: "",
      date: "",
      purposeOfMeet: "",
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
            Primary Phone:
            <input
              type="tel"
              name="primaryPhone"
              value={formData.primaryPhone}
              onChange={handleChange}
              placeholder="Enter your primary phone"
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Aadhar Number:
            <input
              type="text"
              name="aadhar"
              value={formData.aadhar}
              onChange={handleChange}
              placeholder="Enter your Aadhar number"
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Secondary Phone:
            <input
              type="tel"
              name="secondaryPhone"
              value={formData.secondaryPhone}
              onChange={handleChange}
              placeholder="Enter your secondary phone"
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            PAN Card Number:
            <input
              type="text"
              name="pancard"
              value={formData.pancard}
              onChange={handleChange}
              placeholder="Enter your PAN card number"
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
            Whom to Meet:
            <input
              type="text"
              name="whomToMeet"
              value={formData.whomToMeet}
              onChange={handleChange}
              placeholder="Enter the name of the person to meet"
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Meeting Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Purpose of Meeting:
            <input
              type="text"
              name="purposeOfMeet"
              value={formData.purposeOfMeet}
              onChange={handleChange}
              placeholder="Enter the purpose of the meeting"
              required
              style={{ marginLeft: "10px" }}
            />
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

export default VisitorRegister;
