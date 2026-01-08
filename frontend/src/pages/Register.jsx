import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

const Register = () => {
  const navigateTo = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [education, setEducation] = useState('');
  const [photo, setPhoto] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);
  const { setIsAuthenticated, setProfile } = useAuth();

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    // Handle registration logic here
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('role', role);
    formData.append('education', education);
    formData.append('photo', photo);

    try {
      const { data } = await axios.post('http://localhost:4001/api/users/register', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(data);
      toast.success(data.message, 'User registration successful!');
      setProfile(data);
      setIsAuthenticated(true);
      setName('');
      setEmail('');
      setPassword('');
      setPhone('');
      setRole('');
      setEducation('');
      setPhoto('');
      setPhotoPreview(null);
      navigateTo('/login');
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error(error.message, 'Please fill the required fields!');
    }
  };

  return (
    <div>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <form onSubmit={handleRegister}>
            <div className="item-center text-center text-xl font-semibold">
              Cilli <span className="text-blue-500">Blog</span>
            </div>
            <h1 className="mb-6 text-xl font-semibold">Register</h1>
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
                type="text"
                value={name}
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border p-2"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                placeholder="Your Email Address"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border p-2"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                placeholder="Your Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border p-2"
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                value={phone}
                placeholder="Your Phone Number"
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-md border p-2"
              />
            </div>
            <select
              className="mb-4 w-full rounded-md border p-2"
              onChange={(e) => setEducation(e.target.value)}
              value={education}
            >
              <option value="">Select Education</option>
              <option value="highschool">High School</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
            </select>
            <div className="mb-4 flex items-center">
              <div className="photo mr-4 h-20 w-20">
                <img src={photoPreview ? `${photoPreview}` : 'photo'} alt="photo" />
              </div>
              <input
                type="file"
                onChange={changePhotoHandler}
                className="w-full rounded-md border p-2"
              />
            </div>
            <p className="mb-4 text-center">
              Already registered?{' '}
              <Link to={'/login'} className="text-blue-600">
                Login Now
              </Link>
            </p>{' '}
            <button
              type="submit"
              className="w-full cursor-pointer rounded-md bg-blue-500 p-2 text-white duration-300 hover:bg-blue-800"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
