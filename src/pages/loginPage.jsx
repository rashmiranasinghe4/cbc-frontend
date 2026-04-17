
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908C16.658 14.013 17.64 11.705 17.64 9.2z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
    <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/google-login", {
        token: res.access_token,
      }).then((r) => {
        localStorage.setItem("token", r.data.token);
        toast.success("Login successful");
        navigate(r.data.role === "admin" ? "/admin" : "/");
      }).catch(() => toast.error("Google login failed"));
    },
  });

  function login() {
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", { email, password })
      .then((r) => {
        localStorage.setItem("token", r.data.token);
        toast.success("Login successful");
        navigate(r.data.role === "admin" ? "/admin" : "/");
      }).catch((err) => {
        console.log(err);
        toast.error("Login failed");
      });
  }

  const input = "w-full border border-white/40 bg-white/30 rounded-xl px-4 py-2.5 text-sm text-secondary placeholder:text-secondary/40 outline-none focus:border-accent focus:bg-white/50 transition-colors";

  return (
    // No overlay here — just the background image on the content area
    <div
      className="w-full min-h-screen flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/background.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* Card — has its own frosted glass effect, doesn't affect anything outside */}
      <div className="w-full max-w-sm bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-white/60 px-8 py-10">

        {/* Brand */}
        <div className="text-center mb-7">
          <div className="text-3xl font-black text-accent tracking-widest">CBC</div>
          <div className="text-[10px] text-accent/70 tracking-[5px] uppercase mt-0.5">Cosmetic Shop</div>
          <h2 className="text-xl font-bold text-secondary mt-4">Welcome back</h2>
          <p className="text-xs text-secondary/50 mt-1">Sign in to your account</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-secondary/60 uppercase tracking-wider block mb-1.5">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className={input}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-secondary/60 uppercase tracking-wider block mb-1.5">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className={input}
            />
            <div className="text-right mt-1.5">
              <Link to="/forget" className="text-xs text-accent hover:underline font-medium">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            onClick={login}
            className="w-full bg-accent text-white rounded-xl py-3 text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
          >
            Sign in
          </button>

          <div className="flex items-center gap-3 text-secondary/30 text-xs">
            <span className="flex-1 h-px bg-secondary/15" /> or <span className="flex-1 h-px bg-secondary/15" />
          </div>

          <button
            onClick={googleLogin}
            className="w-full bg-white/80 border border-white/50 text-secondary rounded-xl py-2.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-white transition-colors"
          >
            <GoogleIcon /> Continue with Google
          </button>
        </div>

        <p className="text-center text-xs text-secondary/50 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-accent font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}