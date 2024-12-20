import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/Slices/UserSlice'; // Import the action
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({ ...prevData, [name]: value }));
  };

  const login = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError('Both email and password are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // Store the token and user info in localStorage
      localStorage.setItem('Auth', data.token);
      localStorage.setItem('role', JSON.stringify(data.user.role)); // Store role in localStorage

      // Dispatch action to set the user data in Redux store
      dispatch(setUser({
        user: data.user,
        isAuthenticated: true, // Mark as authenticated
      }));

      // Redirect the user based on their role
      switch (data.user.role) {
        case 'SuperAdmin':
          navigate('/superAdmin-dashboard');
          break;
        case 'Admin':
          navigate('/Admin-dashboard');
          break;
        case 'Operator':
          navigate('/Operator-dashboard');
          break;
        default:
          navigate('/');
          break;
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex py-[50px] justify-center items-center">
      <div className="flex bg-[#d3d1df] rounded-xl w-[900px] h-[600px] max-h-[1200px] p-6">
        <div className="flex flex-col">
          <div className="flex justify-center text-4xl">
            <h1 className="text-3xl text-white font-bold">Visitor Check-In and Authorization</h1>
          </div>

          <div className="flex">
            <div className="flex-1 flex flex-col justify-center items-center">
              <h2 className="text-2xl mb-6">Welcome To Visioria</h2>
              <form className="w-[80%]" onSubmit={login}>
                {error && (
                  <div className="text-red-700 mb-4">
                    <strong>{error}</strong>
                  </div>
                )}

                <div className="flex flex-col mb-4">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={ChangeHandler}
                    placeholder="Enter your email"
                    required
                    className="p-2 border-2 rounded"
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={ChangeHandler}
                    autoComplete="on"
                    placeholder="Enter your password"
                    required
                    className="p-2 border-2 rounded"
                  />
                </div>

                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded mt-4">
                  Log In
                </button>
              </form>
            </div>

            <div className="flex-1 flex justify-center items-center border-l-2">
              <img src="/Images/Login.png" alt="Login" className="max-w-full w-[600px] h-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
