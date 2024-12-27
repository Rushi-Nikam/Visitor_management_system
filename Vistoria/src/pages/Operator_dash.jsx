import React, { useState,useRef } from "react";
import Webcam from "react-webcam";
const Operator_dash = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [visitor, setVisitor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [updatedVisitor, setUpdatedVisitor] = useState({}); // Store updated visitor data
  const [successMessage, setSuccessMessage] = useState(null); // State for success message
const [photo ,setphoto]=useState(null);
 const webcamRef = useRef(null);
  // Fetch visitor by mobile number
  const fetchVisitorByMobileNumber = async () => {
    setLoading(true);
    setError(null);
    setVisitor(null);
    setSuccessMessage(null); // Reset success message when new search is made
    try {
      const response = await fetch(
        `http://localhost:3000/api/visit/visitor/${mobileNumber}`
      );
      if (!response.ok) {
        throw new Error(`Visitor not found. HTTP status: ${response.status}`);
      }
      const data = await response.json();
      if (data.photo && Array.isArray(data.photo)) {
        const byteArray = new Uint8Array(data.photo); // Create a Uint8Array from the byte array
        const blob = new Blob([byteArray], { type: 'image/png' }); // Create a Blob with PNG type
      
        // Convert Blob to Base64 string
        const base64Photo = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result); // Resolve Base64 string
          reader.readAsDataURL(blob); // Convert Blob to Base64
        });
      
        data.photo = base64Photo; // Replace the byte array with the Base64 string
      }
      
      setVisitor(data);
      console.log({data});
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
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "photo.png", { type: "image/png" });
        setphoto(file);
      });
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
      // Include the photo in the updated visitor details
      const visitorWithPhoto = {
        ...updatedVisitor,
        photo, // Ensure `photo` contains the Base64 string or file URL
      };
  
      const response = await fetch(
        `http://localhost:3000/api/visit/visitor/${mobileNumber}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(visitorWithPhoto),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update visitor details");
      }
  
      const data = await response.json();
      setVisitor(data); // Update the visitor state with the new data
      // console.log({ data });
      setIsEditing(false); // Switch back to view mode after saving
      setSuccessMessage("Visitor updated successfully!"); // Show success message
  
      // Clear the search box and reset states
      setMobileNumber("");
      setUpdatedVisitor({});
      setphoto(""); // Reset photo after saving
  
      // Show success alert and reset the success message after 3 seconds
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
            placeholder="Enter Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
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
      {/* Success message */}
      {visitor && !isEditing && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Photo</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">
                  Mobile Number
                </th>
                <th className="border border-gray-300 px-4 py-2">Purpose</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">visited</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  {visitor.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                {photo ? <img src={URL.createObjectURL(photo)} alt="Visitor" width="50" height="50" /> : 
                visitor.photo && (
      <img
        src={visitor.photo} // This will work for Base64 strings or file URLs
        alt={`${visitor.name}'s photo`}
        style={{ width: "150px", height: "150px", objectFit: "cover" }}
      />
    )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {visitor.name}
                </td>
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
              <input
                type="text"
                name="photo"
                value={photo || " "}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
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
               <label className="block text-sm font-medium text-gray-700">
               Status
              </label>
              <input
                type="text"
                name="status"
                value={updatedVisitor.status}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700">
               visited
              </label>
              <input
                type="text"
                name="visited"
                value={updatedVisitor.visited}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)} // Cancel and return to viewing mode
                className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Operator_dash;