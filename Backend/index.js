// const express=require('express')
// const app=express()
// const cors=require('cors')
// const bodyparser=require('body-parser')
// const mainrouter=require('./routes/index')
// app.use(cors())
// app.use(express.json())

// router.use("/api/v1",mainrouter);


// app.listen(3000,()=>{
//     console.log("Server is running");
// })
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); // `body-parser` is not needed as express has its own JSON parser
const mainRouter = require('./routes/index');
const router = require('./routes/user');

app.use(cors());
app.use(express.json()); // No need for `body-parser` as `express.json()` does the job

// Use the main router for API routes
app.use("/api/v1", mainRouter);
app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
