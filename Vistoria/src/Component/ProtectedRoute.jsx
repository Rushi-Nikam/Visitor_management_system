import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!isAuthenticated) {
    // alert('You must be logged in to access this page!');
    return <Navigate to={'/'}/>
  }
  return children;
};

export default ProtectedRoute;
