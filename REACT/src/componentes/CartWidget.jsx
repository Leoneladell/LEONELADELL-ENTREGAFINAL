import React, {useContext} from "react"
import {Link} from "react-router-dom"
import { ShoppingCart } from 'lucide-react';
import { CartContext } from "../context/CartContext";


function CartWidget(){

    const {cart}= useContext(CartContext)

    return(
        <div className="flex items-center">
            <Link to="/cart" className="flex-items-center">
            <ShoppingCart />
            <span>{cart.lengght}</span>
            </Link>
        </div>
    )
}

export default CartWidget