import React, { createContext, useReducer } from "react";

export const CartStateContext = createContext();
export const CartDispatchContext = createContext();

const reducer = (state, action)=>{
switch(action.type){
    case  "ADD" :
        return [...state, {name : action.name , price : action.price , qty : action.qty}]
    
    case "REMOVE" :
        let newarr = [...state];
        newarr.splice(action.index , 1);
        return newarr;
    case "CHECKOUT" :
        return []
    default:
        console.log("error in reducer function ")
}
}

export const CardProvider   = ({children}) =>{
    const [state, dispatch] = useReducer(reducer, []);
    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}