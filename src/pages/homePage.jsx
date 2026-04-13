

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/productCard";
import { Link } from "react-router-dom";


export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((res) => {
      setFeatured(res.data.slice(0, 4));
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full font-sans">

      {/* Hero Section */}
      <div className="w-full bg-pink-50 flex flex-col items-center justify-center py-20 px-4 text-center">
        <p className="text-pink-400 text-sm font-semibold tracking-widest uppercase mb-3">
          Welcome to our store
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Beauty Made Simple
        </h1>
        <p className="text-gray-500 text-lg max-w-md mb-8">
          Discover premium cosmetics crafted for every skin type and style.
        </p>
        <Link
          to="/products"
          className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200"
        >
          Shop Now
        </Link>
      </div>

      {/* Featured Products */}
      <div className="w-full py-14 px-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Featured Products
        </h2>
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <div className="w-full flex flex-wrap gap-[40px] justify-center items-center">
            {featured.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="border border-pink-400 text-pink-500 hover:bg-pink-50 px-8 py-3 rounded-full font-semibold transition-colors duration-200"
          >
            View All Products
          </Link>
        </div>
      </div>

      {/* Why Us Strip */}
      <div className="w-full bg-pink-50 py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { title: "100% Natural", desc: "Clean ingredients, always." },
            { title: "Free Shipping", desc: "On all orders over $50." },
            { title: "Easy Returns", desc: "30-day hassle-free returns." },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}