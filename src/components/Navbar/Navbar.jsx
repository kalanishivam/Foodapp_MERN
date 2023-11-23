import React from 'react'
import { Link , useNavigate } from 'react-router-dom'
// import './Navbar.css'
const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = ()=>{
    localStorage.removeItem("authToken");
    navigate("/")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <p className="navbar-brand fs-1 fst-italic">Food</p>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/">My orders</Link>
                </li>
                : ""}
            </ul>

            {(!localStorage.getItem("authToken")) ?
              <div className='d-flex'>
                <Link className="btn text-primary mx-1 bg-white " to="/login">Login</Link>


                <Link className="btn text-primary mx-1 bg-white" to="/createuser">Signup</Link>

              </div>
              : <div>
              <div className="btn text-primary mx-2 bg-white" onClick={handleClick}>Logout</div>
              <div className="btn text-primary mx-2 bg-white">MyCart</div>
              </div>}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar