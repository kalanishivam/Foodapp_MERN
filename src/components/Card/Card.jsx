import React, { useState, useRef } from 'react'
import { CartDispatchContext } from '../ContextReducer/ContextReducer';
import { useContext } from 'react';


const Card = (props) => {
    const priceRef = useRef();
    // let data = useCart();
    // let bcd = useDispatch();
    let abc = useContext(CartDispatchContext);
    // let data = useContext(CartStateContext);

    let options = Object.keys(props.options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("")

    const handleAddtoCart = () => {
        abc.useDispatch({
            type: 'ADD',
            id: props.foodItem._id,
            name: props.foodItem.name,
            price : finalPrice,
            qty: qty,
            size: size,
        });
        console.log(abc.currValue);
    };
    // useEffect(() => {
    //     if (process.env.NODE_ENV === 'development') {
    //       console.log('Updated State:', abc.currValue);
    //     }
    //   }, [abc.currValue]);
    
    let finalPrice = qty * parseInt(options[size]);
    // useEffect(() => {
    //     setSize(priceRef.current.value)
    // }, [])
    // console.log(finalPrice)
    return (
        <div className="card mt-4" style={{ "width": "18rem", "maxHeight": "450px" }}>
            <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ "height": "160px" }} />
            <div className="card-body">
                <h5 className="card-title">{props.foodItem.name}</h5>
                <p className="card-text">{props.CategoryName}</p>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}

                <div className='container'>
                    <select className='m-2 h-100'  onChange={(e) => { setQty(e.target.value) }}>
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}> {i + 1} </option>
                            )
                        })}
                    </select>
                    <select className='m-2 h-100 rounded' ref={priceRef} onChange={(e) => { setSize(e.target.value) }}>
                        return(
                        {options.map((data) => {
                            return <option key={data} value={data}>{data}</option>
                        })}
                        )
                    </select>
                    <div className='d-flex h-100 fs-6'>
                        ₹{finalPrice}
                    </div>
                </div>
                <hr />
                <button className='btn btn-primary justify-center' onClick={handleAddtoCart}>Add to Cart</button>
            </div>
        </div>
    )
}

export default Card