import React, { useState } from 'react';
import axios from 'axios';

export function Updatepage() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstname,
      lastname,
      password,
    };

    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(
        'http://localhost:3001/api/v1/user/',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('User info updated successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Failed to update user information.');
    }
  };

  return (
    <div className="p-8 bg-gray-50 rounded-lg shadow-2xl max-w-xl mx-auto mt-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Update Information</h2>
      {message && (
        <p
          className={`text-lg font-medium mb-4 ${
            message.includes('successfully') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <label className="block text-lg font-medium text-gray-700">First Name</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Enter first name"
            className="w-full p-3 mt-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="relative">
          <label className="block text-lg font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Enter last name"
            className="w-full p-3 mt-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="relative">
          <label className="block text-lg font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full p-3 mt-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 mt-6 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors"
        >
          Update Info
        </button>
      </form>
    </div>
  );
}
