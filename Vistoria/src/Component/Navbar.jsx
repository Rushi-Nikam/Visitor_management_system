import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <main>
      <div className="flex border-2 justify-between">
        <ul className="flex gap-12 mx-12 items-center">
          <li>
            <NavLink to={`/home`}>Logo</NavLink>
          </li>
        </ul>
        <NavLink to={`/just`}>
          <button className="flex border bg-red-500 px-4 py-2 rounded-xl text-white">
          View Visitors
          </button>
        </NavLink>
      </div>
    </main>
  );
};

export default Navbar;
