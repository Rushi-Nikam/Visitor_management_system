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
    adminid: localStorage.getItem('userId') || "" // Fetch userId from localStorage
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
    { label: "Visiting Date", name: "visiting_date", type: "date", required: true }
  ];

  // Set initial data for form fields
  useEffect(() => {
    if (initialData) {
      setFormData(prevData => ({
        ...prevData,
        ...initialData,
        adminid: initialData.adminid || localStorage.getItem('userId') || "" // Ensure adminid remains the same when updating
      }));
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
      if (!formData[key] && ((formData[key] && !initialData))) {
        alert(`Please fill in the ${key} field.`);
        return;
      }
    }

    try {
      const response = await fetch(submitUrl, {
        method: initialData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      const data = await response.json();

      if (data) {
        alert(`Visitor ${initialData ? "updated" : "created"} successfully`);
        setFormData({
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
          adminid: localStorage.getItem('userId') || "" // Reset adminid to logged-in user
        });
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
    <div className="max-w-[150vh] flex flex-col my-10">
      <h2 className="flex text-3xl mx-10   font-semibold mb-2">
        {`${initialData ? "Update Visitor" : "Register Visitor"}`}
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
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              className="w-full p-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          </div>
        ))}
        
        {/* Hidden input field for adminid */}
        <input type="hidden" name="adminid" value={formData.adminid} />

        <div className="col-span-1 md:col-span-3 flex justify-end mr-8">
          <button
            type="submit"
            className="w-48 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisitorForm;
