import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import { CartStateContext } from './ContextReducer';

const NavBar = () => {
  const [itemLength, setitemLength] = useState(0);
  const stateContext = useContext(CartStateContext);
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    navigate('/')
  }
  useEffect(()=>{
    setitemLength(stateContext.length)
  }, [stateContext.length])

  const goToCart = ()=>{
    navigate('/mycart')
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-italic" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        {(localStorage.getItem("authToken"))?
        <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/myorders">My orders</Link>
        {/* <p>{localStorage.getItem("authToken")}</p> */}
      </li>
        :""}
      </ul>
    </div>
      {(!localStorage.getItem("authToken"))?
    <div className='d-flex'>
    <Link className='btn  text-white mx-1'  to="/signup">Signup</Link>
    <Link className='btn  text-white mx-1'  to="/login">Login</Link>
    </div> : 
    <div>
      {/* <Link className='btn text-white ' to = "/mycart">My Cart</Link> */}
      
        <buton className='btn   text-white ' onClick = {goToCart}><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg>
          <Badge pill bg = 'danger'>{itemLength}</Badge>
        </buton>
        
    <button className='btn  text-white ' onClick={handleLogout}>Logout</button>
    </div>}
  </div>
</nav>
    </div>
  )
}

export default NavBar