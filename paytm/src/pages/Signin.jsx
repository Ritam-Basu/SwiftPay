import React, { useState } from 'react';
import { Heading } from '../components/Heading';
import Subheading from '../components/Subheading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { Bottomwarning } from '../components/Bottomwarning';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message

    // Validate input fields
    if (!username || !password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/v1/user/signin', {
        username,
        password,
      });

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      console.log('User signed in successfully:', response.data.token);

      // Navigate to the dashboard upon successful signin
      navigate(`/dashboard?id=${username}`);
    } catch (error) {
      console.error('Signin failed:', error);
      setErrorMessage('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
        <Heading title="Signin" />
        <Subheading subtitle="Welcome back! Please login to SwiftPay" />

        <div className="space-y-4">
          <InputBox
            label="Username"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <InputBox
            label="Password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}

        <Button
          title={loading ? 'Signing in...' : 'Signin'}
          onClick={handleSignin}
          disabled={loading}
          className="w-full py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 focus:outline-none"
        />

        <Bottomwarning
          text="Don't have an account?"
          linktext="Signup"
          page="/signup"
          className="text-center text-sm text-gray-600 dark:text-gray-300"
        />
      </div>
    </div>
  );
}
