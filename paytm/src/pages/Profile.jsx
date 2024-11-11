import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Heading } from '../components/Heading';
import { useNavigate } from 'react-router-dom';



export function Profile() {
  const [profile, setProfile] = useState({ username: '', firstname: '', lastname: '' });
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Decode the token
      // Fetch the user's profile with the token in the header
      const response = await axios.get(`http://localhost:3001/api/v1/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      console.log("Profile data:", response.data);
      setProfile(response.data.user);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-2xl max-w-4xl mx-auto mt-8">
      <Heading title="Profile" />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Profile Information</h2>
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium text-gray-700">Username</p>
            <p className="text-lg text-gray-800">{profile.username}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium text-gray-700">First Name</p>
            <p className="text-lg text-gray-800">{profile.firstname}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium text-gray-700">Last Name</p>
            <p className="text-lg text-gray-800">{profile.lastname}</p>
          </div>
        </div>
        <div className="mt-8">
          <button 
           onClick={() => navigate("/update")}
          className="w-full md:w-auto py-3 px-6 bg-emerald-600 text-white rounded-md shadow-lg hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500 transition-all">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
  
  
}
