import axios from 'axios';
import React, { useState } from 'react';
import {BACKEND_URL} from "../utils.js"
import toast from 'react-hot-toast';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [about, setAbout] = useState('');

  const [blogImage, setBlogImage] = useState('');
  const [blogImagePreview, setBlogImagePreview] = useState('');

  const changePhotoHandler = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('about', about);

    formData.append('blogImage', blogImage);
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/blogs/create-blog`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(data);
      toast.success(data.message || 'User registered successfully');
      setTitle('');
      setCategory('');
      setAbout('');
      setBlogImage('');
      setBlogImagePreview('');
    } catch (error) {
      console.log(error);
      toast.error(error.message || 'Please fill the required fields');
    }
  };
  return (
    <div>
      <div className="min-h-screen py-10">
        <div className="mx-auto max-w-4xl rounded-lg border p-6 shadow-lg">
          <h3 className="mb-8 text-2xl font-semibold">Create Blog</h3>
          <form onSubmit={handleCreateBlog} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-lg">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none"
              >
                <option value="">Select Category</option>
                <option value="Devotion">Devotion</option>
                <option value="Sports">Sports</option>
                <option value="Coding">Coding</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Title</label>
              <input
                type="text"
                placeholder="Enter your blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">Blog Image</label>
              <div className="flex items-center justify-center">
                <img
                  src={blogImagePreview ? `${blogImagePreview}` : '/imgPL.webp'}
                  alt="Image"
                  className="h-auto w-full max-w-sm rounded-md object-cover"
                />
              </div>
              <input
                type="file"
                onChange={changePhotoHandler}
                className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg">About</label>
              <textarea
                rows="5"
                placeholder="Write something about your blog"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full rounded-md border border-gray-400 px-3 py-2 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-md bg-blue-600 px-4 py-3 text-white transition-colors duration-200 hover:bg-blue-700"
            >
              Post Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
