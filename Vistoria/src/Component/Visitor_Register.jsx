import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { FaStarOfLife } from "react-icons/fa";


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
  const webcamRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "photo.png", { type: "image/png" });
        setPhoto(file);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!photo) {
      alert("Please upload a photo before submitting the form.");
      return;
    }

    const visitorData = new FormData();
    Object.keys(formData).forEach((key) => {
      visitorData.append(key, formData[key]);
    });
    visitorData.append("photo", photo);

    fetch("http://localhost:5000/add-visitor", {
      method: "POST",
      body: visitorData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Form submitted successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error submitting the form.");
      });

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
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Visitor Registration Form
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
         <div className="flex "> {!formData.name ?<FaStarOfLife className="text-red-400 text-[10px] flex items-center text-center"/>:''} <label className="block text-sm font-medium text-gray-700">Name</label></div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
          <div className="flex "> {!formData.address ?<FaStarOfLife className="text-red-400 text-[10px] flex items-center text-center"/>:''} <label className="block text-sm font-medium text-gray-700">Address</label></div>
         
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
          <div className="flex "> {!formData.dob ?<FaStarOfLife className="text-red-400 text-[10px] flex items-center text-center"/>:''} <label className="block text-sm font-medium text-gray-700">Date of Birth</label></div>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
          <div className="flex"> {!formData.primaryPhone ?<FaStarOfLife className="text-red-400 text-[10px] flex items-center text-center"/>:''} <label className="block text-sm font-medium text-gray-700">Primary Number</label></div>
            <input
              type="tel"
              name="primaryPhone"
              value={formData.primaryPhone}
              onChange={handleChange}
              placeholder="Enter your primary phone"
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
          <div className="flex"> {!formData.aadhar ?<FaStarOfLife className="text-red-400 text-[10px] flex items-center text-center"/>:''} <label className="block text-sm font-medium text-gray-700">Aadhar Number</label></div>
            <input
              type="text"
              name="aadhar"
              value={formData.aadhar}
              onChange={handleChange}
              placeholder="Enter your Aadhar number"
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
          <div className="flex"> {!formData.secondaryPhone ?<FaStarOfLife className="text-red-400 text-[10px] flex items-center text-center"/>:''} <label className="block text-sm font-medium text-gray-700">Second mobile number</label></div>
            <input
              type="tel"
              name="secondaryPhone"
              value={formData.secondaryPhone}
              onChange={handleChange}
              placeholder="Enter your secondary phone"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
          <div className="flex"> {!formData.pancard ?<FaStarOfLife className="text-red-400 text-[10px] flex items-center text-center"/>:''} <label className="block text-sm font-medium text-gray-700">Pan Card Number</label></div>
            <input
              type="text"
              name="pancard"
              value={formData.pancard}
              onChange={handleChange}
              placeholder="Enter your PAN card number"
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
          <div className="flex"> {!formData.email ?<FaStarOfLife className="text-red-400 text-[10px] flex items-center text-center"/>:''} <label className="block text-sm font-medium text-gray-700">Email Id</label></div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
          <div className="flex"> {!formData.whomToMeet ?<FaStarOfLife className="text-red-400 text-[10px] flex items-center text-center"/>:''} <label className="block text-sm font-medium text-gray-700">whom To Meet</label></div>
            <input
              type="text"
              name="whomToMeet"
              value={formData.whomToMeet}
              onChange={handleChange}
              placeholder="Enter the name of the person to meet"
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
          <div className="flex"> {!formData.date ?<FaStarOfLife className="text-red-400 text-[10px] flex items-center text-center"/>:''} <label className="block text-sm font-medium text-gray-700">Meeting Date</label></div>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
        <div className="flex"> {!formData.purposeOfMeet ?<FaStarOfLife className="text-red-400 text-[10px] flex items-center text-center"/>:''} <label className="block text-sm font-medium text-gray-700">Purpose Of Meet</label></div>
          <input
            type="text"
            name="purposeOfMeet"
            value={formData.purposeOfMeet}
            onChange={handleChange}
            placeholder="Enter the purpose of the meeting"
            required
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
<div className="flex justify-evenly">


        <div className="my-4 ">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            width="300"
            height="200"
            videoConstraints={{ facingMode: "user" }}
          />
          <div className="mt-2">
            <button
              type="button"
              onClick={capturePhoto}
              className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Capture Photo
            </button>
          </div>
        </div>
<div className="flex">
  
{!photo ? <div className="flex m"><div className="flex mt-[10px] justify-center  items-center border-2 w-[300px] h-[230px]"><h1>capture photo here</h1></div></div>  :(
          <div>
            <p className="text-sm text-gray-600">Photo selected: {photo.name}</p>
            <img
              src={URL.createObjectURL(photo)}
              alt="Captured"
              className="max-w-xs rounded-md shadow-md"
            />
          </div>
        )}
</div>
</div>  

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-indigo-600 text-white p-3 px-8 rounded-md hover:bg-indigo-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default VisitorRegister;
