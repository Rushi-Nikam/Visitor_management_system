import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Login = ({ onLoginSuccess }) => {
  const [form, setForm] = useState({
    email: 'rushidnikam00@gmail.com',
    password: 'rushi@321',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const ChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({ ...prevData, [name]: value }));
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Both email and password are required');
      return;
    }
    setError('');

    // Simulate login success
    console.log('Login with', form);
   
    // Update the login state in the parent component
    onLoginSuccess();

    // Navigate to the Home page after successful login
    navigate('/home');
  };

  return (
    <div className="flex  py-[50px] justify-center items-center">
        <div className='flex bg-[#d3d1df] rounded-xl w-[1000px] h-[600px] max-h-[1200px]  p-6'>
      <div className="flex flex-col">
        <div className='flex  justify-center  my-12 text-4xl'>

        <h1 className='text-3xl text-white font-bold '>Visitor management System</h1>
        </div>
        {/* Left Section: Login Form */}
        <div className='flex'>

       
        <div className="flex-1 flex flex-col justify-center items-center">
          <h2 className="text-2xl mb-6">Welcome To Tata Motor's</h2>
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
                placeholder="Enter your password"
                required
                className="p-2 border-2 rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded mt-4"
            >
              Log In
            </button>
          </form>
        </div>

        {/* Right Section: Image */}
        <div className="flex-1 flex justify-center items-center border-l-2 pl-6">
          <img
            src="/Images/Tata_Motor.png"
            alt="Tata Motor"
            className="max-w-full h-auto"
          />
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
