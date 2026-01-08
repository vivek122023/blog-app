import axios from "axios";
import React, { useEffect, useState } from "react";

function Creator() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data } = await axios.get(
        "http://localhost:4001/api/users/admins",
        { withCredentials: true }
      );
      setAdmin(data.admins);
    };
    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">
        Popular Creators
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-5">
        {admin?.slice(0, 4).map((element) => (
          <div
            key={element._id}
            className="flex flex-col items-center"
          >
            {/* FIXED CIRCLE */}
            <div
              className="
                w-56 h-56
                md:w-56 md:h-56
                rounded-full
                overflow-hidden
                border
                border-black
                flex
                items-center
                justify-center
              "
            >
              <img
                src={element.photo.url}
                alt={element.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* TEXT */}
            <div className="text-center mt-3">
              <p>{element.name}</p>
              <p className="text-gray-600 text-xs">
                {element.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Creator;
