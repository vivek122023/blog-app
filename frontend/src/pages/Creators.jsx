import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Creators() {
  const [creators, setCreators] = useState([]);
  console.log(creators);
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get('http://localhost:4001/api/users/admins', {
          withCredentials: true,
        });
        setCreators(data.admins);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCreators();
  }, []);

  return (
    <div className="my-12 flex flex-wrap items-center justify-center bg-gray-100">
      {creators.map((creator) => (
        <div
          key={creator._id}
          className="m-2 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-lg"
        >
          <div className="relative">
            <img src={creator.photo.url} alt="avatar" className="h-32 w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 translate-y-1/2 transform">
              <img
                src={creator.photo.url}
                alt="avatar"
                className="mx-auto h-16 w-16 rounded-full border-4 border-gray-700"
              />
            </div>
          </div>
          <div className="mt-4 px-4 py-6">
            <h2 className="text-center text-xl font-semibold text-gray-800">{creator.name}</h2>
            <p className="mt-2 text-center text-gray-600">{creator.email}</p>
            <p className="mt-2 text-center text-gray-600">{creator.phone}</p>
            <p className="mt-2 text-center text-gray-600">{creator.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Creators;
