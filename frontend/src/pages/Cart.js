import React, { useContext } from 'react'
import Table from 'react-bootstrap/Table';
import { CartDispatchContext, CartStateContext } from '../components/ContextReducer';
import { checkoutUser } from '../services/api';
import {useNavigate} from 'react-router-dom'

const Cart = () => {
    const stateContext = useContext(CartStateContext);
    const dispatchContext = useContext(CartDispatchContext);
    const navigate = useNavigate();
    // console.log(stateContext);
let ind = 1;
let final_price = 0;
let each_price = 0;
let final_quantity =0;
stateContext.forEach((item, index) => {
    final_price = final_price + (item.price * item.qty);
    each_price = each_price + item.price;
    final_quantity = final_quantity + item.qty;
  });


  const handleDelete = async (index)=>{
 await dispatchContext({type : "REMOVE" , index : index});
  }

const handleCheckout = async ()=>{
  console.log(localStorage.getItem("email"))
  let data = {
    email : localStorage.getItem("email"),
    order : stateContext
  }

  const checkout = await checkoutUser(data);
  console.log(checkout)

  if(checkout && checkout.message){
    await dispatchContext({type : "CHECKOUT"})
    navigate('/')
  }
}
  return (
    <div>
       <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>QUANTITY</th>
            <th>TOTAL PRICE</th>
           
          </tr>
        </thead>
        <tbody>
            
               {stateContext.map((item, index) => (
                <tr key={index}>
                    <td>{ind++}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.qty}</td>
                  <td>{item.price*item.qty}$</td>
                  <td><button onClick={()=>{handleDelete(index)}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button></td>
                </tr>
              ))
            }
          <tr>
            <td>{ind}</td>
            <td>----</td>
            <td>{each_price}</td>
            <td>{final_quantity}</td>
            <td style={{fontWeight : "700"}}>{final_price}$</td>
           
          </tr>

        </tbody>
      </Table>
      <button onClick={handleCheckout} className='btn btn-primary'>CHECKOUT</button>
    </div>
  )
}

export default Cart