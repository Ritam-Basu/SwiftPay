import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from './User';
import { useSearchParams } from 'react-router-dom';

export function Users() {
  const [users, setUsers] = useState([]); // Store all users
  const [filteredUsers, setFilteredUsers] = useState([]); // Store filtered users
  const [filter, setFilter] = useState("");
  const [searchParams] = useSearchParams();

  // Fetch users data from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const myUsername = searchParams.get("id");
        console.log("Query Parameter ID:", myUsername); 

        // Fetch the list of users from the backend
        const response = await axios.get(`http://localhost:3001/api/v1/user/bulk`);

        if (response.data.users) {
          // Exclude the current user based on the query parameter
          const filtered = response.data.users.filter(user => user.username !== myUsername);
          setUsers(filtered);
          setFilteredUsers(filtered);
          console.log("Filtered Users:", filtered); // Debugging log
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [searchParams]); // Run once when component mounts

  // Filter users based on the search input
  useEffect(() => {
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [filter, users]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-6">
      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={(e) => e.preventDefault()}>
          <label
            htmlFor="search"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Search Users
          </label>
          <div className="relative">
            <input
              type="search"
              id="search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
                focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search user"
            />
          </div>
        </form>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <User key={user.username} user={user} />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No users found</p>
        )}
      </div>
    </div>
  );
}
