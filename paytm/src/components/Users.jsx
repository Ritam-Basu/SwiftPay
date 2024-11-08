import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from './User';

export function Users() {
  const [users, setUsers] = useState([]); // Store all users
  const [filteredUsers, setFilteredUsers] = useState([]); // Store filtered users
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Fetch all users when the component mounts
    axios.get(`http://localhost:3001/api/v1/user/bulk`)
      .then(response => {
        console.log(response.data); // Debugging: check what data looks like
        setUsers(response.data.users); // Assuming the response has users array
        setFilteredUsers(response.data.users); // Set initial filtered users to all users
      })
      .catch(error => {
        console.error("Error fetching users:", error); // Handle errors
      });
  }, []); // Run only once on component mount

  useEffect(() => {
    // Filter users based on the search input
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredUsers(filtered); // Update the filtered users
  }, [filter, users]); // Run whenever the filter or users change

  return (
    <>
      <div>
        <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
          <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Users</label>
          <div className="relative">
            <input
              type="search"
              id="search"
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search user"
              required
            />
            
          </div>
        </form>
      </div>
      <div>
        {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <User key={user.username} user={user} /> // Use `username` as a unique key
          ))
        ) : (
          <p>No users found</p> // Message if no users match the filter
        )}
      </div>
    </>
  );
}
