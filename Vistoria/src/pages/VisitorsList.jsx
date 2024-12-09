import React, { useState, useEffect } from "react";

const VisitorsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  // To handle loading state
  const [error, setError] = useState(null);  // To handle errors

  useEffect(() => {
    fetch('http://localhost:5000/api/visitors') // Replace with your backend URL
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch visitors');
        }
        return res.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // Empty array means this runs only once when component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-center my-4">   <h1 className="text-2xl  font-bold mb-4">Visitors List</h1></div>
   
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">Date of Birth</th>
            <th className="border border-gray-300 px-4 py-2">Primary Phone</th>
            <th className="border border-gray-300 px-4 py-2">Purpose of Visit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.address}</td>
              <td className="border border-gray-300 px-4 py-2">{item.dob}</td>
              <td className="border border-gray-300 px-4 py-2">{item.primaryPhone}</td>
              <td className="border border-gray-300 px-4 py-2">{item.purposeOfMeet}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorsList;
