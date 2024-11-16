import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import logo from '../assets/shopApp-logo.png'


function Navbar() {
  return ( 
    <div className='bg-slate-900 flex justify-between items-center px-32 py-5'>
        <NavLink to = '/'>
            <div className='w-40 object-cover'>
                <img src={logo} alt="logo" />        
            </div>
        </NavLink>
        <div className='flex gap-4 items-center font-medium text-xl text-slate-100'>
            <NavLink to='/'>
                <p>Home</p>
            </NavLink>

            <NavLink to='/cart'>
                <div>
                <FaShoppingCart />
                </div>
            </NavLink>
            
            
        </div>
    </div>
  )
}

export default Navbar