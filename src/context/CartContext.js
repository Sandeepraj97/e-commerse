import React from 'react'

const CartContext= React.createContext({
    cartList : [],
    removeCartItem:()=>{},
    addCartItem : () => {},
    deleteCartItem : () => {},
    incrementCartQuantity : () =>{},
    decrementCartQuantity : () =>{}
})
export default CartContext