import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { app } from "../firebase";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { CartContext } from "../context/CartContext";

const db = getFirestore(app);
const productosCollection = collection(db, "Productos");

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const { id } = useParams();
  const { cart, addToCart, updateCartQuantity, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(productosCollection, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError("El producto no existe.");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Error al cargar el producto. Por favor, inténtelo de nuevo más tarde.");
      }
    };
    fetchProduct();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Cargando...</div>;
  }

  const handleAddToCart = () => {
    const productInCart = cart.find(item => item.id === product.id);
    if (productInCart) {
      updateCartQuantity(product.id, 1);
    } else {
      addToCart({ ...product, quantity: 1 });
    }
  };

  const handleRemoveFromCart = () => {
    const productInCart = cart.find(item => item.id === product.id);
    if (productInCart && productInCart.quantity > 1) {
      updateCartQuantity(product.id, -1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
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

          <div className="mb-4">
            <label htmlFor="customSelect" className="block text-lg font-medium dark:text-gray-300">Aroma</label>
            <select
              id="customSelect"
              value={selectedOption}
              onChange={handleSelectChange}
              className="mt-2 block w-full p-2 bg-gray-200 rounded dark:text-gray-300"
            >
              <option value="option1">Orange-Pepper</option>
              <option value="option2">Watermelon</option>
              <option value="option3">Cedro-Verbena</option>
            </select>
          </div>

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
