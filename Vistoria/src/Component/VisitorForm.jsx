import React, { useState } from 'react';

const VisitorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    gender: 'Male',
    date_of_birth: '',
    mobile_number: '',
    pancard: '',
    aadhar_card_number: '',
    whom_to_meet: '',
    purpose_of_meet: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send data to the backend
    fetch('http://localhost:3000/api/visit/visitors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Visitor created successfully!');
        // Optionally, reset the form after submission
        setFormData({
          name: '',
          address: '',
          gender: 'Male',
          date_of_birth: '',
          mobile_number: '',
          pancard: '',
          aadhar_card_number: '',
          whom_to_meet: '',
          purpose_of_meet: '',
        });
      })
      .catch((error) => {
        console.error('Error creating visitor:', error);
        alert('Error creating visitor!');
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
        Create Visitor
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="mb-4 col-span-1">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 col-span-1">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 col-span-1">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4 col-span-1">
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 col-span-1">
          <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            type="text"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 col-span-1">
          <label className="block text-sm font-medium text-gray-700">Pancard</label>
          <input
            type="text"
            name="pancard"
            value={formData.pancard}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 col-span-1">
          <label className="block text-sm font-medium text-gray-700">Aadhar Card Number</label>
          <input
            type="text"
            name="aadhar_card_number"
            value={formData.aadhar_card_number}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 col-span-1">
          <label className="block text-sm font-medium text-gray-700">Whom to Meet</label>
          <input
            type="text"
            name="whom_to_meet"
            value={formData.whom_to_meet}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6 col-span-1">
          <label className="block text-sm font-medium text-gray-700">Purpose of Meet</label>
          <input
            type="text"
            name="purpose_of_meet"
            value={formData.purpose_of_meet}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-3">
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Create Visitor
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisitorForm;
