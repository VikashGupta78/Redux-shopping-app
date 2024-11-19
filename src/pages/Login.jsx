import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../redux/slices/AuthSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  function changeHandler(e) {
    const { name, value } = e.target;
    const copyInfo = { ...loginInfo };
    copyInfo[name] = value;
    setLoginInfo(copyInfo);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return toast.error('Please fill in all fields');
    }

    try {
      const url = 'http://localhost:5000/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });

      const data = await response.json();
      console.log(data);
      if (data.success && data.token) {
        dispatch(login({ token: data.token, user: data.name })); // Dispatch login action
        toast.success(data.message);
        navigate('/home');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h1>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginInfo.email}
              onChange={changeHandler}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginInfo.password}
              onChange={changeHandler}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-200 font-medium"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between items-center mt-4">
          <label className="flex items-center text-sm text-gray-600">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <NavLink to="/forgot-password" className="text-sm text-indigo-600 hover:underline">
            Forgot password?
          </NavLink>
        </div>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <NavLink to="/signup" className="text-indigo-600 font-semibold hover:underline">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;