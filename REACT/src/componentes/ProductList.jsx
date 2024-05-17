import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { app } from "../firebase";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore(app);
const productosCollection = collection(db, "Productos");

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { id: urlId, category } = useParams();
  const [inputId, setInputId] = useState("");

  useEffect(() => {
    console.log("Fetching products...");
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(productosCollection);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
        console.log("Products fetched:", productsData);
      } catch (error) {
        console.error("Error fetching products from Firestore:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("Filtering products...");
    let filtered = [...products];

    if (category) {
      filtered = filtered.filter(product => product.category === category);
    } else if (urlId) {
      filtered = filtered.filter(product => product.id === urlId);
    }

    setFilteredProducts(filtered);
    console.log("Filtered products:", filtered);
  }, [urlId, category, products]);

  const handleInputChange = (event) => {
    setInputId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting form...");
    try {
      const q = query(productosCollection, where("id", "==", inputId.trim()));
      const querySnapshot = await getDocs(q);
      const filtered = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFilteredProducts(filtered);
      console.log("Filtered products:", filtered);
    } catch (error) {
      console.error("Error filtering products from Firestore:", error);
    }
  };

  return (
    <div className="flex pb-10 mx-10 pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
            <img
              src={product.image}
              alt=""
              className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
            />
            <div className="flex flex-col justify-between p-6 space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-wide">{product.name}</h2>
                <h3>${product.price}</h3>
              </div>
              <Link
                to={`/productdetail/${product.id}`}
                className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-violet-600 dark:text-gray-50"
              >
                Ver más
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
        <form onSubmit={handleSubmit} className="flex flex-col justify-between p-6 space-y-4">
          <label htmlFor="productId" className="text-lg font-semibold">Filtrar por ID:</label>
          <input 
            type="text" 
            id="productId" 
            value={inputId} 
            onChange={handleInputChange} 
            placeholder="Ingrese el ID"
            className="p-2 border border-gray-300 rounded-md"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">Filtrar</button>
        </form>
      </div>
    </div>
  );
}

export default ProductList;



