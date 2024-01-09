import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../services/api';

const Signup = () => {
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const [email, setEmail] = useState();
    const [alertVisible, setAlertVisible] = useState(false);
    const [msg, setMsg] = useState();
    const navigate = useNavigate();

    const handleClick = async () => {
        // console.log("in the handle click")
        if (confirmpassword !== password) {
            setMsg("Passwords do not match")
            setAlertVisible(true)
            return;
        }
        // console.log(email, password, name);
        else if(!name || !email || !password){
            setMsg("Please fill all the details")
            return setAlertVisible(true);
        }
        else if(password.length<6){
            setMsg("passwowrd length must be greater than 6")
            setAlertVisible(true);
        }
        else{
        let data = {
            name : name,
            email : email,
            password : password,
            location : "jaipur"
        }
            const createdUser = await createUser(data);
            console.log(createUser)
            if (createdUser && createdUser.success) {
                localStorage.setItem("authToken" , createdUser.authToken)
                localStorage.setItem("email" , createUser.userEmail);
                navigate('/')
            }else{
                setMsg("error in creating user! User already exists")
            setAlertVisible(true);
            }
    }

    }
    return (

        <div>
            {alertVisible && (<div className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>{msg}</strong>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => { setAlertVisible(false) }}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>)}
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Name</label>
                    <input type="name" className="form-control" id="name" placeholder="Name" onChange={(e)=>{setName(e.target.value)}} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => {setEmail(e.target.value)}} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmpassword" placeholder="Confirm Password" onChange={(e) => {setConfirmPassword(e.target.value)}} />
                </div>

            </form>
            <button onClick={() => handleClick()} className="btn btn-primary">Submit</button>
            <Link to={'/login'} className='m-3 btn btn-danger'>Already a user</Link>
        </div>
    )
}

export default Signup