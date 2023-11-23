import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Screens/Home';
import Login from './components/Screens/Login';
import Footer from './components/Footer/Footer';

import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import Signup from './components/Screens/Signup';
import { CartProvider } from './components/ContextReducer/ContextReducer';

function App() {
  return (
    <React.StrictMode>
    <CartProvider>
    <BrowserRouter>
    <div>
      <Navbar />
      
      <Routes>
      <Route exact path='/' element = {<Home />} />
      <Route exact path='/login' element = {<Login />} />
      <Route exact path = '/createuser' element = {<Signup />} />
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
     </CartProvider>
     </React.StrictMode>
  );
}

export default App;
