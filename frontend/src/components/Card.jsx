import React, { useContext } from 'react'
import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { CartDispatchContext, CartStateContext } from './ContextReducer';

const Card = ({names, images, desc, price , ingredients}) => {
    const dispatchContext  = useContext(CartDispatchContext);
    // const stateContext = useContext(CartStateContext);
   
    const [quantity , setQuantity] = useState(1);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [openIngredient, setOpenIngredient] = useState(false);


    const handleClick = (action)=>{
        if (action === "add") {
            setQuantity(quantity + 1);
          } else if (action === "subtract" && quantity > 1) {
            setQuantity(quantity - 1);
          }
    }
    
const openDialog = ()=>{
  setDialogOpen(true);
}

const handleIngre  = ()=>{
  setOpenIngredient(true)
}


const handleAddtoCart = async ()=>{
 await dispatchContext({type : "ADD" , price : price, qty : quantity, name : names })
}

// useEffect(()=>{
//   console.log(stateContext);
//   if(stateContext.length >=1){
//   console.log(`name is ${stateContext[stateContext.length-1].name}`)
//   }
//   console.log(`total items are ${stateContext.length}`)
// }, [stateContext])
  return (
    <div>
    <div className="card mt-3" style={{"width": "18rem", "maxHeight" :"310px", "minHeight" : "310px"}}>
<img src={images} className="card-img-top" alt="..."  height='100px' style={{objectFit : "contain"}}/>
<div className="card-body">
<h5 className="card-title">{names}</h5>
<p className="card-text">
  <button className="btn btn-primary" onClick={openDialog}>Show Descrition</button>
 
</p>
{isDialogOpen && (
    <div>
   <Modal show={isDialogOpen} onHide={()=>{setDialogOpen(false)}} centered>
            <Modal.Header closeButton>
              <Modal.Title>Item Description</Modal.Title>
            </Modal.Header>
            <Modal.Body>{desc}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>{setDialogOpen(false)}}>
                Close
              </Button>
              <Button  onClick = {handleIngre}variant="primary">See Ingredients</Button>
            </Modal.Footer>
          </Modal>
          {openIngredient && (
    <div>
      <Modal show={isDialogOpen} onHide={()=>{setOpenIngredient(false)}} centered>
            <Modal.Header closeButton>
              <Modal.Title>Item Description</Modal.Title>
            </Modal.Header>
            <Modal.Body>{ingredients.map((data)=>{
              return(
                <div>
                  <ul>
                    <li>{data.name}</li>
                  </ul>
                  <img  src={data.img} alt='food_image'/>
                </div>
              )
            })}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={()=>{setOpenIngredient(false)}}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
    </div>
  )}
    </div>
  )}

<div style={{"display" : "flex", "alignItems" : "center" , "gap" : "10px"}}>
    <button className="btn btn-primary" onClick={()=>handleClick("subtract")}>-</button>
    <p className='fs-5' style={{position : "relative", top : "7px"}}>{ quantity }</p>
    <button className="btn btn-primary" onClick={()=>handleClick("add")}>+</button>
    <button className = ' btn btn-primary' onClick={handleAddtoCart}>Add to Cart</button>
    
</div>

<p className='fs-5'>Price: {price*quantity}$</p>
</div>
</div>
    </div>
  )
}

export default Card