

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ContactUsPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setStatus("loading");

      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/contact",
        form
      );

      if (res.data.success) {
        setStatus("success");
        toast.success("Message sent successfully ✅");
        setForm({ name: "", email: "", message: "" });
      }
    } catch (error) {
      setStatus("error");
      toast.error("Failed to send message ❌");
    }
  }

  return (
    <div className="w-full min-h-screen px-4 py-12 bg-primary font-sans">

      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
          Get in touch
        </p>
        <h1 className="text-3xl font-bold text-secondary mb-3">Contact Us</h1>
        <p className="text-secondary/60 max-w-md mx-auto text-sm">
          Have a question or need help? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

        {/* Info */}
        <div className="flex flex-col gap-6 justify-center">
          {[
            { label: "Email", value: "hello@beautyshop.com" },
            { label: "Phone", value: "+94 77 123 4567" },
            { label: "Address", value: "Colombo, Sri Lanka" },
            { label: "Hours", value: "Mon - Fri, 9am - 6pm" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-accent text-xs font-semibold uppercase mb-1">
                {item.label}
              </p>
              <p className="text-secondary font-medium">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">

          {status === "success" ? (
            <div className="text-center py-8">
              <p className="text-accent font-bold text-xl mb-2">
                Message Sent!
              </p>
              <button
                onClick={() => setStatus(null)}
                className="mt-6 text-accent text-sm underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border rounded-lg px-3 h-[42px] focus:border-accent outline-none"
              />

              <input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border rounded-lg px-3 h-[42px] focus:border-accent outline-none"
              />

              <textarea
                rows={5}
                placeholder="Your message..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="border rounded-lg px-3 py-2 focus:border-accent outline-none"
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-accent text-white py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-200"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}