import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
            if (existingProductIndex !== -1) {
                const newCart = [...prevCart];
                newCart[existingProductIndex].quantity += 1;
                return newCart;
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const updateCartQuantity = (productId, amount) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map(item => 
                item.id === productId ? { ...item, quantity: item.quantity + amount } : item
            ).filter(item => item.quantity > 0);
            return updatedCart;
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateCartQuantity }}>
            {children}
        </CartContext.Provider>
    );
};
