import React, {createContext, useState} from "react"

export const CartContext=createContext()

export const CartProvider =({children}) =>{
    const [cart, setCart]=useState([])

    const addToCart=(product)=>{
        setCart((prevCart)=>[...prevCart, product])
    }

    const removeFromCart=(productId)=>{
        setCart((prevCart)=>{
            const index =prevCart.findIndex(item=>item.id === productId)
            if (index !== -1){
                const newCart= [...prevCart]
                newCart.splice(index, 1)
                return newCart
            }
                return prevCart
            })
    }

    const clearCart=()=>{
        setCart([])
    }

return (
    <CartContext.Provider value={{cart, addToCart,removeFromCart,clearCart}}>
        {children}
    </CartContext.Provider>
)

}
