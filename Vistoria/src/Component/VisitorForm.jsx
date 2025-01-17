import React, { useState, useEffect } from 'react';

const VisitorForm = ({ submitUrl, initialData, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    gender: "",
    date_of_birth: "",
    mobile_number: "",
    pancard: "",
    aadhar_card_number: "",
    whom_to_meet: "",
    purpose_of_meet: "",
    visiting_date: "",
  });

  const userFields = [
    { label: "Name", name: "name", type: "text", required: true },
    { label: "Address", name: "address", type: "text", required: true },
    { label: "Gender", name: "gender", type: "text", required: true },
    { label: "Date of Birth", name: "date_of_birth", type: "date", required: true },
    { label: "Mobile Number", name: "mobile_number", type: "text", required: true },
    { label: "Pancard", name: "pancard", type: "text", required: true },
    { label: "Aadhar Card", name: "aadhar_card_number", type: "text", required: false },
    { label: "Whom to Meet", name: "whom_to_meet", type: "text", required: true },
    { label: "Purpose of Meet", name: "purpose_of_meet", type: "text", required: true },
    { label: "Visiting Date", name: "visiting_date", type: "date", required: true },
  ];

  // Set initial data for form fields
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    for (let key in formData) {
      if (!formData[key] && ((formData[key] && !initialData))) {
        alert(`Please fill in the ${key} field.`);
        return;
      }
    }

    try {
      const response = await fetch(submitUrl, {
        method: initialData ? "PUT" : "POST", // Use PUT for update, POST for create
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }), // Include the generated OTP in the request body
      });

      const data = await response.json();

      if (data) {
        alert(`Visitor ${initialData ? "updated" : "created"} successfully`);
        setFormData({});
        onSuccess();
      } else {
        alert("Error occurred while creating/updating user/visitor.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error creating/updating the user/visitor.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {`${initialData ? "Update Visitor" : "Register Visitor"}`}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 shadow-lg rounded-lg border border-gray-200"
      >
        {userFields.map((field) => (
          <div key={field.name} className="mb-6">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          </div>
        ))}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisitorForm;
