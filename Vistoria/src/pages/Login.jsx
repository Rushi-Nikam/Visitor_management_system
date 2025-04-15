import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/Slices/UserSlice';
import {  useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Spinner } from 'react-bootstrap'; // Add spinner for loading indicator

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({ ...prevData, [name]: value }));
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the showPassword state
  };
  const login = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Both email and password are required');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Login failed');
        setIsLoading(false);
        return;
      }
      dispatch(setUser({ token: data.token, role: data.user.role, user: data.user }));
      localStorage.setItem('Auth', data.token);
      localStorage.setItem('role', JSON.stringify(data.user.role));
      localStorage.setItem('user', JSON.stringify({ token: data.token, role: data.user.role, user: data.user }));
      localStorage.setItem('userId', data.user.id);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-white items-center justify-center min-h-[83vh]">
    <div className="flex rounded-xl border-2  bg-[#d3d1df] shadow-xl w-[900px] h-[560px] lg:w-[900px] max-h-[1200px] p-6 overflow-hidden max-w-5xl">
      {/* Left Section */}
      <div className="hidden md:flex flex-1 rounded-2xl items-center justify-center">
        <img src="/Images/Login.png" alt="Login Illustration" className="w-[500px] h-[400px] rounded-full" />
      </div>
  
      {/* Divider */}
      <div className="w-[2px] bg-gray-400 mx-6"></div>
  
      {/* Right Section */}
      <div className="flex-1 justify-center items-center m-auto p-8 sm:p-12">
        <h2 className="text-5xl font-semibold text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">Sign in to continue</p>
        <form onSubmit={login} noValidate>
          {error && <div className="text-red-600 bg-red-100 p-3 rounded-md text-sm mb-4">{error}</div>}
  
          <div className="relative mb-4">
            <label htmlFor="email" className="sr-only">Email</label>
            <FaUser className="absolute left-3 top-0 lg:top-4 text-gray-500" />
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={ChangeHandler}
              placeholder="Enter your email"
              required
              aria-invalid={error ? 'true' : 'false'}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
  
          <div className="relative mb-4">
            <label htmlFor="password" className="sr-only">Password</label>
            <FaLock className="absolute left-3 top-0 lg:top-4 text-gray-500" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={ChangeHandler}
              autoComplete="on"
              placeholder="Enter your password"
              required
              aria-invalid={error ? 'true' : 'false'}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {/* Eye Icon for showing/hiding password */}
            <div onClick={togglePasswordVisibility} className="absolute right-3 top-4 cursor-pointer">
              {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </div>
          </div>
  
          <button
            type="submit"
            className="w-full p-3 bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-500 transition-all"
            disabled={isLoading}
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  </div>
  
  );
};

export default Login;
