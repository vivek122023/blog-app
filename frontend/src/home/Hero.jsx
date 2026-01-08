import React from 'react';
import { useAuth } from '../context/AuthProvider.jsx';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { blogs } = useAuth();
  console.log(blogs);
  return (
    <div className="container mx-auto my-10 grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-4">
      {blogs && blogs.length > 0 ? (
        blogs.slice(0, 4).map((blog) => {
          return (
            <Link
              to={`/blog/${blog._id}`}
              key={blog._id}
              className="transform overflow-hidden rounded-lg bg-white transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="group relative">
                <img src={blog.blogImage.url} alt="" className="h-57 w-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-75 transition-transform duration-300 group-hover:opacity-100"></div>
                <h1 className="absolute bottom-4 left-4 text-xl font-bold text-white transition-colors duration-300 group-hover:text-yellow-500">
                  {blog.title}
                </h1>
              </div>
              <div className="flex items-center p-6">
                <img
                  src={blog.adminPhoto}
                  alt=""
                  className="h-12 w-12 rounded-full border-2 border-yellow-400"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-800">{blog.adminName}</p>
                  <p className="text-xs text-gray-400">New</p>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="flex h-screen items-center justify-center">Loading....</div>
      )}
    </div>
  );
};

export default Hero;
