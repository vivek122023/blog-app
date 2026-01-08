import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get('http://localhost:4001/api/blogs/my-blogs', {
          withCredentials: true,
        });
        console.log(data.blogs);
        setMyBlogs(data.blogs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:4001/api/blogs/delete-blog/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message || 'Blog deleted successfully');
        navigateTo('/');

        setMyBlogs((value) => value.filter((blog) => blog._id !== id));
      })
      .catch((error) => {
        toast.error(error.response.message || 'Failed to delete blog');
      });
  };
  return (
    <div>
      <div className="container mx-auto my-12 p-4">
        <div className="grid gap-6 md:ml-20 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {myBlogs && myBlogs.length > 0 ? (
            myBlogs.map((element) => (
              <div className="overflow-hidden rounded-lg bg-white shadow-lg" key={element._id}>
                {element?.blogImage && (
                  <img
                    src={element?.blogImage?.url}
                    alt="blogImg"
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-4">
                  <span className="text-sm text-gray-600">{element?.category}</span>
                  <h4 className="my-2 text-xl font-semibold">{element?.title}</h4>
                  <div className="mt-4 flex justify-between">
                    <Link
                      to={`/blog/update/${element?._id}`}
                      className="rounded-md border border-gray-400 bg-white px-3 py-1 text-blue-500 shadow-lg hover:underline"
                    >
                      UPDATE
                    </Link>
                    <button
                      onClick={() => handleDelete(element?._id)}
                      className="rounded-md border border-gray-400 bg-white px-3 py-1 text-red-500 shadow-lg hover:underline"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">You have not posted any blog to see!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBlogs;
