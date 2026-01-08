import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

function Blogs() {
  const { blogs } = useAuth();

  console.log(blogs);
  return (
    <div>
      <div className="container mx-auto my-12 p-4">
        <h1 className="mb-6 text-2xl font-bold">All Blogs goes here!!!</h1>
        <p className="mb-8 text-center">
          The concept of gods varies widely across different cultures, religions, and belief systems
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className="relative transform overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={blog?.blogImage?.url}
                  alt={blog?.title}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-lg font-semibold">{blog?.title}</h2>
                  <p className="text-sm">{blog?.category}</p>
                </div>
              </Link>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
