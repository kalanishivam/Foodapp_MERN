
import './App.css';
import Login from './components/Login';
import Home from './pages/Home';
import {Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup';
import { CardProvider } from './components/ContextReducer';
import Cart from './pages/Cart';
import MyOrders from './pages/MyOrders';

function App() {
  return (
    <div>
      <CardProvider>
      <Routes>
        <Route exact path='/' element = {<Home/>} />
        <Route exact path ='/login' element = {<Login/>}/>
        <Route exact path='/signup' element = {<Signup/>} />
        <Route exact path='/mycart' element = {<Cart/>} />
        <Route exact path = 'myorders' element = {<MyOrders />}/>
      {/* <Home/> */}

      </Routes>
      </CardProvider>
    </div>
  );
}

export default App;
