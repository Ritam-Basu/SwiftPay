import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Transactionhist() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchTransactions = async () => {
        try {
        const response = await axios.get('http://localhost:3001/api/v1/user/transactions', {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` //token is in local storage
            }
        });
        setTransactions(response.data); 
        console.log(response.data) // Store the transaction data
        setLoading(false);  // Set loading to false once data is fetched
        } catch (err) {
        setError('Failed to fetch transactions');
        setLoading(false);
        }
    };

    fetchTransactions();  // Fetch transactions when the component mounts
    }, []);

    if (loading) {
    return <div>Loading...</div>;  // Display loading state while fetching data
    }

    if (error) {
    return <div>{error}</div>;  // Display error if something went wrong
    }

    return (
    <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Transaction History</h2>
        <div className="space-y-4">
        {Array.isArray(transactions) && transactions.length > 0 ? (
            transactions.map((transaction) => (
            <div
                key={transaction._id}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4"
            >
                <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Sender: {transaction.senderName}</h3>
                <span
                    className={`text-sm px-3 py-1 rounded-full ${
                    transaction.status === 'Success'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                >
                    {transaction.status}
                </span>
                </div>
                <div className="flex justify-between items-center">
                <p className="text-gray-600"> {transaction.recipientName}</p>
                <p className="text-gray-600">Amount: Rs {transaction.amount}</p>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                <p className="text-sm">{new Date(transaction.timestamp).toLocaleString()}</p>
                </div>
            </div>
            ))
        ) : (
            <div className="bg-white shadow-md rounded-lg p-6 text-center text-gray-500">
            No transactions found
            </div>
        )}
        </div>
    </div>
  );
}
