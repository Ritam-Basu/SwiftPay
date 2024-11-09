import React, { useState } from 'react';
import { Heading } from '../components/Heading';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

export function Sendpage() {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState('');
  const id = searchParams.get("id"); // Recipient ID
  const name = searchParams.get("name"); // Recipient Name

  // Handle form submission
  const handleSendMoney = async (e) => {
    e.preventDefault(); // Prevent page reload

    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/transfer",
        {
          amount: parseFloat(amount),
          to: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Transfer successful!");
      console.log(response.data);
    } catch (error) {
      console.error("Error during transfer:", error.response?.data || error.message);
      alert("Transfer failed!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <Heading title="Send Money" />
      
      {/* Recipient Info */}
      <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Sending to: <span className="text-blue-600">{name}</span>
      </p>

      {/* Amount Input Section */}
      <p className="text-xl text-gray-900 dark:text-white mb-2">Amount (in Rs)</p>
      <form className="space-y-4" onSubmit={handleSendMoney}>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter amount"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-5 py-3 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
        >
          Send Money
        </button>
      </form>
    </div>
  );
}
