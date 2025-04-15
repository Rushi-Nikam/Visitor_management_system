import React, { useState, useEffect } from 'react';
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import VisitorForm from '../Component/VisitorForm';

const Admin_dash = () => {
  const [toggle, setToggle] = useState(false);
  const [list, setList] = useState([]);
  const [updateVisitor, setUpdateVisitor] = useState(null);
  const [showList, setShowList] = useState(false);
  const [time, setTime] = useState(null);
  const [DOB, setDOB] = useState(null);
  const userName = localStorage.getItem('role');
  // const Name = userName.user.email;
  const ClickHandler = () => {
    setToggle((prev) => !prev);
    setShowList(false);
  };

  const fetchdata = async () => {
    try { 
      const adminid = localStorage.getItem('userId'); 
      const response = await fetch(`http://localhost:3000/api/visit/visitors?adminid=${adminid}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      setList(jsonData);
      // console.log({jsonData});
      jsonData.forEach(visitor => {
        const date = visitor.visiting_date;
        const date2 = visitor.date_of_birth;
        const formattedDate2 = new Date(date2).toLocaleDateString();
        const formattedDate = new Date(date).toLocaleDateString();
        setTime(formattedDate);
        setDOB(formattedDate2);
      });
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
    setToggle(true);
    setShowList(false);
  };
  const cancelUpdateHandler = () => {
    setUpdateVisitor(null);
    setToggle(false);
  };
  const listHandler = () => {
    setToggle(false); 
    setShowList(true);// Close form view if open
  };

  return (
<section className="grid grid-cols-12">
<div className="col-span-2 bg-gray-200 sm:h-screen  lg:h-[120vh] lg:p-10 p-6 overflow-hidden">
<div className="flex flex-col gap-4">
  <button
    type="button"
    onClick={ClickHandler}
    className="w-full px-6 py-2 sm:px-8 sm:py-2 md:px-10 md:py-3 lg:px-10 lg:py-2 
            font-semibold text-xs sm:text-sm md:text-base lg:text-lg  flex  justify-center
            bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300">
   {"Add Visitor"}
  </button>


    <button
      type="button"
      onClick={listHandler}
      className="w-full px-6 py-2 sm:px-8 sm:py-2 md:px-10 md:py-3 lg:px-10 lg:py-2
      font-semibold text-xs sm:text-sm md:text-base lg:text-lg  flex  justify-center
      bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
    >
      View List
    </button>
  </div>
</div>
<div className="col-span-10  w-full grid">
<div className="w-full flex  justify-center mt-10 text-center">
{toggle ? (
      <div>
                  {updateVisitor && (<div className='flex  items-center justify-center mt-10 w-full '>
                    <button onClick={cancelUpdateHandler} className="mt-4 p-3  bg-red-500 w-[30%] flex justify-center text-white rounded-lg hover:bg-red-600">
                   <AiOutlineClose />
                    </button>
                  </div>
              
                  )}
      <VisitorForm
        submitUrl={updateVisitor ? `http://localhost:3000/api/visit/visitors/${updateVisitor.id}` : 'http://localhost:3000/api/visit/visitors'}
        initialData={updateVisitor}
        onSubmit={(data) => {
          console.log('Form Data before submission:', data);
          const requiredFields = [
            'name', 'address', 'gender', 'date_of_birth',
            'mobile_number', 'pancard', 'aadhar_card_number',
            'whom_to_meet', 'purpose_of_meet', 'visiting_date'
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
          fetchdata();
          setToggle(false);
          setUpdateVisitor(null);
        }}
      />
    </div>
    ) : showList ? (
      list?.length > 0 ? (
        <div className='flex flex-col justify-center items-center'>
        <div className="flex justify-center my-10 items-center">
          <p className="lg:text-3xl text-xl font-semibold">
            List of the <span className="lg:text-3xl text-xl  text-gray-500 font-semibold"> Visitors </span> 
          </p>
        </div>
        {/* Scrollable Container with Vertical Snap */}
        <div className="overflow-y-auto max-h-[500px] max-w-[400px] lg:max-w-[1200px]  snap-y snap-mandatory scroll-smooth border border-gray-200 ">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-100">
              <tr className="snap-start">
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
                <tr key={visitor.id} className="hover:bg-gray-50 snap-start">
                  <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-300">{visitor.name}</td>
                  <td className="px-4 py-2 border border-gray-300">{visitor.address}</td>
                  <td className="px-4 py-2 border border-gray-300">{visitor.gender}</td>
                  <td className="px-4 py-2 border border-gray-300">{visitor.date_of_birth}</td>
                  <td className="px-4 py-2 border border-gray-300">{visitor.mobile_number}</td>
                  <td className="px-4 py-2 border border-gray-300">{visitor.pancard}</td>
                  <td className="px-4 py-2 border border-gray-300">{visitor.aadhar_card_number}</td>
                  <td className="px-4 py-2 border border-gray-300">{visitor.whom_to_meet}</td>
                  <td className="px-4 py-2 border border-gray-300">{visitor.purpose_of_meet}</td>
                  <td className="px-4 py-2 border border-gray-300">{visitor.visiting_date}</td>
                  <td className="px-6 py-6 border border-gray-300 flex gap-2  ">
                    <button onClick={() => updateHandler(visitor)} className="p-2 text-yellow-500 bg-yellow-100 rounded-lg hover:bg-yellow-200">
                      <MdEditSquare size={25} />
                    </button>
                    <button onClick={() => deleteHandler(visitor.id)} className="p-2 text-red-500 bg-red-100 rounded-lg hover:bg-red-200">
                      <MdDelete size={25} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      
      ) : (
        <div className='flex justify-center h-full  items-center'>      <p className='text-5xl font-semibold'>No <span className='text-5xl font-semibold text-gray-500'> visitors</span> found.</p></div>
  
      )
    ) : (
      <div className='flex justify-center items-center text-center w-full h-screen'> 
 <h1 className=" font-semibold text-5xl flex">Welcome, to the <span  className='text-green-700 text-5xl mx-4'>{userName || "Admin"}</span>  page</h1>
      </div>
     
    )}
</div>
</div>
</section>
);
};

export default Admin_dash;
