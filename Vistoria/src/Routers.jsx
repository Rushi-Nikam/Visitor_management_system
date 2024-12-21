import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import Redux hook
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import Login from './pages/Login';
import VisitorsList from './pages/VisitorsList';
import Navbar from './Component/Navbar';
import Superadmin_dash from './pages/Superadmin_dash';
import Admin_dash from './pages/Admin_dash';
import Operator_dash from './pages/Operator_dash';
import Logout from './pages/Logout';
import ProtectedRoute from './Component/ProtectedRoute';

const Routers = () => {
  // const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Access authentication status

  return (
    <>
      {/* Conditionally render Navbar if the user is authenticated */}
       <Navbar />

      <Routes>
        {/* Define the protected routes */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/register" element={<ProtectedRoute><RegisterPage /></ProtectedRoute>} />
        <Route path="/superAdmin-dashboard" element={<ProtectedRoute><Superadmin_dash /></ProtectedRoute>} />
        <Route path="/Admin-dashboard" element={<ProtectedRoute><Admin_dash /></ProtectedRoute>} />
        <Route path="/Operator-dashboard" element={<ProtectedRoute><Operator_dash /></ProtectedRoute>} />
        <Route path="/just" element={<ProtectedRoute><VisitorsList /></ProtectedRoute>} />
        <Route path="/logout" element={<Logout />} />

        {/* Login route */}
        <Route path="/" element={<Login />} />

        {/* 404 route */}
        <Route path="*" element={<div>404 - Page not found</div>} />
      </Routes>
    </>
  );
};

export default Routers;
