import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../redux/Slices/UserSlice';  

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from Redux
    dispatch(clearUser());

    // Remove authentication info from localStorage
    localStorage.removeItem('Auth');

    // Redirect to login page or any other route
    navigate('/');
  };

  return (
    <div>
      <button onClick={handleLogout}>{`logout`}</button>
    </div>
  );
};

export default Logout;
