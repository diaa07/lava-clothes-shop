import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card" key={product.id}>
      <img src={product.image_url} alt={product.name} />
      <div className="lower-part">
        <div className="product-info">
          <h5>{product.name}</h5>
          <div className="details">
            <div className="star">⭐ {product.rating}</div>
            <div className="price">{product.price}$</div>
          </div>
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
