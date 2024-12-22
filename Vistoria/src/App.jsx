import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setUser } from './redux/Slices/UserSlice'; // Import action
// import Navbar from './Component/Navbar';
import Routers from './Routers';

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const token = localStorage.getItem('Auth');
  //   if (token) {
  //     // Optionally fetch user details with the token or restore state
  //     dispatch(setUser({ token, user: { role: "user" } }));
  //   }
  // }, [dispatch]);

  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
};

export default App;
