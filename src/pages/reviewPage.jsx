import { useEffect, useState } from "react";
import axios from "axios";

const STATIC_REVIEWS = [
  { name: "Sarah K.", rating: 5, comment: "Amazing quality! My skin feels incredible.", date: "March 2025" },
  { name: "Lena M.", rating: 5, comment: "Love this brand. Fast shipping and beautiful packaging.", date: "February 2026" },
  { name: "Priya D.", rating: 4, comment: "Great products, will definitely order again!", date: "January 2025" },
  { name: "Julia R.", rating: 5, comment: "The moisturizer is my holy grail. Highly recommend.", date: "April 2025" },
  { name: "Amina B.", rating: 4, comment: "Good value for money, very happy with my purchase.", date: "March 2026" },
  { name: "Chali T.", rating: 5, comment: "Packaging is gorgeous and products work wonderfully.", date: "April 2025" },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1 mb-2">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={`text-lg ${s <= rating ? "text-accent" : "text-gray-300"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [form, setForm] = useState({ name: "", rating: 5, comment: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="w-full min-h-full px-4 py-12 bg-primary">

      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
          What people say
        </p>
        <h1 className="text-3xl font-bold text-secondary">Customer Reviews</h1>
      </div>

      {/* Reviews */}
      <div className="max-w-5xl mx-auto flex flex-wrap gap-6 justify-center mb-16">
        {STATIC_REVIEWS.map((r, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 w-[280px]"
          >
            <StarRating rating={r.rating} />
            <p className="text-secondary/70 text-sm mb-4">"{r.comment}"</p>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-secondary text-sm">{r.name}</span>
              <span className="text-secondary/40 text-xs">{r.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="max-w-lg mx-auto bg-white rounded-2xl p-8 shadow-md">
        <h2 className="text-xl font-bold text-secondary mb-6 text-center">
          Leave a Review
        </h2>

        {submitted ? (
          <p className="text-center text-accent font-semibold">
            Thank you for your review!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <input
              type="text"
              placeholder="Your name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full h-[42px] border border-gray-300 rounded-lg px-3 text-sm focus:border-accent outline-none"
            />

            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              className="w-full h-[42px] border border-gray-300 rounded-lg px-3 text-sm text-secondary focus:border-accent outline-none"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} Star{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>

            <textarea
              placeholder="Write your review..."
              required
              rows={4}
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:border-accent outline-none"
            />

            <button
              type="submit"
              className="bg-accent hover:opacity-90 text-white py-3 rounded-full font-semibold transition-all duration-200"
            >
              Submit Review
            </button>

          </form>
        )}
      </div>
    </div>
  );
}