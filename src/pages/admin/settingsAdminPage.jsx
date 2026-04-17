import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function SettingsAdminPage() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function changePassword() {
    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    axios.put(
      import.meta.env.VITE_BACKEND_URL + "/api/users/password",
      { currentPassword: form.currentPassword, newPassword: form.newPassword },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    ).then(() => {
      toast.success("Password updated");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }).catch(() => toast.error("Failed to update password"));
  }

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-secondary outline-none focus:border-accent transition-colors";
  const labelClass = "text-xs text-gray-500 mb-1.5 block";

  return (
    <div className="max-w-lg flex flex-col gap-5">

      {/* Change Password */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h2 className="text-sm font-medium text-secondary mb-4">Change Password</h2>
        <div className="flex flex-col gap-3">
          <div>
            <label className={labelClass}>Current password</label>
            <input name="currentPassword" type="password" value={form.currentPassword}
              onChange={handleChange} className={inputClass} placeholder="••••••••" />
          </div>
          <div>
            <label className={labelClass}>New password</label>
            <input name="newPassword" type="password" value={form.newPassword}
              onChange={handleChange} className={inputClass} placeholder="••••••••" />
          </div>
          <div>
            <label className={labelClass}>Confirm new password</label>
            <input name="confirmPassword" type="password" value={form.confirmPassword}
              onChange={handleChange} className={inputClass} placeholder="••••••••" />
          </div>
          <button
            onClick={changePassword}
            className="bg-accent text-white text-sm rounded-xl py-2.5 hover:opacity-90 transition-opacity mt-1"
          >
            Update password
          </button>
        </div>
      </div>

      {/* Store Info */}
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h2 className="text-sm font-medium text-secondary mb-4">Store Info</h2>
        <div className="flex flex-col gap-3">
          <div>
            <label className={labelClass}>Store name</label>
            <input type="text" defaultValue="CBC Cosmetic Shop" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Contact email</label>
            <input type="email" defaultValue="hello@cbc.lk" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input type="text" defaultValue="+94 77 000 0000" className={inputClass} />
          </div>
          <button
            onClick={() => toast.success("Settings saved")}
            className="bg-accent text-white text-sm rounded-xl py-2.5 hover:opacity-90 transition-opacity mt-1"
          >
            Save changes
          </button>
        </div>
      </div>

    </div>
  );
}