import React from 'react'
import {NavLink} from 'react-router'
const Navbar = ({}) => {
  return (
    <main>
      <div className='flex border-2  justify-between '>
        <ul className='flex gap-12 mx-12 items-center'>
          <li>
            <NavLink to={`/home`}>Logo</NavLink>
          </li>
        </ul>
        <NavLink to='/register' className='flex 
          border  bg-red-500 px-4 py-2 rounded-xl text-white '>
            <button>Register</button>
        </NavLink>
      </div>
    </main>
  )
}

export default Navbar
