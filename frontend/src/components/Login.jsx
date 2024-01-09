import React, { useState } from 'react'
import { loginUser } from '../services/api';
import { useNavigate} from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [alertVisible, setAlertVisible] = useState(false);
    const [msg, setMsg] = useState();


  const handleSubmit = async ()=>{
    if(!email || !password){
      setMsg("please enter all the details")
      setAlertVisible(true);
    }else{
      let data = {
        email : email,
        password : password
      }
      const res = await loginUser(data);
      if(res && res.success){
        // console.log(`all the res files are ${res.authToken}`);
        localStorage.setItem("authToken" , res.authToken)
        localStorage.setItem("email" , res.userEmail);
        console.log(localStorage.getItem("authToken"))
        console.log(`the user id is ${localStorage.getItem("email")}`)
      navigate('/');
      }else{
        setMsg("INVALID USER CREDITIANLS!")
        setAlertVisible(true)
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
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
  </div>
</form>
  <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
    </div>
  )
}

export default Login