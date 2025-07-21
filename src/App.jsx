import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { ProductsProvider } from "./contexts/ProductsContext";
import { CartProvider } from "./contexts/CartContext";
import { FavouritesProvider } from "./contexts/FavouritesContext";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <ProductsProvider>
        <FavouritesProvider>
          <CartProvider>
            <NavBar />
            <Home />
          </CartProvider>
        </FavouritesProvider>
      </ProductsProvider>
    </>
  );
};

export default App;
