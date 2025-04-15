import React, { useState, useEffect } from 'react';
import Forms from '../Component/Forms';
import { MdEditSquare, MdDelete } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const Superadmin_dash = () => {
  const [toggle, setToggle] = useState(false);
  const [showList, setShowList] = useState(false);
  const [list, setList] = useState([]);
  const [updateUser, setUpdateUser] = useState(null);

  const ClickHandler = () => {
    setToggle((prev) => !prev);
    setShowList(false); // Hide list when toggling form
  };

  const fetchdata = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user/', {
        method: 'GET',
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const jsonData = await response.json();
      setList(jsonData.data);
      // console.log(jsonData);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete user');
      setList((prevList) => prevList.filter((user) => user.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const updateHandler = (user) => {
    setUpdateUser(user);
    setToggle(true);
    setShowList(false);
  };

  const cancelUpdateHandler = () => {
    setUpdateUser(null);
    setToggle(false);
  };

  const listHandler = () => {
    setToggle(false);
    setShowList(true);
  };

  return (
  
    <section className="grid grid-cols-12">
      <div className="col-span-2 bg-gray-200 sm:h-screen  lg:h-[120vh] lg:p-10 p-6 overflow-hidden">
        {/*  */}
        <div className="flex flex-col gap-4">
          {/* <div className="w-full text-center font-semibold text-yellow-500 text-2xl">
            Dashboard
          </div> */}
          
          <button
            onClick={ClickHandler}
            className="w-full px-6 py-2 sm:px-8 sm:py-2 md:px-10 md:py-3 lg:px-10 lg:py-2 
            font-semibold text-xs sm:text-sm md:text-base lg:text-lg  flex  justify-center
            bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            {"Add User"}
          </button>
          <button
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
          {!toggle && !showList && (
            <div className="flex flex-col mt-10">
              <h1 className="text-5xl font-bold">
                Welcome to{" "}
                <span className="text-5xl font-bold text-gray-400">
                  SuperAdmin
                </span>{" "}
                Page
              </h1>
              <p className="text-gray-600 mt-2 font-semibold text-3xl">
                Manage users efficiently.
              </p>
            </div>
          )}

          {toggle && (
            <div >
              {updateUser && (
                <div className="flex items-center justify-center mt-10 w-full ">
                  <button
                    onClick={cancelUpdateHandler}
                    className="my-4 p-3  bg-red-500 w-[30%] flex justify-center text-white rounded-lg hover:bg-red-600"
                  >
                    <AiOutlineClose />
                  </button>
                </div>
              )}
              <Forms
                formType="user"
                submitUrl={
                  updateUser
                    ? `http://localhost:3000/api/user/${updateUser.id}`
                    : "http://localhost:3000/api/user/create"
                }
                initialData={updateUser}
                onSuccess={() => {
                  fetchdata();
                  setToggle(false);
                  setUpdateUser(null);
                }}
              />
            </div>
          )}

          <div>
            {showList && list.length > 0 && (
              <div className='flex flex-col justify-center items-center'>
                <div className="flex justify-center my-10 items-center">
                  <p className="lg:text-3xl text-xl font-semibold">
                    List of the <span className="lg:text-3xl text-xl  text-gray-500 font-semibold"> Admins </span> and <span className="lg:text-3xl text-xl font-semibold text-gray-500">Operators</span>
                  </p>
                </div>
                <div className="overflow-y-auto max-h-[500px] max-w-[400px] lg:max-w-[1200px]  snap-y snap-mandatory scroll-smooth border border-gray-200 ">
                  <table className=" w-full border-collapse">
                    <thead className="bg-gray-100">
                      <tr className='snap-start'>
                        <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
                        <th className="px-4 py-2 border border-gray-300 text-left">Name</th>
                        <th className="px-4 py-2 border border-gray-300 text-left">Role Name</th>
                        <th className="px-4 py-2 border border-gray-300 text-left">Email</th>
                        <th className="px-4 py-2 border border-gray-300 text-left">Phone</th>
                        <th className="px-4 py-2 border border-gray-300 text-left">Created by</th>
                        <th className="px-4 py-2 border border-gray-300 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.slice(1).map((user, index) => (
                        <tr key={user.id} className="hover:bg-gray-50 text-sm snap-start">
                          <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                          <td className="px-4 py-2 border border-gray-300">{user.name}</td>
                          <td className="px-4 py-2 border border-gray-300">{user.role_name}</td>
                          <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                          <td className="px-4 py-2 border border-gray-300">{user.phone}</td>
                          <td className="px-4 py-2 border border-gray-300">
                            {user.created_by}
                          </td>
                          <td className="px-6 py-6 border border-gray-300 flex gap-2">
                            <button
                              onClick={() => updateHandler(user)}
                             className="p-2 text-yellow-500 bg-yellow-100 rounded-lg hover:bg-yellow-200"
                            >
                              <MdEditSquare size={25} />
                            </button>
                            <button
                              onClick={() => deleteHandler(user.id)}
                              className="p-2 text-red-500 bg-red-100 rounded-lg hover:bg-red-200"
                            >
                              <MdDelete size={25} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Superadmin_dash;