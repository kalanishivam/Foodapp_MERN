import express from 'express'
import connecttoDb from './database/db.js';
import userRoutes from './routes/userRoutes.js';
import displayRoutes from './routes/displayRoutes.js'
import cors from 'cors'
const app = express();
const PORT = 8000;
app.use(cors());

app.use(express.json());
connecttoDb();
app.get('/' , (req, res)=>{
    res.send("hello world");
})

app.use('/api' , userRoutes);
app.use('/api' , displayRoutes)


app.listen(PORT, ()=>{
    console.log(`server started on port ${PORT}`)
})