const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./db');

app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin" , "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept" 
    )
    next();
})

mongoDB();

app.get('/' , (req, res, next) =>{
    res.send("hello world");
    // next();
});
app.use(express.json())

app.use('/api' , require('./Routes/CreateUser'));
app.use('/api' , require('./Routes/DisplayData'));


app.listen(port , () =>{
    console.log(`listening on port ${port}`);
});