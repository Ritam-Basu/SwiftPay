// User.js
import React from 'react';
import { useNavigate } from "react-router-dom";

export const User = ({ user }) => {
    const navigate=useNavigate();
  return (
    <div className="flex items-center justify-between p-4 mb-2 border rounded-lg shadow-sm bg-white hover:bg-gray-100 transition duration-200">
      <div className="flex items-center">
        {/* Displaying user's avatar or placeholder */}
        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold mr-4">
          {user.firstname.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{user.firstname} {user.lastname}</h2>
          {/* <p className="text-sm text-gray-600">@{user.username}</p> */}
        </div>
      </div>
      {/* Optional: Add action buttons or links here */}
      <div>
        <button 
        onClick={(e)=>{
        //   history.pushState("/send?id="+user._id+"&name="+user.firstname)
        navigate("/send?id="+user._id+ "&name="+user.firstname);
        }}
        className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200">
          Send money
        </button>
      </div>
    </div>
  );
};
