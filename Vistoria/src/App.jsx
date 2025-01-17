import React, { useEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import Routers from './Routers';

const AppContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const lastPath = localStorage.getItem('lastPath');
    const token = localStorage.getItem('Auth');
    if (token && lastPath) {
      navigate(lastPath);
    }
  }, []);

  return <Routers />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routers/>
    </BrowserRouter>
  );
};

export default App;
