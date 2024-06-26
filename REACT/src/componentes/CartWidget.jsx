import React, {useContext} from "react"
import {Link} from "react-router-dom"
import { ShoppingCart } from 'lucide-react';
import { CartContext } from "../context/CartContext";


function CartWidget(){

    const {cart}= useContext(CartContext)

    return(
        <div className=" relative flex items-center">
            <Link to="/cart" className=" relative flex-items-center">
            <ShoppingCart />
            {cart.length>0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {cart.length}
                </span>
            )}
            </Link>
        </div>
    )
}

export default CartWidget