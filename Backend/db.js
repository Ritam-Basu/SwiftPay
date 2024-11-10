const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Define User schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Define Account schema
const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    },
    balance: {
        type: Number,
        
    }
});
// const transactionSchema = new mongoose.Schema({
//     senderId: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User', 
//         required: true
//      },
//     recipientId: { 
//         type: mongoose.Schema.Types.ObjectId,
//          ref: 'User', 
//          required: true
//          },
        
//     amount: { 
//         type: Number,
//          required: true 
//         },
//     status: { type: String, enum: ['Success', 'Failed'], default: 'Success' },
//     timestamp: { type: Date, default: Date.now },
//   });
const transactionSchema = new mongoose.Schema({
    senderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    senderName: { 
        type: String, 
        required: true 
    },
    recipientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    recipientName: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Success', 'Failed'], 
        default: 'Success' 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
});


// Define models
const User = mongoose.model('user', UserSchema);
const Account = mongoose.model('account', AccountSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {
    User,
    Account,
    Transaction,
};
