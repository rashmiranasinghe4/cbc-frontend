import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function register() {
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/register", {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      password: form.password,
    }).then(() => {
      toast.success("Registered successfully");
      navigate("/login");
    }).catch(() => toast.error("Register failed"));
  }

  const input = "w-full border border-white/40 bg-white/30 rounded-xl px-4 py-2.5 text-sm text-secondary placeholder:text-secondary/40 outline-none focus:border-accent focus:bg-white/50 transition-colors";
  const label = "text-xs font-semibold text-secondary/60 uppercase tracking-wider block mb-1.5";

  const fields = [
    { name: "email",           label: "Email",            placeholder: "you@example.com", type: "email"    },
    { name: "phone",           label: "Phone",            placeholder: "+94 77 000 0000", type: "tel"      },
    { name: "password",        label: "Password",         placeholder: "••••••••",        type: "password" },
    { name: "confirmPassword", label: "Confirm Password", placeholder: "••••••••",        type: "password" },
  ];

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: "url('/background.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Card only — no full-page overlay */}
      <div className="w-full max-w-sm bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-white/60 px-8 py-10">

        {/* Brand */}
        <div className="text-center mb-6">
          <div className="text-3xl font-black text-accent tracking-widest">CBC</div>
          <div className="text-[10px] text-accent/70 tracking-[5px] uppercase mt-0.5">Cosmetic Shop</div>
          <h2 className="text-xl font-bold text-secondary mt-4">Create account</h2>
          <p className="text-xs text-secondary/50 mt-1">Join CBC Cosmetic Shop today</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>First Name</label>
              <input name="firstName" placeholder="Ada" onChange={handleChange} className={input} />
            </div>
            <div>
              <label className={label}>Last Name</label>
              <input name="lastName" placeholder="Perera" onChange={handleChange} className={input} />
            </div>
          </div>

          {fields.map((f) => (
            <div key={f.name}>
              <label className={label}>{f.label}</label>
              <input
                name={f.name}
                type={f.type}
                placeholder={f.placeholder}
                onChange={handleChange}
                className={input}
              />
            </div>
          ))}

          <button
            onClick={register}
            className="w-full bg-accent text-white rounded-xl py-3 text-sm font-semibold hover:opacity-90 active:scale-95 transition-all mt-1"
          >
            Create Account
          </button>
        </div>

        <p className="text-center text-xs text-secondary/50 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-accent font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}