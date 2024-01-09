import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Card from '../components/Card'

import { getFoodData } from '../services/api'




const Home = () => {
  const [foodData , setFoodData] = useState([]);

    const fetchData = async()=>{
      const data = await getFoodData();
      console.log(data);
      setFoodData(data);
    }
    useEffect(()=>{
      fetchData();
    }, [])
  return (
    <div>
        <div><NavBar/></div>
        
       
        
        <div className='row'>
          {foodData != []?  foodData.map((data)=>{
            return(
              <div className="col-12 col-md-6 col-lg-3">
                <Card  names = {data.name}  images = {data.images[0].sm} desc = {data.desc} price = {data.price} veg = {data.veg} ingredients = {data.ingredients}/>
                </div>
            )
          })  : ""}
          
        </div>
       
        <div><Footer/></div>
    </div>
  )
}

export default Home