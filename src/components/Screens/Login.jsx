import React, {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({email : "" , password: ""});

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/login", {
      method :'POST',
      headers:{
        "Content-type" : "application/json"
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})

    });
    const json = await response.json();
        console.log(json);
        if(json.success){
          localStorage.setItem("authToken" , json.authToken)
          navigate("/");
        }

        
  }

  const onChange = (event)=>{
    setCredentials({...credentials, [event.target.name] : event.target.value})
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name = 'email' value = {credentials.email} onChange={onChange} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login