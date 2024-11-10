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
class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
  >
    Profile
  </button>

  <button
    onClick={() => navigate("/update")}
    class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"

  >
    Update
  </button>
  <button
    onClick={() => navigate("/history")}
   class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
  >
    History
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
