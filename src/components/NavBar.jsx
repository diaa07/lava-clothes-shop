import React, { useContext, useState } from "react";
import "./NavBar.css";
import { CartContext } from "../contexts/CartContext";
import { FavouritesContext } from "../contexts/FavouritesContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { cart } = useContext(CartContext);
  const { favourites } = useContext(FavouritesContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className={`${menuOpen ? "open" : ""}`}>
      <div className="nav-container">
        <div className="left-part">
          <h1
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              navigate("/");
              window.scrollTo(0, 0);
            }}
          >
            LAVA
          </h1>
        </div>

        <div className="burger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </div>

        <div className={`right-part ${menuOpen ? "show-menu" : ""}`}>
          <button
            id="Home"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              navigate("/");
              window.scrollTo(0, 0);
            }}
          >
            Home
          </button>
          <button id="Favs" onClick={() => setMenuOpen(false)}>
            Favs <div className="cntr">{favourites.length}</div>
          </button>
          <button id="Cart" onClick={() => setMenuOpen(false)}>
            Cart <div className="cntr">{cart.length}</div>
          </button>
          <button id="Me" onClick={() => setMenuOpen(false)}>
            Me
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
