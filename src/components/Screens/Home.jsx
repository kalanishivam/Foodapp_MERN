import React, { useState, useEffect } from 'react'
import Card from '../Card/Card'
import food_img from '../Assets/Display_img/food_img1.jpg'
import food_img2 from '../Assets/Display_img/food_img_2.png'
import food_img3 from '../Assets/Display_img/food_img3.jpg'


const Home = () => {

    const [foodcat, setFoodcat] = useState([]);
    const [fooditem, setFooditem] = useState([]);
    const [search, setSearch] = useState('');

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/fooddata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response = await response.json();
        // console.log(response[0], response[1])
        setFooditem(response[0]);
        setFoodcat(response[1]);
    }

    useEffect(() => {
        loadData();
    }, [])


    return (

        <div>
         <div className='bg-light bg-gradient' >
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        {/* style={{"height" : "40vh" , "alignItems" : "center" , "width" : "75%" , "marginBottom" : "20px"}} */}
        {/* <div className='carousel-caption' style={{"zIndex" : "10"}}>
        <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
        </div> */}
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner " style={{"filter" : "brightness(20%)" , "maxHeight" : "550px" , "margin" : "auto" , "objectFit" : "contain !important"}}> 
  <div className='carousel-caption' style={{"zIndex" : "10"}}>
        <div className="d-flex justify-content-center">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"  value={search} onChange={(e)=>{setSearch(e.target.value)}} />
      </div>
        </div>
        {/* line 20 - 25 and7-13 are same and need to be taken care of  */}
    <div className="carousel-item active">
      <img src= {food_img} className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src={food_img2}  className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item">
      <img src={food_img3} className="d-block w-100" alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>

            <div className='container'>
                {foodcat != [] ? foodcat.map((data) => {
                    return (<div className='row mb-3'>
                        <div key = {data._id} className='fs-3 m-3'>
                            {data.CategoryName}
                        </div>
                        <hr />
                        {fooditem != [] ? fooditem.filter((item) => {
                            return (item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                        }).map((filtereditems => {
                            return <div key = {filtereditems._id} className='col-12 col-md-6 col-lg-3'>
                                <Card foodItem = {filtereditems} options = {filtereditems.options[0]}  CategoryName = {filtereditems.CategoryName}/>
                            </div>
                        })) : <div></div>}
                    </div>

                    )
                }) : <div></div>}
            </div>
        </div>
    )
}

export default Home