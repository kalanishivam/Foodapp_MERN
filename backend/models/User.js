import {  Schema, model} from 'mongoose'

const userSchema = Schema({
    name:{
        type : String,
        require : true
    }, 
    email: {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    location : {
        type : String, 
        required : true
    },
    date :{
        type : Date,
        default : Date.now
    }
})

const user = model("Users", userSchema);
export default user;