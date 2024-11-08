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
      navigate('/dashboard');
    } catch (error) {
      console.error('Signin failed:', error);
      setErrorMessage('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <Heading title="Signin" />
      <Subheading subtitle="Welcome back! Please login to SwiftPay" />

      <InputBox 
        label="Username" 
        placeholder="Enter your username"
        onChange={(e) => setUsername(e.target.value)}
      />
      
      <InputBox 
        label="Password" 
        type="password"
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
      />

      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if any */}

      <Button 
        title={loading ? 'Signing in...' : 'Signin'} 
        onClick={handleSignin}
        disabled={loading} // Disable button while loading
      />

      <Bottomwarning 
        text="Don't have an account?" 
        linktext="Signup" 
        page="/signup" 
      />
    </div>
  );
}
