import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

function Login() {
  const { setIsAuthenticated, setProfile } = useAuth();

  const navigateTo = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        'http://localhost:4001/api/users/login',
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('LOGIN DATA:', data);

      localStorage.setItem('jwt', data.token);

      toast.success(data.message || 'User logged in successfully');

      setProfile(data);
      setIsAuthenticated(true);

      setEmail('');
      setPassword('');
      setRole('');

      navigateTo('/');
    } catch (error) {
      console.log('LOGIN ERROR:', error);

      toast.error(error.response?.data?.message || 'Login failed', { duration: 3000 });
    }
  };

  return (
    <div>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <form onSubmit={handleLogin}>
            <div className="items-center text-center text-xl font-semibold">
              PostCraft &nbsp;<span className="text-blue-500">CMS</span>
            </div>
            <h1 className="mb-6 text-xl font-semibold">Login</h1>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mb-4 w-full rounded-md border p-2"
            >
              <option value="">Select Role</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border p-2"
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border p-2"
              />
            </div>

            <p className="mb-4 text-center">
              New User?{' '}
              <Link to={'/register'} className="text-blue-600">
                Register Now
              </Link>
            </p>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-md bg-blue-500 p-2 text-white duration-300 hover:bg-blue-800"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
