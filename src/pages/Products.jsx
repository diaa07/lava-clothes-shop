import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext";
import ProductCard from "../components/ProductCard";
import "./Products.css";

const Products = () => {
  const { property, value } = useParams();
  const { products } = useProducts();

  const [groupedProducts, setGroupedProducts] = useState({});
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product[property]?.toString().toLowerCase() === value.toLowerCase()
    );

    if (property === "category") {
      const byGender = filtered.reduce((acc, product) => {
        const genderKey = product.gender || "unknown";
        if (!acc[genderKey]) acc[genderKey] = [];
        acc[genderKey].push(product);
        return acc;
      }, {});
      setGroupedProducts(byGender);
    } else if (property === "gender") {
      const byCategory = filtered.reduce((acc, product) => {
        const categoryKey = product.category || "unknown";
        if (!acc[categoryKey]) acc[categoryKey] = [];
        acc[categoryKey].push(product);
        return acc;
      }, {});
      setGroupedProducts(byCategory);
    } else {
      setGroupedProducts({ all: filtered });
    }
  }, [products, property, value]);

  return (
    <div className="Products-page">
      <h2>{value}</h2>

      {Object.entries(groupedProducts).map(([groupName, prods]) => (
        <div key={groupName} className="product-group">
          <h3 style={{ textTransform: "capitalize" }}>{groupName}</h3>
          <div className="products-holder">
            {prods.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
