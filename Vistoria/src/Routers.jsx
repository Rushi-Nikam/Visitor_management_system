import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import { useSelector } from 'react-redux'; // Import Redux hook
import Home from './pages/Home';
import Login from './pages/Login';
import VisitorsList from './pages/VisitorsList';
import Navbar from './Component/Navbar';
import Superadmin_dash from './pages/SuperAdmin_dash';
import Admin_dash from './pages/Admin_dash';
import Operator_dash from './pages/Operator_dash';
import Logout from './pages/Logout';
import ProtectedRoute from './Component/ProtectedRoute';
import UserForm from './Component/UserForm';


const Routers = () => {
  
  return (
    <>
    
       <Navbar />

       <Routes>
  <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
  <Route path="/register" element={<UserForm />} />

  {/* SuperAdmin Dashboard */}
  <Route 
    path="/superAdmin-dashboard" 
    element={
      <ProtectedRoute allowedRoles={['SuperAdmin']}>
        <Superadmin_dash />
      </ProtectedRoute>
    } 
  />

  {/* Admin Dashboard */}
  <Route 
    path="/Admin-dashboard" 
    element={
      <ProtectedRoute allowedRoles={['Admin']}>
        <Admin_dash />
      </ProtectedRoute>
    } 
  />

  {/* Operator Dashboard */}
  <Route 
    path="/Operator-dashboard" 
    element={
      <ProtectedRoute allowedRoles={['Operator']}>
        <Operator_dash />
      </ProtectedRoute>
    } 
  />

  <Route path="/just" element={<ProtectedRoute><VisitorsList /></ProtectedRoute>} />
  <Route path="/logout" element={<Logout />} />
  <Route path="/" element={<Login />} />
  <Route path="*" element={<div>404 - Page not found</div>} />
</Routes>

    </>
  );
};

export default Routers;