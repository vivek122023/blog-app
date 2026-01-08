import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import toast from "react-hot-toast";
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [blogs, setblogs] = useState({});
  console.log(blogs.adminPhoto);
  useEffect(() => {
    const fetchblogs = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/blogs/single-blog/${id}`,

          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setblogs(data.blog);
      } catch (error) {
        console.log(error);
      }
    };
    fetchblogs();
  }, [id]);
  return (
    <div>
      <div className="p-12">
        {blogs && (
          <section className="container mx-auto p-4">
            <div className="mb-4 text-xs font-bold text-blue-500 uppercase">{blogs?.category}</div>
            <h1 className="mb-6 text-4xl font-bold">{blogs?.title}</h1>
            <div className="mb-6 flex items-center">
              <img
                src={blogs.adminPhoto}
                alt="author_avatar"
                className="mr-4 h-12 w-12 rounded-full"
              />
              <p className="text-lg font-semibold">{blogs?.adminName}</p>
            </div>

            <div className="flex flex-col md:flex-row">
              {blogs?.blogImage && (
                <img
                  src={blogs?.blogImage?.url}
                  alt="mainblogsImg"
                  className="mb-6 h-[500px] w-full cursor-pointer rounded-lg border shadow-lg md:w-1/2"
                />
              )}
              <div className="w-full md:w-1/2 md:pl-6">
                <p className="mb-6 text-lg">{blogs?.about}</p>
                {/* Add more content here if needed */}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Detail;
