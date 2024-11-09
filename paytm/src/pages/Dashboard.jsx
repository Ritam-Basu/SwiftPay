import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Heading } from '../components/Heading';
import { Dashboardinput } from '../components/Dashboardinput';
import { Users } from '../components/Users';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  // Fetch balance on component mount
  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/v1/user/balance", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    getBalance();
  }, []); // Add an empty dependency array to run only once

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
        <Heading title="Dashboard" />

        {/* Buttons with spacing and styling */}
        <div className="flex space-x-4 mb-6 justify-center">
  <button
    onClick={() => navigate("/profile")}
    className="w-full md:w-auto py-3 px-6 bg-emerald-500 text-white rounded-md shadow-md hover:bg-emerald-600 transition-colors"
  >
    Profile
  </button>

  <button
    onClick={() => navigate("/update")}
    className="w-full md:w-auto py-3 px-6 bg-amber-500 text-white rounded-md shadow-md hover:bg-amber-600 transition-colors"
  >
    Update
  </button>
</div>


        {/* Display balance with margin for spacing */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Balance: Rs {Math.round(balance)}
        </h2>

        {/* Users Component */}
        <Users />
      </div>
    </div>
  );
}
