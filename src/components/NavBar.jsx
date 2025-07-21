import React, { useContext } from "react";
import "./NavBar.css";
import { CartContext } from "../contexts/CartContext";
import { FavouritesContext } from "../contexts/FavouritesContext";

const NavBar = () => {
  const { cart } = useContext(CartContext);
  const { favourites } = useContext(FavouritesContext);
  return (
    <nav>
      <div className="left-part">
        <h1>LAVA</h1>
      </div>
      <div className="right-part">
        <button id="Home">Home</button>
        <button id="Favs">
          Favs <div className="cntr">{favourites.length}</div>
        </button>
        <button id="Cart">
          Cart <div className="cntr">{cart.length}</div>
        </button>
        <button id="Me">Me</button>
      </div>
    </nav>
  );
};

export default NavBar;
