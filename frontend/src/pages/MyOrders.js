import React, { useEffect, useState } from 'react'
import { getOrders } from '../services/api'
import Table from 'react-bootstrap/Table';

const MyOrders = () => {
    const [orderList , setOrderList] = useState([]);
    useEffect(()=>{
        const getData = async ()=>{
        try{
            const response = await getOrders( localStorage.getItem("email"));
            setOrderList(response.allOrders);
        }catch(error){

        }
    }
    getData();
    }, [])
  return (
    <div>
    <h2>Your Orders</h2>
    {orderList.map((orders, setIndex) => (
      <div key={setIndex}>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={`order-${setIndex}-${index}`}>
                <td>{index + 1}</td>
                <td>{order.name}</td>
                <td>{order.price}</td>
                <td>{order.qty}</td>
              </tr>
            ))}
          </tbody>
        </Table>
       
      </div>
    ))}
  </div>
  )
}

export default MyOrders