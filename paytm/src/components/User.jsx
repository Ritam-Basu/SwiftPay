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
  
      <div>
        <button 
        type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={(e)=>{
        
        navigate("/send?id="+user.username+ "&name="+user.firstname);
        console.log(user);
        }}
        // className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
        >
          
          Send money
        </button>
      </div>
    </div>
  );
};
