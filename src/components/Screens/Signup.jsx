import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", location: "", password: "" });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, location: credentials.location, email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        console.log(json);
        if(!json.success){
            alert("enter valid details");
        }

    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <div className='container'>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} autoComplete="on" />
                </div>
                <div className="mb-3">
                    <label htmlFor="Loaction" className="form-label">Location</label>
                    <input type="text" className="form-control" name='location' value={credentials.location} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to='/login' className=" m-3 btn btn-danger">Already a user</Link>
            </form>

        </div>
    )
}

export default Signup