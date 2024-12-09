import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from './Routers';  // Import your Routes component
import Navbar from './Component/Navbar';  // Import Navbar component
import Login from './pages/Login';  // Import Login page
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';

function App() {
  // Use state to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle login success by updating the login state
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      {/* Conditionally render content based on login state */}
      {isLoggedIn && <Navbar />}
      
      {/* Use Routes to handle login redirection */}
      <Routes>
        {/* If user is not logged in, show the Login page */}
        <Route path="/" element={isLoggedIn ? <Routers /> : <Login onLoginSuccess={handleLoginSuccess} />} />

        {/* Define other routes */}
        <Route path="/home" element={isLoggedIn ? <Home /> : <Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={isLoggedIn ? <RegisterPage /> : <Login onLoginSuccess={handleLoginSuccess} />} />
       
        <Route path="*" element={<div>404 - Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
