import React from "react";
import "./ProductCard.css";
import { useCart } from "../contexts/CartContext";
import { useFavourites } from "../contexts/FavouritesContext";

const ProductCard = ({ product }) => {
  const { toggleCart, cart } = useCart();
  const { toggleFavourite, favourites } = useFavourites();

  const isInCart = cart.some((item) => item.id === product.id);
  const isFavourite = favourites.some((item) => item.id === product.id);

  return (
    <div className="product-card">
      <div className="product-header">
        <img src={product.image_url} alt={product.name} />
        <button
          className={`favourite-btn ${isFavourite ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavourite(product);
          }}
          aria-label={
            isFavourite ? "Remove from favourites" : "Add to favourites"
          }
        >
          ♥
        </button>
      </div>

      <div className="lower-part">
        <div className="product-info">
          <h5>{product.name}</h5>
          <div className="details">
            <div className="star">⭐ {product.rating}</div>
            <div className="price">{product.price}$</div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCart(product);
            }}
            className={isInCart ? "remove-btn" : "add-btn"}
          >
            {isInCart ? "Remove from cart" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
