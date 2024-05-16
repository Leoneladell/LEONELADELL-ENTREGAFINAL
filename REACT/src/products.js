import productsData from "./products.json"; 


export const getProducts = () => {
  return productsData;
};


export const getProductsFromCategories = (category) => {
  return productsData.filter((product) => product.category === category);
};