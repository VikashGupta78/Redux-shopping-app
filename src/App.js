import './App.css';
import { Counter } from './components/Counter';
import Navbar from './components/Navbar';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Payment from './components/Payment';
import Login from './pages/Login';
import { Signup } from './pages/Signup';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div>
      <Navbar />
      <Routes> 
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private Routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />

        {/* Redirect to home if authenticated, otherwise to login */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/home" : "/login"} />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
