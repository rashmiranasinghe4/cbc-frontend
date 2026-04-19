
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiCart, BiStore } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSignInAlt, FaUserPlus ,FaSignOutAlt } from "react-icons/fa";
import { MdContactMail, MdRateReview } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HiHome } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
	setToken(null);
    navigate("/");
  }

  return (
    <header className="h-[100px] bg-accent flex justify-center items-center relative">

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="fixed z-[100] top-0 left-0 w-[100vw] h-[100vh] bg-[#00000050]">
          
          {/* SIDE PANEL */}
          <div className="h-full w-[300px] bg-white flex flex-col">

            {/* TOP BAR */}
            <div className="w-full bg-accent h-[100px] flex items-center gap-5 px-6">
              <GiHamburgerMenu
                className="text-white text-4xl cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
              <img
                src="/logo.png"
                className="h-[70px] cursor-pointer"
                onClick={() => {
                  navigate("/");
                  setIsOpen(false);
                }}
              />
            </div>

            {/* MENU ITEMS (LIKE YOUR IMAGE) */}
            <div className="flex flex-col gap-6 p-8">

              <button
                className="text-accent text-2xl flex items-center gap-3"
                onClick={() => { navigate("/"); setIsOpen(false); }}
              >
                <HiHome /> Home
              </button>

              <button
                className="text-accent text-2xl flex items-center gap-3"
                onClick={() => { navigate("/products"); setIsOpen(false); }}
              >
                <BiStore /> Products
              </button>

              <button
                className="text-accent text-2xl flex items-center gap-3"
                onClick={() => { navigate("/cart"); setIsOpen(false); }}
              >
                <BiCart /> Cart
              </button>

              {/* NEW ITEMS */}
              <button
                className="text-accent text-2xl flex items-center gap-3"
                onClick={() => { navigate("/reviews"); setIsOpen(false); }}
              >
                <MdRateReview /> Reviews
              </button>

              <button
                className="text-accent text-2xl flex items-center gap-3"
                onClick={() => { navigate("/about-us"); setIsOpen(false); }}
              >
                <AiOutlineInfoCircle /> About Us
              </button>

              <button
                className="text-accent text-2xl flex items-center gap-3"
                onClick={() => { navigate("/contact-us"); setIsOpen(false); }}
              >
                <MdContactMail/> Contact Us
              </button>

              {/* AUTH (SAME LOGIC) */}
              {!token && (
                <>
                  <button
                    className="text-accent text-2xl flex items-center gap-3"
                    onClick={() => { navigate("/login"); setIsOpen(false); }}
                  >
                    <FaSignInAlt /> Login
                  </button>

                  <button
                    className="text-accent text-2xl flex items-center gap-3"
                    onClick={() => { navigate("/register"); setIsOpen(false); }}
                  >
                    <FaUserPlus/> Sign Up
                  </button>

				  <button
                    className="text-accent text-2xl flex items-center gap-3"
                    onClick={() => { navigate("/register"); setIsOpen(false); }}
                  >
                    <FaSignOutAlt/> logout
                  </button>
                </>
			  )}			
</div>
					</div>
				</div>
	  )}	

              

      {/* LOGO */}
      <img
				className="w-[150px] h-[80px] object-cover absolute md:left-[40px] cursor-pointer"
				onClick={() => {
					navigate("/");
				}}
				src="/logo.png"
				alt="Logo"
			/>
			<GiHamburgerMenu className="text-white text-4xl absolute md:hidden left-[40px]" onClick={
                ()=>{
                    setIsOpen(true);
                }
            }/>
			<div className="hidden w-full md:flex justify-center items-center">
				<Link to="/" className="text-white text-xl hover:scale-110">
					Home
				</Link>
				<Link to="/products" className="ml-4 text-white text-xl hover:scale-110">
					Products
				</Link>
				<Link to="/reviews" className="ml-4 text-white text-xl hover:scale-110">
					Reviews
				</Link>
				<Link to="/about-us" className="ml-4 text-white text-xl hover:scale-110">
					About Us
				</Link>
				<Link to="/contact-us" className="ml-4 text-white text-xl hover:scale-110">
					Contact Us
				</Link>
				<Link to="/cart" className="absolute right-[350px] top-1/2 -translate-y-1/2 z-50"> 
					<BiCart className="text-white text-3xl ml-4" />
				</Link>
				<div className="absolute right-[40px] flex items-center gap-4">

  {/* always show */}
  <Link 
	to="/login" 
	className="px-4 py-1 rounded-full border border-white text-accent bg-white hover:text-accent hover:opacity-80 tracking-wider transition"
  >
	Login
  </Link>

  <Link
	to="/register"
	className="px-4 py-1 rounded-full border border-white text- bg-white text-accent transition hover:opacity-80"
  >
	Sign Up
  </Link>

  {/* show logout ONLY if logged in */}
  {token && (
	<button
	  onClick={logout}
	  className="px-4 py-1 rounded-full bg-white text-accent hover:opacity-80 transition"
	>
	  Logout
            </button>
          )}

        </div>
      </div>

    </header>
  );
}		