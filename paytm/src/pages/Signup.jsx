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
  const [errormessage,setErrorMessage]=useState("");
  const navigate=useNavigate();

  return (
    <div>

      <Heading title="Signup" />

      <Subheading subtitle="Enter your information to get into SwiftPay" />

      <InputBox 
        label="Firstname" 
        placeholder="Enter your firstname"
        onChange={e => setFirstname(e.target.value)}
      />
      
      <InputBox 
        label="Lastname" 
        placeholder="Enter your lastname"
        onChange={e => setLastname(e.target.value)}
      />
      
      <InputBox 
        label="Username" 
        placeholder="Enter your username"
        onChange={e => setUsername(e.target.value)}
      />
      
      <InputBox 
        label="Password" 
        type="password"
        placeholder="Enter your password"
        onChange={e => setPassword(e.target.value)}
      />
      
      <Button 
  title="Signup" 
  onClick={
    async (e) => {
    e.preventDefault(); // Prevent default button behavior if it's within a form
    console.log(firstname, lastname, username, password);
    
    
    try {
      const response = await axios.post("http://localhost:3001/api/v1/user/signup", {
        firstname,
        lastname,
        username,
        password,
      });
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token); // Store token in localStorage

      // Navigate to dashboard after successful signup
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during signup:", error);
      // Optionally set error message in state to display to the user
      setErrorMessage("Signup failed. Please try again."); // Display an error message
    }
  }} 
/>


      <Bottomwarning 
        text="Already have an account?" 
        linktext="Signin" 
        page="/" 
      />
    </div>
  );
}
