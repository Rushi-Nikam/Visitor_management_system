import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import Routers from './Routers';  // Import your Routes component
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import Login from './pages/Login';

function App() {
  // Use useSelector to check if the user is logged in from Redux store
  const user = useSelector((state) => state.user.user);

  return (
    
      <BrowserRouter>
        {user ? <Routers /> :<Login/>}
 
      </BrowserRouter>
    
  );
}

export default App;
