import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = ({ onLoginSuccess }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const ChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({ ...prevData, [name]: value }));
  };

  const SubmitHandler = async (e) => {
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
      console.log({ data });

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // Save token, user info, and role info in local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', JSON.stringify(data.user.role)); // Save the full role object

      // Notify parent component of login success
      onLoginSuccess();

      // Handle role-based navigation
      const roleName = data.user.role; // Extract role name from the response
      console.log(roleName)
      switch (roleName) {
        case "SuperAdmin":
          navigate('/superAdmin-dashboard'); // Navigate to visitor dashboard
          break;
        case "Admin":
          navigate('/admin-dashboard'); // Navigate to admin dashboard
          break;
        case "Operator":
          navigate('/home '); // Navigate to superadmin dashboard
          break;
        default:
          navigate('/home'); // Default fallback
          break;
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex py-[50px] justify-center items-center">
      <div className="flex bg-[#d3d1df] rounded-xl w-[1000px] h-[600px] max-h-[1200px] p-6">
        <div className="flex flex-col">
          <div className="flex justify-center my-12 text-4xl">
            <h1 className="text-3xl text-white font-bold">Visitor Management System</h1>
          </div>

          {/* Left Section: Login Form */}
          <div className="flex">
            <div className="flex-1 flex flex-col justify-center items-center">
              <h2 className="text-2xl mb-6">Welcome To Tata Motors</h2>
              <form className="w-[80%]" onSubmit={SubmitHandler}>
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

            {/* Right Section: Image */}
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
