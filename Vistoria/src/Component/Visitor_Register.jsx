import React, { useState } from "react";

function Visitor_Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
    setFormData({ name: "", email: "", phone: "", personToMeet: "" });
    setPhoto(null);
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Visitor Form</h2>
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
              type="tel" // use 'tel' instead of 'phone' for phone inputs
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div className="ml-[10px]">
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
        <div className="flex justify-center my-10">
          <button
            className="border-2 border-solid border-black px-10 py-2 bg-red-500 text-white rounded-xl"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Visitor_Register;
