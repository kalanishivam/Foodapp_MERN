import React, { useContext, useReducer } from "react";
import { createContext } from "react";

// export let CartStateContext = createContext();
export let CartDispatchContext = createContext();
const initialState = [];

const reducer  = (state, action) =>{
    switch(action.type){
        case 'ADD':
            return [
                ...state,
                { id: action.id, name: action.name, qty: action.qty, size: action.size, price : action.price },
              ];
        default:
            console.log("Unhandled action type:", action.type);
            return state;
    }
}

export const CartProvider = ({children}) =>{

    const [state, dispatch] = useReducer(reducer , initialState )
    return (
<CartDispatchContext.Provider value={{useDispatch: dispatch, currValue: state}}>
{/* <CartStateContext.Provider value = {state}> */}
    {children}
{/* </CartStateContext.Provider> */}

</CartDispatchContext.Provider>
        
    )
}

// export const useCart = ()=>{useContext(CartStateContext)};
// export const useDispatch = ()=>{useContext(CartDispatchContext)};