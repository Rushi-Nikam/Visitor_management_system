import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const token = localStorage.getItem('Auth'); // Token fallback
  const role = user?.role || JSON.parse(localStorage.getItem('role'));

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <p>Page not Found</p>
  }

  return children;
};

export default ProtectedRoute;
