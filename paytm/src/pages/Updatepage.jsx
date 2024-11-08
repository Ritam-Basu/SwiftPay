import React, { useState } from 'react';
import axios from 'axios';

export function UpdateInfo() {
  // State to manage form fields
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the request payload
    const data = {
      firstname,
      lastname,
      password,
    };

    try {
      const token = localStorage.getItem('token'); // Correctly retrieving the token

      // Send the PUT request to the backend
      const response = await axios.put(
        'http://localhost:3001/api/v1/user/',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Using the correct token
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
    <div>
      <h2>Update Information</h2>
      {message && <p>{message}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Enter first name"
          />
        </div>
        
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Enter last name"
          />
        </div>
        
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        <button type="submit">Update Info</button>
      </form>
    </div>
  );
}
