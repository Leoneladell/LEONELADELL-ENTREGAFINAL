import React, { useState, useEffect } from "react";
import ProductList from "../componentes/ProductList";
import { app } from "../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(app);
const productosCollection = collection(db, "Productos");

function Productos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(productosCollection);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products from Firestore:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {loading && <p>Cargando productos...</p>}
      {error && <p>Error al cargar productos: {error.message}</p>}
      {(!loading && !error) && <ProductList products={products} />}
    </div>
  );
}

export default Productos;

