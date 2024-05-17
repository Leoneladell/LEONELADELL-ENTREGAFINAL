import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product, onProductClick }) {
  console.log("Producto en ProductCard:", product); 

  const handleProductClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <div className="max-w-xs rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
      <img
        src={product.image}
        alt={product.name}
        className="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500"
        onClick={handleProductClick}
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          {product.name && ( 
            <h2 
              className="text-3xl font-semibold tracking-wide cursor-pointer"
              onClick={handleProductClick}
            >
              {product.name}
            </h2>
          )}
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
  );
}

export default ProductCard;

