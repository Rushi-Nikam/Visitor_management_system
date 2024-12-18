import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import Login from './pages/Login';
import VisitorsList from './pages/VisitorsList';
import Navbar from './Component/Navbar';
import Superadmin_dash from './pages/Superadmin_dash';

const Routers = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/superAdmin-dashboard" element={<Superadmin_dash/>} />
        <Route path="/just" element={<VisitorsList/>} />
        <Route path="**" element={<div>404 - Page not found</div>} />
      </Routes>
    </>
  );
};

export default Routers;
