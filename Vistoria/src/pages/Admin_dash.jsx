import React, { useState, useEffect } from 'react';
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import VisitorForm from '../Component/VisitorForm';

const Admin_dash = () => {
  const [toggle, setToggle] = useState(false);
  const [list, setList] = useState([]);
  const [updateVisitor, setUpdateVisitor] = useState(null); // Holds the user data for update
const [time,settime]=useState(null);
const [DOB,setDOB]=useState(null);
  const ClickHandler = () => {
    setToggle((prev) => !prev);
    if (updateVisitor) {
      setUpdateVisitor(null); // Reset update user when toggling
    }
  };

  const fetchdata = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/visit/visitors', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setList(jsonData);
      for (let i = 0; i < jsonData.length; i++) {
        
        const date = jsonData[i].visiting_date;
        const date2 = jsonData[i].date_of_birth;
        // console.log(date2)
        const FromtedDate2 = new Date(date2).toLocaleDateString();
        const FormatedDate = new Date(date).toLocaleDateString();
        // console.log({FormatedDate})
        settime(FormatedDate);
        setDOB(FromtedDate2);
        
      }
      // console.log({jsonData})
    } catch (err) {
      console.error('Fetch Error:', err);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/visit/visitors/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Update the list after deletion
      setList((prevList) => prevList.filter((visitor) => visitor.id !== id));
      console.log(`User with ID ${id} deleted successfully`);
    } catch (err) {
      console.error(err);
    }
  };

  const updateHandler = (visitor) => {
    setUpdateVisitor(visitor); 
    // console.log({ visitor }); 
    setToggle(true);
  };

  const listHandler = () => {
    setToggle(false); // Close form view if open
  };

  return (
    <div>
      <div className="flex mt-3 lg:mt-10 justify-center items-center text-center w-full gap-3">
        <button
          type="button"
          onClick={ClickHandler}
          className="flex px-6 text-white py-2 items-center rounded bg-red-500"
        >
          {updateVisitor ? <AiOutlineClose /> : 'Add Visitor'}
        </button>

        {!updateVisitor && (
          <button
            type="button"
            onClick={listHandler}
            className="flex px-6 text-white py-2 rounded bg-red-500"
          >
            View List
          </button>
        )}
      </div>

      {toggle && (
        <VisitorForm
          submitUrl={
            updateVisitor
              ? `http://localhost:3000/api/visit/visitors/${updateVisitor.id}` // Update endpoint
              : 'http://localhost:3000/api/visit/visitors' // Create endpoint
          }
          initialData={updateVisitor} // Pre-fill form data for update
          onSubmit={(data) => {
            console.log('Form Data before submission:', data);

            // Validate required fields
            const requiredFields = [
              'name', 'address', 'gender', 'date_of_birth',
              'mobile_number', 'pancard', 'aadhar_card_number',
              'whom_to_meet', 'purpose_of_meet', 'visiting_date'
            ];
            for (let field of requiredFields) {
              if (!data[field]) {
                alert(`The field ${field} is required.`);
                return; // Prevent form submission
              }
            }

            return data; // Submit data
          }}
          onSuccess={() => {
            fetchdata(); // Refresh the visitor list
            setToggle(false); // Close the form
            setUpdateVisitor(null); // Clear update visitor state
          }}
        />
      )}

      {!toggle && list?.length > 0 && (
        <div className="mt-6 overflow-auto rounded-lg shadow-lg">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Name</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Address</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Gender</th>
                <th className="px-4 py-2 border border-gray-300 text-left">DOB</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Mobile Number</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Pan Card</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Aadhar Card</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Whom To Meet</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Purpose</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Visiting Schedule</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((visitor, index) => (
                <tr key={visitor.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-300">{visitor.name}</td>
                  <td className="px-4 py-2 border border-gray-300">{visitor.address}</td>
                  <td className="px-4 py-2 border border-gray-300">{visitor.gender}</td>
                  <td className="px-4 py-2 border border-gray-300">{DOB}</td>
                  <td className="px-4 py-2 border border-gray-300">{visitor.mobile_number}</td>
                  <td className="px-4 py-2 border border-gray-300">{visitor.pancard}</td>
                  <td className="px-4 py-2 border border-gray-300">{visitor.aadhar_card_number}</td>
                  <td className="px-4 py-2 border border-gray-300">{visitor.whom_to_meet}</td>
                  <td className="px-4 py-2 border border-gray-300">{visitor.purpose_of_meet}</td>
                  <td className="px-4 py-2 border border-gray-300">{time}</td>
                  <td className="px-4 py-2 border border-gray-300 space-x-2">
                    <div className="flex">
                      <button
                        type="button"
                        onClick={() => updateHandler(visitor)}
                        className="py-1 text-yellow-500 rounded"
                      >
                        <MdEditSquare size={35} />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteHandler(visitor.id)}
                        className="py-2 text-red-500 rounded"
                      >
                        <MdDelete size={35} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin_dash;
