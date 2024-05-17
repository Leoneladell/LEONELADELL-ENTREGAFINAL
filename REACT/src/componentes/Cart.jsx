import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Trash } from "lucide-react";
import { app } from "../firebase";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const db = getFirestore(app);
const ordersCollection = collection(db, "Orders");

function Cart() {
  const { cart, removeFromCart, clearCart, updateCartQuantity } = useContext(CartContext);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    confirmEmail: ""
  });
  const [orderId, setOrderId] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        customer: formData,
        items: cart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity })),
        total: total,
        createdAt: Timestamp.now(),
        status: "generada"
      };
      const docRef = await addDoc(ordersCollection, orderData);
      setOrderId(docRef.id);
      clearCart();
     
      toast.success(`Tu compra fue procesada exitosamente. Número de orden: ${docRef.id}`);
    } catch (error) {
      console.error("Error creating order:", error);
      
    }
  };

  const handleDecreaseQuantity = (productId) => {
    const productInCart = cart.find(item => item.id === productId);
    if (productInCart.quantity > 1) {
      updateCartQuantity(productId, -1);
    } else {
      removeFromCart(productId);
    }
  };

  const handleIncreaseQuantity = (productId) => {
    updateCartQuantity(productId, 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Mi Carrito</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 mr-4" />
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecreaseQuantity(item.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.id)}
                    className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                >
                  <Trash />
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
            <button
              onClick={() => setShowForm(true)}
              className="mt-2 ml-4 px-4 py-2 bg-green-400 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Continuar
            </button>
            {showForm && (
              <form onSubmit={handleSubmit} className="mt-4 pt-10 pb-10">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Nombre"
                  className="block mb-2"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Apellido"
                  className="block mb-2"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Teléfono"
                  className="block mb-2"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="block mb-2"
                />
                <input
                  type="email"
                  name="confirmEmail"
                  value={formData.confirmEmail}
                  onChange={handleChange}
                  placeholder="Confirmar Email"
                  className="block mb-2"
                />
                <div className="Finalizar pt-5">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                  >
                    Finalizar compra
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Cart;







