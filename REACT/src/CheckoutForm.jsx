import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { app } from "../firebase";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

const db = getFirestore(app);
const ordersCollection = collection(db, "Orders");

function CheckoutForm() {
  const { cart, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    confirmEmail: ""
  });
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);

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
        total: calculateTotal(cart),
        createdAt: Timestamp.now(),
        status: "generada"
      };
      const docRef = await addDoc(ordersCollection, orderData);
      setOrderId(docRef.id);
      clearCart();
    } catch (error) {
      console.error("Error creating order:", error);
      setError("Error al procesar la orden. Por favor, inténtelo de nuevo más tarde.");
    }
  };

  const calculateTotal = (cart) => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Nombre"
        className="block mb-2"
        required
      />
      

      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
        Finalizar compra
      </button>

      {orderId && <p>Tu orden ha sido procesada. ID: {orderId}</p>}
      {error && <p>Error: {error}</p>}
    </form>
  );
}

export default CheckoutForm;
