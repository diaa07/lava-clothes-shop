import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { ProductsProvider } from "./contexts/ProductsContext";
import { CartProvider } from "./contexts/CartContext";
import { FavouritesProvider } from "./contexts/FavouritesContext";
import Home from "./pages/Home";
import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";

const App = () => {
  return (
    <>
      <HashRouter>
        <ProductsProvider>
          <FavouritesProvider>
            <CartProvider>
              <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/products/:property/:value"
                  element={<Products />}
                />
              </Routes>
            </CartProvider>
          </FavouritesProvider>
        </ProductsProvider>
      </HashRouter>
    </>
  );
};

export default App;
