import user from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import orders from "../models/Orders.js";
import dotenv from 'dotenv'
dotenv.config();
const jwt_secret = process.env.JWT_SECRET;


export const createuser = async (req, res) => {
    try {
        const { name, email, password, location } = req.body;
        
        const existingUser = await user.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const  salt = await bcrypt.genSalt(10);
        const hashedPassword= await  bcrypt.hash(password , salt);
        const newUser = await user.create({
            name: name,
            email: email,
            password: hashedPassword,
            location: location
        });
        const payload = {
            userPayload:{
               id: newUser._id
            }
        }
        const authToken = jwt.sign(payload , jwt_secret);
        return res.json({ success: true ,  authToken: authToken , userEmail : newUser.email});
    } catch (error) {
        console.log(`error in createuser : ${error.message}`)
        res.json({ error: "error creating user" })
    }
}



export const loginUser = async(req,res)=>{
    try{
        const {email, password} = req.body;
        const userFind = await user.findOne({email});
        if(!userFind){
            return res.status(400).json({error : "INVALID USER CREDITIONALS"});
        }
        const passwordCompare = await bcrypt.compare(password , userFind.password);
        if(!passwordCompare){
            return res.status(400).json({error : "INVALID USER CREDITIONALS"});
        }else{
            const payload = {
                userPayload:{
                    id: userFind._id
                }
            }
            const authToken = jwt.sign(payload , jwt_secret);
            return res.json({ success: true, authToken: authToken , userEmail : userFind.email });  
        }
    }catch(error){
        console.log(`error in loginuser backend ${error.message}`)
    }
}



export const checkoutUser = async (req, res)=>{
    const {order, email} = req.body;
    
try{    
   const all_orders =  await orders.findOne({email});

   if(!all_orders){
    const newOrder = await orders.create({
        email : email, 
        order_history : orders
    });
    res.status(200).json({message : "THANK YOU FOR CHOOSING US!" })
   }else{
    all_orders.order_history.push(order);
    await all_orders.save();
    res.status(200).json({message : "ORDER SUCCESSFULLY PLACED"})
   }

    
}catch(error){
    console.log(`error in backend in checkout user : ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
}
}


export const showOrder = async (req,res)=>{
    const {email} = req.query;
    if(!email){
        return res.status(404).json({message : " error no email found"})
    }
    try{
        const exists = await orders.findOne({email})

        if(!exists){
            res.status(200).json({message : "NO ORDERS SO FAR!"})
        }else{
            res.status(200).json({allOrders : exists.order_history});
        }
    }catch(error){  
        console.log(`error in show orders in the backend :  ${error.message}`)
        res.status(500).json({error : 'INTERNAL SERVER ERROR'})
    }
}