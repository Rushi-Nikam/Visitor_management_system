import React, { useState, useEffect } from 'react';

const Forms = ({ formType, submitUrl, initialData, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    roleid: '',
    role_name: '', 
    created_by: '',
    organization:'',
  });

  const userFields = [
    { label: 'Name', name: 'name', type: 'text', required: true },
    { label: 'Email', name: 'email', type: 'email', required: true },
    { label: 'Password', name: 'password', type: 'password', required: !initialData }, 
    { label: 'Phone', name: 'phone', type: 'tel', required: true },
    { label: 'Role ID', name: 'roleid', type: 'text', required: true },
    { label: 'Role Name', name: 'role_name', type: 'text', required: true }, 
    { label: 'Created By', name: 'created_by', type: 'text', required: false },
    { label: 'Organization', name: 'organization', type: 'text', required: false },
  ];

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

   
    for (let key in formData) {
      if (!formData[key] && (key !== 'password' || (formData[key] && !initialData))) {
        alert(`Please fill in the ${key} field.`);
        return;
      }
    }

    try {
      const response = await fetch(submitUrl, {
        method: initialData ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(`${formType && 'User'} ${initialData ? 'updated' : 'created'} successfully!`);
        setFormData({});
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
    <div className="max-w-[150vh] ">
      <h2 className=" flex text-3xl mx-10   font-semibold mb-2">
        {formType  && (initialData ? 'Update Profile' : 'Create New Profile')} 
      </h2>
      
      <hr className='border-[3px]  my-4 mx-[45px]   border-gray-600' />
      
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-10"
      >
        {userFields.map((field) => (
          <div key={field.name} className="mb-6 flex flex-col  font-bold lg:mr-4">
            <label
              htmlFor={field.name}
              className="block text-sm text-left ml-2 font-medium text-gray-700 mb-2"
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
            className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          </div>
        ))}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Forms;
