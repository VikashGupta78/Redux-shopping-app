import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Signup = () => {
    const navigate = useNavigate();
    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        password: "",
    })
    function changeHandler(e) {
        const { name, value } = e.target;
        console.log(name, value);
        const copyinfo = { ...signupInfo };
        copyinfo[name] = value;
        setSignupInfo(copyinfo);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
    
        // Ensure all fields are filled
        if (!name || !email || !password) {
            return toast.error("Please fill out all fields.");
        }
    
        try {
            const url = "http://localhost:5000/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupInfo),
            });
            const result = await response.json();
            console.log(result);
            if (result.success) {
                toast.success(result.message);
                setTimeout(()=>{
                    navigate('/login')
                }, 1000);
            } else {
                toast.error(result.message || "Signup failed");
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
        }
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h1>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={signupInfo.name}
                            onChange={changeHandler}
                            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={signupInfo.email}
                            onChange={changeHandler}
                            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="pass" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="pass"
                            name="password"
                            value={signupInfo.password}
                            onChange={changeHandler}
                            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Create a strong password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-200 font-medium"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account?{' '}
                    <NavLink
                        to="/login"
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        Login
                    </NavLink>
                </p>
            </div>
        </div>
    );
};
