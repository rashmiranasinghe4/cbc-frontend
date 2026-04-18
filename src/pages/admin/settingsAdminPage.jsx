import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function SettingsAdminPage() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function changePassword() {
    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/api/users/password",
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        toast.success("Password updated");
        setForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      })
      .catch(() => toast.error("Failed to update password"));
  }

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#7B3F8C]";

  return (
    <div className="w-full h-full flex flex-col items-center bg-[#F3E8F7] p-8">

      {/* TITLE */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-[#2C183E]">
          Account Settings
        </h1>
        <p className="text-sm text-gray-500">
          Manage your store security and business information
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md p-8 flex gap-8">

        {/* LEFT - PASSWORD */}
        <div className="w-1/2">
          <h2 className="text-lg font-semibold text-[#2C183E] mb-4">
            Change Password
          </h2>

          <div className="flex flex-col gap-3">
            <input
              name="currentPassword"
              type="password"
              placeholder="Current Password"
              value={form.currentPassword}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              name="newPassword"
              type="password"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={inputClass}
            />

            <button
              onClick={changePassword}
              className="bg-[#7B3F8C] text-white rounded-xl py-2 mt-2 hover:opacity-90"
            >
              Update Password
            </button>
          </div>
        </div>

        {/* RIGHT - STORE INFO */}
        <div className="w-1/2 border-l pl-8">
          <h2 className="text-lg font-semibold text-[#2C183E] mb-4">
            Store Information
          </h2>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              defaultValue="CBC Cosmetic Shop"
              className={inputClass}
              placeholder="Store Name"
            />

            <input
              type="email"
              defaultValue="hello@cbc.lk"
              className={inputClass}
              placeholder="Email"
            />

            <input
              type="text"
              defaultValue="+94 77 000 0000"
              className={inputClass}
              placeholder="Phone"
            />

            <button
              onClick={() => toast.success("Settings saved")}
              className="bg-[#7B3F8C] text-white rounded-xl py-2 mt-2 hover:opacity-90"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}