import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    email : {
        type : String, 
        required : true,
        unique : true
    }, 
    order_history : {
        type : Array, 
        required : true
    }
})

const orders = model("orders" , orderSchema);
export default orders;