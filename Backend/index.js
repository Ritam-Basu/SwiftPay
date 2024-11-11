
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); 
const mainRouter = require('./routes/index');
const router = require('./routes/user');

app.use(cors());
app.use(express.json()); 

// Use the main router for API routes
app.use("/api/v1", mainRouter);

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
