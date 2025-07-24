import React from "react";
import "./ProductCard.css";
import { useCart } from "../contexts/CartContext";

const ProductCard = ({ product }) => {
  const { toggleCart, cart } = useCart();
  const isInCart = cart.some((item) => item.id === product.id);

  const handleClick = () => {
    toggleCart(product);
  };

  return (
    <div className="product-card">
      <img src={product.image_url} alt={product.name} />
      <div className="lower-part">
        <div className="product-info">
          <h5>{product.name}</h5>
          <div className="details">
            <div className="star">⭐ {product.rating}</div>
            <div className="price">{product.price}$</div>
          </div>
          <button
            onClick={handleClick}
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
