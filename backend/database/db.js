import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

// const URI = process.env.URI
const URI = process.env.DB_URI;

const connecttoDb = async ()=>{
    try{
        await mongoose.connect(URI);
        console.log("connected to the database");
    }catch(error){
        console.log(`error in connect to database: ${error.message}`)
    }

}


export default connecttoDb