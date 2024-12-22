import React, { useState, useEffect } from 'react';

const Forms = ({ formType, submitUrl, initialData, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    roleid: '',
    created_by: '',
  });

  const userFields = [
    { label: 'Name', name: 'name', type: 'text', required: true },
    { label: 'Email', name: 'email', type: 'email', required: true },
    { label: 'Password', name: 'password', type: 'password', required: !initialData }, // Only required if creating a user
    { label: 'Phone', name: 'phone', type: 'tel', required: true },
    { label: 'Role', name: 'roleid', type: 'text', required: true },
    { label: 'Created By', name: 'created_by', type: 'text', required: false },
  ];

  const visitorFields = [
    { label: 'Name', name: 'name', type: 'text', required: true },
    { label: 'Email', name: 'email', type: 'email', required: true },
    { label: 'Phone', name: 'phone', type: 'tel', required: true },
    { label: 'Purpose', name: 'purpose', type: 'text', required: true },
    { label: 'Visit Date', name: 'visit_date', type: 'date', required: true },
  ];

  const fields = formType === 'user' ? userFields : visitorFields;

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
      if (!formData[key] && (key !== 'password' || (formData[key] && !initialData))) {
        alert(`Please fill in the ${key} field.`);
        return;
      }
    }

    try {
      const response = await fetch(submitUrl, {
        method: initialData ? 'PUT' : 'POST', // Use PUT for update, POST for create
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(`${formType === 'user' ? 'User' : 'Visitor'} ${initialData ? 'updated' : 'created'} successfully!`);
        setFormData({}); // Reset the form
        onSuccess(); // Notify parent of successful operation
      } else {
        alert(data.message || 'Error occurred while creating/updating user/visitor.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error creating/updating the user/visitor.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {formType === 'user' ? (initialData ? 'Update User' : 'Create User') : (initialData ? 'Update Visitor' : 'Register Visitor')}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 shadow-lg rounded-lg border border-gray-200"
      >
        {fields.map((field) => (
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
              value={formData[field.name] || ''}
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

export default Forms;
