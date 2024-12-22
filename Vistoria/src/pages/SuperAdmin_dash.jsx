import React, { useState, useEffect } from 'react';
import Forms from '../Component/Forms';

const Superadmin_dash = () => {
  const [toggle, setToggle] = useState(false);
  const [list, setList] = useState([]);
  const [updateUser, setUpdateUser] = useState(null); // Holds the user data for update

  const ClickHandler = () => {
    setToggle((prev) => !prev);
    if (updateUser) {
      setUpdateUser(null); // Reset update user when toggling
    }
  };

  const fetchdata = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user/', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setList(jsonData.data);
    } catch (err) {
      console.log('err', err);
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

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      // Update the list after deletion
      setList((prevList) => prevList.filter((user) => user.id !== id));
      console.log(`User with ID ${id} deleted successfully`);
    } catch (err) {
      console.error(err);
    }
  };

  const updateHandler = (user) => {
    setUpdateUser(user); // Pass the full user object to the update handler
    setToggle(true); // Open the form for editing
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
          className="flex px-6 text-white py-2 rounded bg-red-500"
        >
          {updateUser ? 'Cancel Update' : 'Add User'}
        </button>
        <button
          type="button"
          onClick={listHandler}
          className="flex px-6 text-white py-2 rounded bg-red-500"
        >
          View List
        </button>
      </div>

      {toggle && (
        <Forms
          formType="user"
          submitUrl={
            updateUser
              ? `http://localhost:3000/api/user/${updateUser.id}` // Correct endpoint for updating
              : 'http://localhost:3000/api/user/create' // Correct endpoint for creating a new user
          }
          initialData={updateUser} // Pass full user data for pre-filling the form in update
          onSubmit={(data) => {
            console.log('Form Data before submission:', data); // Debug the form data

            // Ensure password is not included in the data when updating
            if (updateUser && !data.password) {
              delete data.password; // Remove password if it's not updated
            }

            // Check for any missing required fields before submission
            const requiredFields = ['name', 'email', 'roleid', 'phone']; // Adjust this to match your required fields
            for (let field of requiredFields) {
              if (!data[field]) {
                alert(`The field ${field} is required.`);
                return; // Prevent form submission if any required field is missing
              }
            }

            return data; // Return the data to be submitted
          }}
          onSuccess={() => {
            // On successful submit, fetch the updated list
            fetchdata();
            setToggle(false); // Close form after successful submission
            setUpdateUser(null); // Clear the update user state
          }}
        />
      )}

      {!toggle && list.length > 0 && (
        <div className="mt-6 overflow-auto rounded-lg shadow-lg">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border border-gray-300 text-left">ID</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Name</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Role ID</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Email</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Phone</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Created by</th>
                <th className="px-4 py-2 border border-gray-300 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-300">{user.name}</td>
                  <td className="px-4 py-2 border border-gray-300">{user.roleid}</td>
                  <td className="px-4 py-2 border border-gray-300">{user.email}</td>
                  <td className="px-4 py-2 border border-gray-300">{user.phone}</td>
                  <td className="px-4 py-2 border border-gray-300">{user.created_by}</td>
                  <td className="px-4 py-2 border border-gray-300 space-x-2">
                    <button
                      type="button"
                      onClick={() => updateHandler(user)}
                      className="px-4 py-2 text-white bg-blue-500 rounded"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteHandler(user.id)}
                      className="px-4 py-2 text-white bg-red-500 rounded"
                    >
                      Delete
                    </button>
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

export default Superadmin_dash;
