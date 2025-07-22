import React, { useContext, useState, useEffect } from "react";
import "./NavBar.css";
import { CartContext } from "../contexts/CartContext";
import { FavouritesContext } from "../contexts/FavouritesContext";

const NavBar = () => {
  const { cart } = useContext(CartContext);
  const { favourites } = useContext(FavouritesContext);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const firstPage = document.querySelector("#first-page");
    const selectGender = document.querySelector("#gender-sec");

    if (!firstPage || !selectGender) return;

    let isFirstVisible = true;
    let isGenderVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === firstPage) {
            isFirstVisible = entry.isIntersecting;
          }
          if (entry.target === selectGender) {
            isGenderVisible = entry.isIntersecting;
          }
          setScrolled(!isFirstVisible && !isGenderVisible);
        });
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(firstPage);
    observer.observe(selectGender);

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className={`${scrolled ? "scrolled" : ""} ${menuOpen ? "open" : ""}`}>
      <div className="nav-container">
        <div
          className="left-part"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "#first-page";
            window.history.replaceState(null, null, " ");
          }}
        >
          <h1>LAVA</h1>
        </div>

        <div className="burger" onClick={toggleMenu}>
          <div className={`bar ${menuOpen ? "open" : ""}`}></div>
        </div>

        <div className={`right-part ${menuOpen ? "show-menu" : ""}`}>
          <button
            id="Home"
            onClick={(e) => {
              setMenuOpen(false);
              e.preventDefault();
              window.location.href = "#first-page";
              window.history.replaceState(null, null, " ");
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
