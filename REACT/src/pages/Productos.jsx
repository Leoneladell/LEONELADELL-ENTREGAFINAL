import React, { useState, useEffect } from "react";
import ProductList from "../componentes/ProductList";


function Productos() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("./productos.json");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}

export default Productos;