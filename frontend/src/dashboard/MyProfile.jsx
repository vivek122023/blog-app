import React from 'react';
import { useAuth } from '../context/AuthProvider';

function MyProfile() {
  const { profile } = useAuth();
  console.log(profile);
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-lg sm:max-w-sm md:max-w-md lg:max-w-lg">
          <div className="relative">
            <img src={profile?.photo?.url} alt="avatar" className="h-48 w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 translate-y-1/2 transform">
              <img
                src={profile?.photo?.url}
                alt="avatar"
                className="mx-auto h-24 w-24 rounded-full border-4 border-gray-700"
              />
            </div>
          </div>
          <div className="mt-2 px-6 py-8">
            <h2 className="text-center text-2xl font-semibold text-gray-800">{profile?.name}</h2>
            <p className="mt-2 text-center text-gray-600">{profile?.email}</p>
            <p className="mt-2 text-center text-gray-600">{profile?.phone}</p>
            <p className="mt-2 text-center text-gray-600">{profile?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
