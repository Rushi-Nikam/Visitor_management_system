import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import { PDFDownloadLink } from '@react-pdf/renderer';
import VisitorPDF from "../Component/VisitorPDF";
const Operator_dash = () => {
  // const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setotp] = useState("");
  const [visitor, setVisitor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [updatedVisitor, setUpdatedVisitor] = useState({}); // Store updated visitor data
  const [successMessage, setSuccessMessage] = useState(null); // State for success message
  const [photo, setPhoto] = useState(null); // Store photo file
  const [showPreview, setShowPreview] = useState(false); // State for showing preview
  const webcamRef = useRef(null);

  // Fetch visitor by mobile number
  const fetchVisitorByMobileNumber = async () => {
    setLoading(true);
    setError(null);
    setVisitor(null);
    setSuccessMessage(null); // Reset success message when new search is made
    try {
      const response = await fetch(
        `http://localhost:3000/api/visit/visitor/otp/${otp}`
      );
      if (!response.ok) {
        throw new Error(`Visitor not found. HTTP status: ${response.status}`);
      }
      const data = await response.json();
      setVisitor(data);
      setUpdatedVisitor(data); // Initialize the updatedVisitor with fetched data
    } catch (error) {
      console.error("Error fetching visitor:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "photo.png", { type: "image/png" });
          setPhoto(file); // Save the file object, not base64 string
        });
    }
  };

  // Handle field changes in the edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVisitor((prevVisitor) => ({
      ...prevVisitor,
      [name]: value,
    }));
  };

  // Handle save updated visitor details
  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null); // Reset success message before saving

    try {
      const formData = new FormData();
      formData.append("name", updatedVisitor.name);
      formData.append("mobile_number", updatedVisitor.mobile_number);
      formData.append("purpose_of_meet", updatedVisitor.purpose_of_meet);
      formData.append("status", updatedVisitor.status);
      formData.append("visited", updatedVisitor.visited);
      if (photo) {
        formData.append("photo", photo); // Add photo file to the form data
      }

      const response = await fetch(
        `http://localhost:3000/api/visit/visitor/otp/${otp}`,
        {
          method: "PUT",
          body: formData, // Send FormData with photo
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update visitor details");
      }

      const data = await response.json();
      setVisitor(data); // Update the visitor state with the new data
      setIsEditing(false); // Switch back to view mode after saving
      console.log(data);
      setSuccessMessage("Visitor updated successfully!");

      setTimeout(() => {
        setSuccessMessage(null);
      }, 1000);
    } catch (error) {
      console.error("Error saving visitor:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Visitor Details</h1>
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Enter OTP Number"
            value={otp}
            onChange={(e) => setotp(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchVisitorByMobileNumber}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>
      </div>
      {loading && (
        <p className="text-center text-blue-600">Loading visitor...</p>
      )}
      {error && <p className="text-center text-red-600">Error: {error}</p>}
      {successMessage && (
        <p className="text-center text-green-600">{successMessage}</p>
      )}
      {visitor && !isEditing && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Photo</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Mobile Number</th>
                <th className="border border-gray-300 px-4 py-2">Purpose</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Visited</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
                <th className="border border-gray-300 px-4 py-2">Preview</th> {/* Added Preview column */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">{visitor.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {visitor.photo ? (
                    <img
                      src={`http://localhost:3000${visitor.photo}`} // Use correct path to photo
                      alt={`${visitor.name}'s photo`}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  ) : (
                    <span>No photo available</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">{visitor.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {visitor.mobile_number}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {visitor.purpose_of_meet}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {visitor.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {visitor.visited}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  >
                    Preview
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {isEditing && visitor && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Edit Visitor Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Photo
              </label>
              <div className="my-4">
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
              {photo && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700">Captured Photo</h3>
                  <img
                    src={URL.createObjectURL(photo)} // Display the captured photo
                    alt="Captured"
                    className="mt-2 w-40 h-40 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={updatedVisitor.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobile_number"
                value={updatedVisitor.mobile_number}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Purpose of Meet
              </label>
              <input
                type="text"
                name="purpose_of_meet"
                value={updatedVisitor.purpose_of_meet}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <input
                type="text"
                name="status"
                value={updatedVisitor.status}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Visited</label>
              <input
                type="text"
                name="visited"
                value={updatedVisitor.visited}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showPreview && visitor && (
        <div className="mt-6 bg-gray-100 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Visitor Preview</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <p>{visitor.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Photo:</label>
            {visitor.photo ? (
              <img
                src={`http://localhost:3000${visitor.photo}`}
                alt={`${visitor.name}'s photo`}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ) : (
              <span>No photo available</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender:</label>
            <p>{visitor.gender}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">DOB:</label>
            <p>{visitor.DOB}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Visitor Date:</label>
            <p>{visitor.visiting_date}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Whom to Meet:</label>
            <p>{visitor.whom_to_meet}</p>
          </div>
          <PDFDownloadLink
            document={<VisitorPDF visitor={visitor} />}
            fileName={`${visitor.name}_details.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <button
                  className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  disabled
                >
                  Generating PDF...
                </button>
              ) : (
                <button
                  className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Download PDF
                </button>
              )
            }
          </PDFDownloadLink>
          <button
            onClick={() => setShowPreview(false)}
            className="mt-4 px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            Close Preview
          </button>
        </div>
      )}
    </div>
  );
};

export default Operator_dash;
