const express = require('express');
const zod = require("zod");
const { User, Account,Transaction } = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = require('../config'); // If `config` exports a single string
const authMiddleware = require('../middleware/authmiddleware');
const mongoose = require('mongoose');
const router = express.Router();

const signupschema = zod.object({
    username: zod.string().min(1).max(100),
    firstname: zod.string().min(1).max(100),
    lastname: zod.string().min(1).max(100),
    password: zod.string().min(6),
});

const signinschema = zod.object({
    username: zod.string().min(1).max(100),
    password: zod.string().min(6)
});

const updateschema = zod.object({
    
    firstname: zod.string().min(1).max(100),
    lastname: zod.string().min(1).max(100),
    password: zod.string().min(6),
});

// User Signup Route
router.post("/signup", async (req, res) => {
    const response = signupschema.safeParse(req.body);

    if (!response.success) {
        return res.status(400).json({ message: "Invalid request", errors: response.error.errors });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
    }

    try {
        const dbUser = await User.create({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        });

        const dbAccount = await Account.create({
            userId: dbUser._id,
            balance: 1 + Math.random() * 10000,
        });

        const token = jwt.sign({ user_id: dbUser._id }, JWT_SECRET_KEY);
        console.log(token);
        res.json({ message: "User created successfully", token });
    } catch (error) {
        res.status(500).json({ message: "Error creating user" });
    }
});

router.post("/signin",async(req,res)=>{
    const response=signinschema.safeParse(req.body);
    console.log(response);
    
    if(!response.success){
        return res.status(400).json({message:"Invalid inout",errors:response.error.errors});
    }
    if (!response.success) {
        return res.status(400).json({ message: "Invalid input", errors: response.error.errors });
    }

    try {
        // Check if the user exists by username and password
        const user = await User.findOne({ 
            username: req.body.username, 
            password: req.body.password 
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate a JWT token with the user's ID as the payload
        const token = jwt.sign({ user_id: user._id }, JWT_SECRET_KEY, { expiresIn: '1h' });

        console.log("User signed in successfully:", req.body.username);
        res.json({ message: "User signed in successfully", token });

    } catch (err) {
        console.error("Signin error:", err);
        res.status(500).json({ message: "Server error during signin." });
    }
});


// User Update Route
router.put('/', authMiddleware, async (req, res) => {
    const { success, data } = updateschema.safeParse(req.body);
    console.log(data);

    if (!success) {
        return res.status(400).json({ message: "Invalid request" });
    }

    try {
        // Update the user data using the authenticated user's ID (`req.user_id`)
        await User.findByIdAndUpdate(req.user_id, data, { new: true });

        //  Send a success response
        res.json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating user" });
    }
});


// Bulk User Retrieval Route
router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";
    try {
        const users = await User.find({
            $or: [
                { firstname: { $regex: filter, $options: "i" } },
                { lastname: { $regex: filter, $options: "i" } }
            ]
        });

        res.json({
            users: users.map(user => ({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
            }))
        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users" });
    }
});

//profile
// Backend route to get user profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user_id).select('username firstname lastname');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: "Server error" });
    }
});


// Balance Retrieval Route
router.get("/balance", authMiddleware, async (req, res) => {
    console.log("Request received for balance");

    try {
        const account = await Account.findOne({ userId: req.user_id });
        // console.log(req.user_id);
        console.log(Account);
        console.log(User);
        
    

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        console.log("Balance:", account.balance);
        res.json({ balance: account.balance });

    } catch (err) {
        console.error("Error retrieving balance:", err);
        res.status(500).json({ message: "Error retrieving balance" });
    }
});


// // Transfer Route
// async function transfer(req, res) {
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         let { amount, to } = req.body;

//         amount = parseFloat(amount);

//         if (!amount || typeof amount !== 'number' || amount <= 0) {
//             await session.abortTransaction();
//             return res.status(400).json({ message: "Amount must be a positive number." });
//         }

//             if (!to ) {
//                     return res.status(400).json({ message: "Invalid input" });
//                 }

//         // Find sender account
//         const senderAccount = await Account.findOne({ userId: req.user_id }).session(session);
        
//         if (!senderAccount || senderAccount.balance < amount) {
//             await session.abortTransaction();
//             return res.status(400).json({ message: "Insufficient balance or sender account not found." });
//         }

//         // Find recipient account
//         const recipient = await User.findOne({ username: to }).session(session);
//         if (!recipient) {
//             await session.abortTransaction();
//             return res.status(404).json({ message: "Recipient not found" });
//         }

//         // Perform balance updates
//         await Account.updateOne(
//             { userId: req.user_id },
//             { $inc: { balance: -amount } },
//             { session }
//         );
//         await Account.updateOne(
//             { userId: recipient._id },
//             { $inc: { balance: amount } },
//             { session }
//         );

//         // Commit transaction
//         await session.commitTransaction();
//         res.json({ message: "Transfer successful" });
//     } catch (error) {
//         await session.abortTransaction();
//         console.error("Transfer Error:", error);
//         res.status(500).json({ message: "Transfer failed due to server error." });
//     } finally {
//         session.endSession();
//     }
// }

// // Add the transfer route to router
// router.post('/transfer', authMiddleware, transfer);


router.post('/transfer', authMiddleware, async (req, res) => {
    const { to, amount } = req.body;

    // Input validation
    if (!to || !amount || amount <= 0) {
        return res.status(400).json({ message: "Invalid input" });
    }

    try {
        // Get the sender's details using req.user_id from the middleware
        const sender = await User.findById(req.user_id);
        console.log(sender);
        if (!sender) {
            return res.status(404).json({ message: "Sender not found" });
        }

        // Check if sender has sufficient balance
        if (sender.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Find the recipient by username
        const recipient = await User.findOne({ username: to });
        console.log(recipient);
        if (!recipient) {
            return res.status(404).json({ message: "Recipient not found" });
        }

        
        await Account.updateOne(
            { userId: req.user_id },
            { $inc: { balance: -amount } },
        )
        await Account.updateOne(
            {userId: recipient._id},
            
            { $inc: { balance: +amount } },
        )
        const transaction = new Transaction({
            senderId: req.user_id,
            senderName: sender.username, // Store sender's name
            recipientId: recipient._id,
            recipientName: recipient.username, // Store recipient's name
            amount,
            status: 'Success',
        });

        // Save the transaction
        await transaction.save();
            

        res.json({ message: "Transfer successful" });
    } catch (err) {
        console.error('Error during transfer:', err);
        res.status(500).json({ message: "Server error" });
    }
});


router.get('/transactions', authMiddleware, async (req, res) => {
    const userId = req.user_id; // Get user ID from the middleware (already attached to req)

    try {
        // Find transactions where the user is either the sender or recipient
        const transactions = await Transaction.find({
            $or: [{ senderId: userId }, { recipientId: userId }]
        }).sort({ timestamp: -1 }); // Sort by timestamp in descending order (most recent first)

        // Return the transaction data
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Failed to fetch transaction history' });
    }
});





module.exports = router;
