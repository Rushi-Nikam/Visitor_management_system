import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import Login from './pages/Login';
import VisitorsList from './pages/VisitorsList';
import Navbar from './Component/Navbar';
import Superadmin_dash from './pages/Superadmin_dash';
import Admin_dash from './pages/Admin_dash';
import Operator_dash from './pages/Operator_dash';
import Logout from './pages/Logout';

const Routers = () => {
  return (
    <>
     {<Login/>?<Navbar />:"null" }
      <Routes>
        {/* Define the protected routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/superAdmin-dashboard" element={<Superadmin_dash />} />
        <Route path="/Admin-dashboard" element={<Admin_dash />} />
        <Route path="/Operator-dashboard" element={<Operator_dash />} />
        <Route path="/just" element={<VisitorsList />} />
        <Route path="/logout" element={<Logout/>} />

        {/* Login route */}
        <Route path="/" element={<Login />} />

        {/* 404 route */}
        <Route path="*" element={<div>404 - Page not found</div>} />
      </Routes>
    </>
  );
};

export default Routers;
