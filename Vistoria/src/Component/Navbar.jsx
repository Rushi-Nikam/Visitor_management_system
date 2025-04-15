import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Logout from '../pages/Logout';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = JSON.parse(localStorage.getItem('user'))?.user; 
  const [showDropdown, setShowDropdown] = useState(false);

  const getEmailInitials = (email) => {
    if (!email) return 'U'; 
    const [localPart] = email.split('@'); 
    return localPart.slice(0, 2).toUpperCase();
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    setShowDropdown(false);
  };
  // bg-[#201f31] 
  return (
    <main className='w-full max-w-[10xl]'>
      <div className="flex bg-gray-200 justify-between items-center p-4">
        <ul className="flex gap-12 lg:mx-4  items-center">
          <li className="flex px-10  text-cyan-200">
            <img src="/Images/Visitoria3.png" width={`100`}  alt="Visitoria Logo" />
          </li>
        </ul>

        {isAuthenticated && (
          <div className="relative">
            {/* User Circle */}
            <div
              className="w-10 h-10 rounded-full mr-9 bg-blue-500 text-white flex justify-center items-center cursor-pointer font-bold"
              onClick={toggleDropdown}
            >
              {getEmailInitials(user?.email)}
            </div>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute flex flex-col text-center right-0 mt-2 bg-white border rounded-lg shadow-lg p-4 w-56">
                <p className="text-sm font-bold mb-2">{user?.email || 'Email not available'}</p>
                <p className="text-sm text-gray-600 mb-4">Role: {user?.role || 'Role not available'}</p>
                <Logout onLogout={handleLogout} /> 
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Navbar;
