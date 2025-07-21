import React from "react";
import "./Home.css";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../contexts/ProductsContext";
import womenIMG from "../assets/imgs/women.jpg";
import menIMG from "../assets/imgs/men.jpg";

const Home = () => {
  const imgs = import.meta.glob("../assets/bg/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
  });
  const images = Object.values(imgs);
  const { products, topRated } = useProducts();

  return (
    <div className="home">
      <div className="first-page" id="first-page">
        <div className="info-part">
          <h2>Welcome to Lava fashion store</h2>
          <h4>
            Discover our curated collection of fashion-forward pieces that blend
            quality, comfort, and modern design.
            <br /> Whether you're dressing for everyday vibes or a special
            moment — we're here to help you stand out effortlessly.
            <br />
          </h4>
          <button
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "#gender-sec";
              window.history.replaceState(null, null, " ");
            }}
          >
            Start your fashion journey today{" "}
            <span style={{ fontSize: "16px", fontWeight: "bolder" }}>
              &rarr;
            </span>{" "}
          </button>
        </div>
        <div className="images-holder">
          <div className="images-route">
            {[...images, ...images].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`img-${idx}`}
                className={`slider-image ${
                  idx % 2 == 0 ? "even-img" : "odd-img"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="select-gender" id="gender-sec">
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <div className="scroll-text">SCROLL DOWN</div>
        </div>
        <div className="sec left-sec">
          <img src={womenIMG} alt="" />
          <h2>LAVA women</h2>
        </div>
        <div className="sec right-sec">
          <img src={menIMG} alt="" />
          <h2>LAVA men</h2>
        </div>
      </div>
      <div className="top-items">
        <h2>Top items</h2>
        <div className="items-holder">
          {topRated.map((product, index) => {
            return (
              <div className="top-prods" key={index}>
                <ProductCard product={product} key={index} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
