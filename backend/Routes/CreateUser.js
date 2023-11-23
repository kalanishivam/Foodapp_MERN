const express = require('express');
const router = express.Router();
const User  = require('../models/Users');
const {body , validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;
router.post("/createUser" , 
body('email', 'incorrect email').isEmail(),
body('password' , 'minimum characters must be 6').isLength({min : 6}),
async(req, res) =>{
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
}

    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(req.body.password, salt);

    try{
       await User.create({
            name: req.body.name,
            location: req.body.location,
            email:req.body.email,
            password:newPass
        }).then(res.json({success : true}))
    }catch(error){
        console.log(error);
        res.json({success : false});
    }
});

router.post("/login" , 
body('email', 'incorrect email').isEmail(),
body('password', 'minimum characters must be 6').isLength({min : 6}),
async(req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    let email = req.body.email;
    let passw = req.body.password;
    try{
        let userData = await User.findOne({email});

        if(!userData){
            return res.status(400).json({errors: "try logging in with correct creditals"});
        }
        const comparePass = await bcrypt.compare(passw , userData.password);

        if(!comparePass){
            return res.status(400).json({errors: "try logging in with correct creditanls"});
        }
        const payload = {
            user :{
                id: userData.id
            }
        }
        const authToken = jwt.sign(payload, jwtSecret);
        return res.json({success:true, authToken: authToken});
    }catch(error){
        console.log(error)
        res.json({success:false})
    }
})





module.exports = router;