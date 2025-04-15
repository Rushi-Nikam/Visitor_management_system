import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { PDFDownloadLink } from "@react-pdf/renderer";
import VisitorPDF from "../Component/VisitorPDF";
import VisitorForm from "../Component/VisitorForm";
const Operator_dash = () => {
  // const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setotp] = useState("");
  const [toggle, settoggle] = useState(false);
  const [visitor, setVisitor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateVisitor, setUpdateVisitor] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [updatedVisitor, setUpdatedVisitor] = useState({}); // Store updated visitor data
  const [successMessage, setSuccessMessage] = useState(null); // State for success message
  const [photo, setPhoto] = useState(null); // Store photo file
  const [showPreview, setShowPreview] = useState(false); // State for showing preview
  const [data, setData] = useState([]);
  const webcamRef = useRef(null);
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
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

  const fetchdata = async () => {
    try {
      const operatorId = localStorage.getItem("userId");
      const response = await fetch(
        `http://localhost:3000/api/visit/allvisitors/${operatorId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      setData(jsonData);
      console.log({ jsonData });
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  // Handle field changes in the edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVisitor((prevVisitor) => ({
      ...prevVisitor,
      [name]: value,
    }));
  };
  const fetchvisitor = async () => {
    try {
      const adminid = localStorage.getItem("userId");
      const response = await fetch(
        `http://localhost:3000/api/visit/visitors?adminid=${adminid}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonData = await response.json();
      setList(jsonData);
      // console.log({jsonData});
      jsonData.forEach((visitor) => {
        const date = visitor.visiting_date;
        const date2 = visitor.date_of_birth;
        const formattedDate2 = new Date(date2).toLocaleDateString();
        const formattedDate = new Date(date).toLocaleDateString();
        setTime(formattedDate);
        setDOB(formattedDate2);
      });
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);
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
  const VisitorHandler = () => {
    setVisible(false);
    settoggle(true);
    setShow(false);
  };
  const HandlerVisible = () => {
    setVisible(!visible);
    setShow(false);
    settoggle(false);
  };
  const HandlerShow = () => {
    setVisible(false);
    setShow(!show);
    settoggle(false);
  };

  return (
    <div className="min-w-screen w-auto h-auto  gap-4   lg:flex-row">
     
      <div className="flex">
        <nav className="w-[250px]  mt-[-10px] bg-gray-200  border-black min-h-screen p-5">
          <div className="flex flex-col gap-4">
            {/* <div className="w-full flex items-center justify-center px-6 py-2 font-semibold text-yellow-500 rounded-lg text-2xl hover:text-[#617036] transition">
        Dashboard
      </div> */}

            <button
              type="button"
              onClick={HandlerShow}
              className="w-full flex items-center justify-center px-6 py-2 font-semibold text-white bg-red-500 rounded-lg hover:bg-[#d8f277] active:bg-[#d8f277] hover:text-[#617036] transition"
            >
              OTP
            </button>

            <button
              type="button"
              onClick={HandlerVisible}
              className="w-full flex items-center justify-center px-6 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-[#d8f277] active:bg-[#d8f277] hover:text-[#617036] transition"
            >
              View List
            </button>
            <button
              type="button"
              onClick={VisitorHandler}
              className="w-full flex items-center justify-center px-6 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-[#d8f277] active:bg-[#d8f277] hover:text-[#617036] transition"
            >
              Add Visitor
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex w-full p-6 ">
          {show && (
            <div className="mb-6  w-full  justify-center  items-center ">
              <div className="flex justify-center z-[50]   items-center   text-center  p-3  ">
        <h1 className="text-2xl mb-3">
         OTP Varification 
        </h1>
      </div>
              <div className="flex w-[70%] justify-center mx-auto gap-5 ">
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

              {loading && (
                <p className="text-center my-10 text-blue-600">
                  Loading visitor...
                </p>
              )}
              {error && (
                <p className="text-center text-red-600">Error: {error}</p>
              )}
              {successMessage && (
                <p className="text-center text-green-600">{successMessage}</p>
              )}

              {visitor && !isEditing && (
                <div className="overflow-x-auto my-10">
                  <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        {[
                          "ID",
                          "Photo",
                          "Name",
                          "Mobile Number",
                          "Purpose",
                          "Status",
                          "Visited",
                          "Action",
                          "Preview",
                        ].map((header) => (
                          <th
                            key={header}
                            className="border border-gray-300 px-4 py-2"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          {visitor.id}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {visitor.photo ? (
                            <img
                              src={`http://localhost:3000${visitor.photo}`}
                              alt={`${visitor.name}'s photo`}
                              className="w-[50px] h-[50px] object-cover rounded-full"
                            />
                          ) : (
                            <span>No photo available</span>
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
                  <h2 className="text-xl font-semibold mb-4">
                    Edit Visitor Details
                  </h2>
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
                        <div className="mt-4 justify-center border-2">
                          <h3 className="text-sm font-medium text-gray-700">
                            Captured Photo
                          </h3>
                          <img
                            src={URL.createObjectURL(photo)} // Display the captured photo
                            alt="Captured"
                            className="mt-2 w-40 h-40 object-cover rounded-md"
                          />
                        </div>
                      )}
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
                        Visited
                      </label>
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
                <div className="mt-6 flex justify-center">
                  <div className="bg-white border border-gray-300 rounded-lg shadow-lg w-[450px] p-4 relative">
                    <div className="flex flex-col justify-between items-center mb-4">
                      <h2 className="text-lg font-bold  capitalize text-gray-800 text-center">
                        Visitor Id card
                      </h2>
                    </div>
                    <hr className="border-gray-400 mb-4" />
                    <div className="flex items-center mb-4">
                      <div className="w-2/3 pl-4 text-sm">
                        <div className="mb-2">
                          <span className="font-bold">Name:</span>{" "}
                          {visitor.name}
                        </div>
                        <div className="mb-2">
                          <span className="font-bold">Gender:</span>{" "}
                          {visitor.gender}
                        </div>
                        <div className="mb-2">
                          <span className="font-bold">DOB:</span>{" "}
                          {visitor.date_of_birth}
                        </div>
                      </div>
                      <div className="w-1/3">
                        {visitor.photo ? (
                          <img
                            src={`http://localhost:3000${visitor.photo}`}
                            alt={`${visitor.name}'s photo`}
                            className="w-24 h-24 rounded-full border border-gray-400 object-cover"
                          />
                        ) : (
                          <div className="w-24 h-24 rounded border border-gray-400 flex items-center justify-center text-gray-500">
                            No Photo
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-sm mb-4">
                      <div className="mb-2">
                        <span className="font-bold">Visitor Date:</span>{" "}
                        {visitor.visiting_date}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold">Whom to Meet:</span>{" "}
                        {visitor.whom_to_meet}
                      </div>
                    </div>
                    <hr className="border-gray-400 mb-4" />
                    <div className="flex justify-between">
                      <PDFDownloadLink
                        document={<VisitorPDF visitor={visitor} />}
                        fileName={`${visitor.name}_details.pdf`}
                      >
                        {({ loading }) =>
                          loading ? (
                            <button
                              className="px-4 py-2 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition"
                              disabled
                            >
                              Generating PDF...
                            </button>
                          ) : (
                            <button className="px-4 py-2 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition">
                              Download PDF
                            </button>
                          )
                        }
                      </PDFDownloadLink>
                      <button
                        onClick={() => setShowPreview(false)}
                        className="px-4 py-2 bg-gray-600 text-white text-xs rounded-md hover:bg-gray-700 transition"
                      >
                        Close Preview
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex  justify-center mx-auto  flex-row">
        
            <div className="flex justify-center my-5  mx-auto">
              
              {visible && (

                <div>
                    <div className="flex justify-center z-[50]   items-center   text-center  p-3  ">
        <h1 className="text-2xl mb-3">
          Visitor Details
        </h1>
      </div>
                  <table className="table-auto  w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 border border-gray-300">ID</th>
                        <th className="px-4 py-2 border border-gray-300">
                          Name
                        </th>
                        <th className="px-4 py-2 border border-gray-300">
                          Address
                        </th>
                        <th className="px-4 py-2 border border-gray-300">
                          Gender
                        </th>
                        <th className="px-4 py-2 border border-gray-300">
                          Photo
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((visitor, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border border-gray-300">
                            {index + 1}
                          </td>
                          <td className="px-4 py-2 border border-gray-300">
                            {visitor.name}
                          </td>
                          <td className="px-4 py-2 border border-gray-300">
                            {visitor.address}
                          </td>
                          <td className="px-4 py-2 border border-gray-300">
                            {visitor.gender}
                          </td>
                          <td className="px-4 py-2 border border-gray-300 flex justify-center">
                            {visitor.photo ? (
                              <img
                                src={`http://localhost:3000${visitor.photo}`} // Use correct path to photo
                                alt={`${visitor.name}'s photo`}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                }}
                                className="rounded-full"
                              />
                            ) : (
                              <span>No photo available</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="flex-1">
                {toggle && (
                  <VisitorForm
                    submitUrl={
                      updateVisitor
                        ? `http://localhost:3000/api/visit/visitors/${updateVisitor.id}`
                        : "http://localhost:3000/api/visit/visitors"
                    }
                    initialData={updateVisitor}
                    onSubmit={(data) => {
                      console.log("Form Data before submission:", data);
                      const requiredFields = [
                        "name",
                        "address",
                        "gender",
                        "date_of_birth",
                        "mobile_number",
                        "pancard",
                        "aadhar_card_number",
                        "whom_to_meet",
                        "purpose_of_meet",
                        "visiting_date",
                      ];
                      for (let field of requiredFields) {
                        if (!data[field]) {
                          alert(`The field ${field} is required.`);
                          return;
                        }
                      }
                      return data;
                    }}
                    onSuccess={() => {
                      fetchvisitor();
                      settoggle(false);
                      setUpdateVisitor(null);
                    }}
                  />
                )}
              </div>
              {!show && !visible && !toggle && (
                <div className="font-semibold text-gray-500 text-5xl lg:mt-36">
                  Welcome to the{" "}
                  <span className="font-semibold text-gray-300 text-5xl lg:mt-36">
                    Operator{" "}
                  </span>{" "}
                  Page
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operator_dash;
