import { createContext, useState, useEffect, useContext } from "react";

export const ProductsContext = createContext();
const URL = import.meta.env.VITE_API_URL;

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [topRated, setTopRated] = useState([]);
  useEffect(() => {
    const list = async () => {
      const res = await fetch(URL);
      const data = await res.json();
      setProducts(data);
    };
    list();
  }, []);

  useEffect(() => {
    setTopRated([...products].sort((a, b) => b.rating - a.rating).slice(0, 4));
    console.log("Products changed: ", products);
    console.log(topRated);
  }, [products]);

  return (
    <ProductsContext.Provider value={{ products, topRated }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
