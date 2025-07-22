import { React, useState, useEffect } from "react";
import "./Home.css";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../contexts/ProductsContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import womenIMG from "../assets/imgs/women.jpg";
import menIMG from "../assets/imgs/men.jpg";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (gender) => {
    navigate(`/products/gender/${gender}`);
  };
  const imgs = import.meta.glob("../assets/bg/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
  });
  const images = Object.values(imgs);
  const { products, topRated } = useProducts();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [cats, setCats] = useState([]);
  useEffect(() => {
    if (products.length > 0) {
      const uniqueCats = [...new Set(products.map((p) => p.category))];
      setCats(uniqueCats);
    }
  }, [products]);

  const [catProds, setCatProds] = useState([]);

  useEffect(() => {
    if (cats.length === 0 || products.length === 0) return;

    const catImages = cats.map((cat) => {
      const matchedProduct = products.find(
        (product) => product.category === cat
      );
      return {
        category: cat,
        image: matchedProduct?.image_url || null,
      };
    });
    setCatProds(catImages);
  }, [cats, products]);

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
              const target = document.getElementById("gender-sec");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {!isMobile ? "Start your fashion journey today  " : "Shop now  "}
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
        <div className="sec left-sec" onClick={() => handleClick("women")}>
          <img src={womenIMG} alt="women" />
          <h2>LAVA women</h2>
        </div>

        <div className="sec right-sec" onClick={() => handleClick("men")}>
          <img src={menIMG} alt="men" />
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
      <div className="cats-page">
        <h2>Explore categories</h2>
        <div className="cats-container">
          {catProds.map(({ category, image }) => {
            return (
              <Link
                key={category}
                to={`/products/category/${category}`}
                className="cat-card-link"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="cat-card">
                  <img src={image} alt={category} />
                  <h4>{category}</h4>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
