



import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/productCard";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
      .then((res) => {
        setFeatured(res.data.slice(0, 4));
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full font-sans bg-primary">

      {/* HERO */}
      <div className="w-full flex flex-col items-center justify-center py-20 px-4 text-center bg-primary">
        <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
          Welcome to our store
        </p>

        <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
          Beauty Made Simple
        </h1>

        <p className="text-secondary/60 text-lg max-w-md mb-8">
          Discover premium cosmetics crafted for every skin type and style.
        </p>

        <Link
          to="/products"
          className="bg-accent text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-200 hover:scale-105"
        >
          Shop Now
        </Link>
      </div>

      {/* FEATURED (WHITE SECTION) */}
      <div className="w-full py-14 px-4 bg-white">
        <h2 className="text-2xl font-bold text-secondary text-center mb-8">
          Featured Products
        </h2>

        {loading ? (
          <p className="text-center text-secondary/40">Loading...</p>
        ) : (
          <div className="flex flex-wrap gap-[40px] justify-center">
            {featured.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/products"
            className="border border-accent text-accent px-8 py-3 rounded-full font-semibold hover:bg-primary transition-all duration-200"
          >
            View All Products
          </Link>
        </div>
      </div>

      {/* WHY US */}
      <div className="w-full bg-primary py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

          <div>
            <h3 className="text-lg font-bold text-secondary mb-1">100% Natural</h3>
            <p className="text-secondary/60 text-sm">Clean ingredients, always.</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-secondary mb-1">Free Shipping</h3>
            <p className="text-secondary/60 text-sm">On all orders over $50.</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-secondary mb-1">Easy Returns</h3>
            <p className="text-secondary/60 text-sm">30-day hassle-free returns.</p>
          </div>

        </div>
      </div>

    </div>
  );
}