// const express=require("express")

// const router=express.Router();
// const userrouter=require('./user')

// router.use('/user',userrouter)

// module.exports={router};

const express = require("express");

const router = express.Router();
const userRouter = require('./user');

// Define routes under `/user`
router.use('/user', userRouter);


module.exports = router;
