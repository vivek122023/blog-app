import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {BACKEND_URL} from "../utils.js"
import { AiOutlineMenu } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';

function Navbar() {
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/users/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      localStorage.removeItem('jwt');
      setIsAuthenticated(false);
      navigateTo('/login');
    } catch (error) {
      toast.error(error.data?.message || 'Failed to logout');
    }
  };

  const linkClass = ({ isActive }) =>
    isActive ? 'text-blue-500 font-semibold' : 'hover:text-blue-500';

  return (
    <nav className="fixed top-0 left-0 z-50 mb-8 w-full bg-white px-4 py-3 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/">
          <div className="text-xl font-semibold">
            PostCraft &nbsp;<span className="text-blue-500">CMS</span>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden space-x-6 md:flex">
          {isAuthenticated && (
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
          )}
          <NavLink to="/blogs" className={linkClass}>
            Blogs
          </NavLink>
          <NavLink to="/creators" className={linkClass}>
            Creators
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </ul>

        {/* Right Side Buttons + Mobile Menu Icon */}
        <div className="flex items-center space-x-2">
          {isAuthenticated && profile?.role === 'admin' && (
            <NavLink
              to="/dashboard"
              className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-800"
            >
              Dashboard
            </NavLink>
          )}

          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className="rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-800"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-800"
            >
              Logout
            </button>
          )}

          {/* ✅ Mobile Menu Icon (RIGHT SIDE FIXED) */}
          <div onClick={() => setShowMenu(!showMenu)} className="cursor-pointer md:hidden">
            {showMenu ? <IoCloseSharp size={26} /> : <AiOutlineMenu size={26} />}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {showMenu && (
        <div className="bg-white">
          <ul className="flex h-screen flex-col items-center justify-center space-y-4 text-xl md:hidden">
            <NavLink to="/" onClick={() => setShowMenu(false)} className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/blogs" onClick={() => setShowMenu(false)} className={linkClass}>
              Blogs
            </NavLink>
            <NavLink to="/creators" onClick={() => setShowMenu(false)} className={linkClass}>
              Creators
            </NavLink>
            <NavLink to="/about" onClick={() => setShowMenu(false)} className={linkClass}>
              About
            </NavLink>
            <NavLink to="/contact" onClick={() => setShowMenu(false)} className={linkClass}>
              Contact
            </NavLink>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
