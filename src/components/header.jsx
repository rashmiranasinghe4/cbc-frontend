import { Link } from "react-router-dom";
import { BiCart } from "react-icons/bi";

export default function Header() {
	return (
		
        <header className="h-[100px]  bg-blue-500 flex items-center justify-center relative">
			
				<Link to="/" className="text-white text-xl ">
					Home
				</Link>
				<Link to="/products" className="ml-4 text-white text-xl">
					Products
				</Link>
				<Link to="/reviews" className="ml-4 text-white text-xl">
					Reviews
				</Link>
				<Link to="/about-us" className="ml-4 text-white text-xl">
					About Us
				</Link>
				<Link to="/contact-us" className="ml-4 text-white text-xl">
					Contact Us
				</Link>
				<Link to="/Cart" className="absolute right-[80px]">
					<BiCart className="text-white text-3xl" ml-4/>	
				</Link>
				
                
		</header>
	);
}