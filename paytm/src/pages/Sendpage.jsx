import React from 'react';
import { useState } from 'react';
import { Heading } from '../components/Heading';
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
 


export  function Sendpage() {
  const [searchParams]=useSearchParams();
  const [amount,setamount]=useState(0);
  const id= searchParams.get("id");
  const name=searchParams.get("name")
  return (
    <div>
      <Heading title="Sendmoney"/>
      <p class="text-3xl text-gray-900 dark:text-white">{name}:</p>
      <p class="text-3xl font-semibold text-gray-900 dark:text-white">Amount(in Rs)</p>

<form class="max-w-sm mx-auto">
    <label for="card-number-input" class="sr-only">{name}</label>
    <div class="relative">
        <input type="text" id="card-number-input" 
        onChange={(e)=>{setamount(e.target.value)}}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter amount" pattern="^4[0-9]{12}(?:[0-9]{3})?$" required />
        <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
        </div>
    </div>
   
    <button 
    onClick={()=>{
      axios.post("http://localhost:3001/api/v1/user/transfer",{
        "amount":amount,
        "to":id
      },{
        headers:{
          Authorization:"Bearer"+localStorage.getItem("token")
        }
      })
    }}
    type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Send money</button>
</form>

    </div>
  )
}
