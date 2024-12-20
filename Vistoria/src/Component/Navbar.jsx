import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../pages/Logout';

const Navbar = () => {
  return (
    <main>
      <div className="flex border-2 justify-between">
        <ul className="flex gap-12 mx-12 items-center">
          <li>
            <NavLink to={`/home`}>
            
            <img src="/Images/Tata_Motor.png" width={`80`} alt="" />
            </NavLink>
          </li>
        </ul>
        {/* <NavLink to={`/just`}>
          <button className="flex border bg-red-500 px-4 py-2 rounded-xl text-white">
          View Visitors
          </button>
        </NavLink> */}
      
        
         <Logout/>
          
       
      </div>
    </main>
  );
};

export default Navbar;
