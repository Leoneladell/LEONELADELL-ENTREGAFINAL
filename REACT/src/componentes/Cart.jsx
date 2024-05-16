import React, {useContext} from "react"
import {CartContext} from "../context/CartContext"

function Cart(){

    const {cart, removeFromCart, clearCart}=useContext(CartContext)
    const total= cart.reduce((sum,item)=> sum + item.price, 0)
    return(
        <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Mi Carrito</h1>
        {cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <div>
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p>${item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <h2 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h2>
              <button
                onClick={clearCart}
                className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300"
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  

export default Cart