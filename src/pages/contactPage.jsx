
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
        import.meta.env.VITE_BACKEND_URL + "/api/users/contact", // ✅ FIXED URL
        form
      );

      if (res.data.success) {
        setStatus("success");
        toast.success("Message sent successfully ✅");

        setForm({
          name: "",
          email: "",
          message: "",
        });
      }

    } catch (error) {
      console.error(error);
      setStatus("error");
      toast.error("Failed to send message ❌");
    }
  }

  return (
    <div className="w-full min-h-full px-4 py-12 font-sans">

      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-pink-400 text-sm font-semibold tracking-widest uppercase mb-2">
          Get in touch
        </p>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Contact Us</h1>
        <p className="text-gray-500 max-w-md mx-auto text-sm">
          Have a question or need help? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Info */}
        <div className="flex flex-col gap-6 justify-center">
          {[
            { label: "Email", value: "hello@beautyshop.com" },
            { label: "Phone", value: "+1 (555) 123-4567" },
            { label: "Address", value: "123 Rose St, Beauty City" },
            { label: "Hours", value: "Mon - Fri, 9am - 6pm" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-pink-400 text-xs font-semibold uppercase mb-1">
                {item.label}
              </p>
              <p className="text-gray-700 font-medium">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-pink-50 rounded-2xl p-8">

          {status === "success" ? (
            <div className="text-center py-8">
              <p className="text-pink-500 font-bold text-xl mb-2">
                Message Sent!
              </p>
              <button
                onClick={() => setStatus(null)}
                className="mt-6 text-pink-400 text-sm underline"
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
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full h-[42px] border rounded-lg px-3"
              />

              <input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full h-[42px] border rounded-lg px-3"
              />

              <textarea
                placeholder="Your message..."
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2"
              />

              {status === "error" && (
                <p className="text-red-400 text-xs">
                  Something went wrong
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-pink-500 text-white py-3 rounded-full"
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