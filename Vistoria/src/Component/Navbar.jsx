import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from '../pages/Logout';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <main>
      <div className="flex border-2 justify-between items-center p-4">
     
        <ul className="flex gap-12 mx-12 items-center">
          <li className="flex px-10 text-cyan-200">
            {/* <NavLink to={`${isAuthenticated?``:'/'}`}> */}
              <img src="/Images/Visitoria3.png" width={`80`} alt="Visitoria Logo" />
            {/* </NavLink> */}
          </li>
        </ul>

      
        {isAuthenticated && <Logout />}
      </div>
    </main>
  );
};

export default Navbar;
