import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SettingsAdminPage() {
  const navigate = useNavigate();

  const [store, setStore] = useState({
    name: "CBC Cosmetic Shop",
    email: "hello@cbc.lk",
    phone: "+94 77 000 0000",
    address: "Colombo, Sri Lanka",
  });

  const [notifications, setNotifications] = useState(true);
  const [currency, setCurrency] = useState("LKR");

  function handleChange(e) {
    setStore({ ...store, [e.target.name]: e.target.value });
  }

  function saveSettings() {
    toast.success("Settings saved successfully");
  }

  return (
    <div className="min-h-screen bg-[#F3E8F7] p-8 flex justify-center">

      <div className="w-full max-w-5xl space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#2C183E]">
            Store Settings
          </h1>
          <p className="text-sm text-gray-500">
            Manage your business profile and preferences
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* STORE INFO */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-lg font-semibold text-[#2C183E] mb-4">
              Store Information
            </h2>

            <div className="space-y-3">

              <input
                name="name"
                value={store.name}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2"
                placeholder="Store Name"
              />

              <input
                name="email"
                value={store.email}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2"
                placeholder="Email"
              />

              <input
                name="phone"
                value={store.phone}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2"
                placeholder="Phone"
              />

              <input
                name="address"
                value={store.address}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2"
                placeholder="Address"
              />

            </div>
          </div>

          {/* BUSINESS SETTINGS */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-lg font-semibold text-[#2C183E] mb-4">
              Business Preferences
            </h2>

            <div className="space-y-4">

              {/* Currency */}
              <div>
                <label className="text-sm text-gray-600">
                  Currency
                </label>

                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 mt-1"
                >
                  <option value="LKR">LKR (Sri Lanka)</option>
                  <option value="USD">USD</option>
                </select>
              </div>

              {/* Notifications */}
              <div className="flex items-center justify-between border p-3 rounded-xl">
                <span className="text-sm font-medium text-[#2C183E]">
                  Order Notifications
                </span>

                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="w-5 h-5 accent-[#7B3F8C]"
                />
              </div>

            </div>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <button
            onClick={() => {
              localStorage.removeItem("cart");
              toast.success("Cache cleared");
            }}
            className="bg-[#2C183E] text-white px-6 py-2 rounded-xl hover:bg-[#5a2a68]"
          >
            Clear Cart Cache
          </button>

          <button
            onClick={saveSettings}
            className="bg-[#7B3F8C] text-white px-6 py-2 rounded-xl hover:bg-[#5a2a68]"
          >
            Save Settings
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              toast.success("Logged out");
              navigate("/login");
            }}
            className="bg-[#2C183E] text-white px-6 py-2 rounded-xl hover:bg-black"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}