import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Heading } from '../components/Heading';
import { Dashboardinput } from '../components/Dashboardinput';
import { Users } from '../components/Users';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const [balance, setBalance] = useState(0);
  const navigate=useNavigate();

  // Fetch balance on component mount
  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/v1/user/balance", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    getBalance();
  }, []); // Add an empty dependency array to run only once

  return (
    <div>
      <Heading title="Dashboard" />
      <button onClick={
        () => {
          navigate("/update")

        }
      }>Update</button>
      
      <h2>Balance: Rs {Math.round(balance)}</h2>
      <Users />
    </div>
  );
}
