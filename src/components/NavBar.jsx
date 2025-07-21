import React, { useContext, useState, useEffect } from "react";
import "./NavBar.css";
import { CartContext } from "../contexts/CartContext";
import { FavouritesContext } from "../contexts/FavouritesContext";

const NavBar = () => {
  const { cart } = useContext(CartContext);
  const { favourites } = useContext(FavouritesContext);
  const [scrolled, setScrolled] = useState(false);

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
  return (
    <nav className={scrolled ? "scrolled" : ""}>
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
