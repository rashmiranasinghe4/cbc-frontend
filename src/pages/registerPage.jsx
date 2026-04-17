import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function register() {
    // ✅ validation
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/register", {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      password: form.password
    })
    .then(() => {
      toast.success("Registered successfully");
      navigate("/login"); // ✅ go login
    })
    .catch((err) => {
      toast.error(err.response?.data?.message || "Register failed");
    });
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[400px] flex flex-col gap-4 shadow-xl p-6 rounded-xl">

        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        <input name="firstName" placeholder="First Name" onChange={handleChange} className="border p-2 rounded"/>
        <input name="lastName" placeholder="Last Name" onChange={handleChange} className="border p-2 rounded"/>
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded"/>
        <input name="phone" placeholder="Phone Number" onChange={handleChange} className="border p-2 rounded"/>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 rounded"/>
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} className="border p-2 rounded"/>

        <button onClick={register} className="bg-pink-500 text-white p-2 rounded hover:bg-pink-600">
          Register
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-blue-500 cursor-pointer">
            Login
          </span>
        </p>

      </div>
    </div>
  );
}