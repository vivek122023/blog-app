import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {BACKEND_URL} from "../utils.js"
import { CiMenuBurger } from 'react-icons/ci';
import { BiSolidLeftArrowAlt } from 'react-icons/bi';
import toast from 'react-hot-toast';

function Sidebar({ setComponent }) {
  const { profile, setIsAuthenticated } = useAuth();
  console.log(profile);
  const navigateTo = useNavigate();

  const [show, setShow] = useState(false);

  const handleComponents = (value) => {
    setComponent(value);
  };
  const gotoHome = () => {
    navigateTo('/');
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/users/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      localStorage.removeItem('jwt'); // deleting token in localStorage so that if user logged out it will goes to login page
      setIsAuthenticated(false);
      navigateTo('/login');
    } catch (error) {
      console.log(error);
      toast.error(error.data.message || 'Failed to logout');
    }
  };

  return (
    <>
      <div className="fixed top-4 left-4 z-50 sm:hidden" onClick={() => setShow(!show)}>
        <CiMenuBurger className="text-2xl" />
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-64 transform bg-gray-50 shadow-lg transition-transform duration-300 sm:translate-x-0 ${
          show ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div
          className="absolute top-4 right-4 cursor-pointer text-xl sm:hidden"
          onClick={() => setShow(!show)}
        >
          <BiSolidLeftArrowAlt className="text-2xl" />
        </div>
        <div className="text-center">
          <img className="mx-auto mb-2 h-24 w-24 rounded-full" src={profile?.photo?.url} alt="" />
          <p className="text-lg font-semibold">{profile?.name}</p>
        </div>
        <ul className="mx-4 space-y-6">
          <button
            onClick={() => handleComponents('My Blogs')}
            className="w-full rounded-lg bg-green-500 px-4 py-2 transition duration-300 hover:bg-green-700"
          >
            MY BLOGS
          </button>
          <button
            onClick={() => handleComponents('Create Blog')}
            className="w-full rounded-lg bg-blue-400 px-4 py-2 transition duration-300 hover:bg-blue-700"
          >
            CREATE BLOG
          </button>
          <button
            onClick={() => handleComponents('My Profile')}
            className="w-full rounded-lg bg-pink-500 px-4 py-2 transition duration-300 hover:bg-pink-700"
          >
            MY PROFILE
          </button>
          <button
            onClick={gotoHome}
            className="w-full rounded-lg bg-red-500 px-4 py-2 transition duration-300 hover:bg-red-700"
          >
            HOME
          </button>
          <button
            onClick={handleLogout}
            className="w-full rounded-lg bg-yellow-500 px-4 py-2 transition duration-300 hover:bg-yellow-700"
          >
            LOGOUT
          </button>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
