import React, { useState } from 'react';
import { Heading } from '../components/Heading';
import Subheading from '../components/Subheading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { Bottomwarning } from '../components/Bottomwarning';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 p-6">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg space-y-6">
        {/* Heading */}
        <Heading title="Signup" className="text-center" />

        {/* Subheading */}
        <Subheading
          subtitle="Enter your information to get into SwiftPay"
          className="text-center text-gray-600 dark:text-gray-400"
        />

        {/* Error message */}
        {errormessage && (
          <p className="text-red-500 text-center mb-6">{errormessage}</p>
        )}

        {/* Firstname */}
        <div className="space-y-2">
          <InputBox
            label="Firstname"
            placeholder="Enter your firstname"
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>

        {/* Lastname */}
        <div className="space-y-2">
          <InputBox
            label="Lastname"
            placeholder="Enter your lastname"
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        {/* Username */}
        <div className="space-y-2">
          <InputBox
            label="Username"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <InputBox
            label="Password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Signup Button */}
        <Button
          title="Signup"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          onClick={async (e) => {
            e.preventDefault();
            console.log(firstname, lastname, username, password);

            try {
              const response = await axios.post(
                "http://localhost:3001/api/v1/user/signup",
                {
                  firstname,
                  lastname,
                  username,
                  password,
                }
              );

              if (response.data.token) {
                console.log("Token received:", response.data.token);
                localStorage.setItem("token", response.data.token);

                if (username) {
                  console.log("Navigating to dashboard with username:", username);
                  navigate(`/dashboard?id=${username}`);
                } else {
                  console.error("Username is undefined");
                }
              } else {
                console.error("No token received");
              }
            } catch (error) {
              console.error("Error during signup:", error);
              setErrorMessage("Signup failed. Please try again.");
            }
          }}
        />

        {/* Bottom warning */}
        <Bottomwarning
          text="Already have an account?"
          linktext="Signin"
          page="/"
          className="text-center pt-6"
        />
      </div>
    </div>
  );
}
