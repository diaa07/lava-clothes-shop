import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const toggleCart = (product) => {
    setCart((prev) => {
      prev.find((p) => {
        p.id === product.id;
      })
        ? prev.filter((p) => {
            p.id !== product.id;
          })
        : [...prev, product];
    });
  };
  return (
    <CartContext.Provider value={{ toggleCart, cart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
