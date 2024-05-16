import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../products";
import { CartContext } from "../context/CartContext";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productsData = getProducts();
        const foundProduct = productsData.find((product) => product.id.toString() === id);
        setProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };

  const cartItem = cart.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <section className="h-screen max-w-6xl mx-auto pt-40 pb-0">
      <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
        <img src={product.image} alt={product.name} className="w-full lg:w-1/2 object-cover object-center" />
        <div className="flex flex-col justify-center flex-1 p-6 bg-white dark:bg-gray-800">
          <h3 className="text-3xl font-bold">{product.name}</h3>
          <p className="my-6 dark:text-gray-300">{product.description}</p>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleRemoveFromCart}
              className="px-4 py-2 font-semibold rounded bg-red-500 text-white hover:bg-red-600 transition duration-300"
            >
              -
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button
              type="button"
              onClick={handleAddToCart}
              className="px-4 py-2 font-semibold rounded bg-teal-500 text-white hover:bg-emerald-500 transition duration-300"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;