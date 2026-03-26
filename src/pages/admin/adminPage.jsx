import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import ProductsAdminPage from "./productsAdminPage";
import AddProductPage from "./addProductAdminPage";
import UpdateProductPage from "./updateProduct";
import OrdersPageAdmin from "./ordersPageAdmin";
import LoginPage from "./loginPage";
import { useEffect, useState } from "react";
//import Loader from "../../components/";
import axios from "axios";
import toast from "react-hot-toast";
export default function AdminPage() {
	const navigate = useNavigate();
	const [adminValidated, setAdminValidated] = useState(false);
	const [checking, setChecking] = useState(true);
	const [showLogin, setShowLogin] = useState(false);
	useEffect(
		()=>{
			const token = localStorage.getItem("token");
			if (!token) {
				setShowLogin(true);
				setChecking(false);
				return;
			}
			axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users/", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then((response) => {
				if (response.data.role == "admin") {
					setAdminValidated(true);
				} else {
					toast.error("You are not authorized");
					setShowLogin(true);
				}
			}).catch(() => {
				toast.error("You are not authorized");
				setShowLogin(true);
			}).finally(() => {
				setChecking(false);
			});
		}
	,[]);
	if (checking) return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;

	return (
		<div className="w-full h-screen  flex">
			{adminValidated ? <>
				<div className="w-[300px] h-full flex flex-col items-center">
					<span className="text-3xl font-bold my-5">Admin Panel</span>

					<Link
						className="flex flex-row h-[60px] w-full  border p-[20px] items-center text-xl  gap-[25px]"
						to="products"
					>
						<FaBoxArchive /> Products
					</Link>
					<Link
						className="flex flex-row h-[60px] w-full border p-[20px] items-center text-xl  gap-[25px]"
						to="orders"
					>
						<GiShoppingBag /> Orders
					</Link>
					<Link
						className="flex flex-row h-[60px] w-full border p-[20px] items-center text-xl  gap-[25px]"
						to="users"
					>
						<IoPeople /> Users
					</Link>
					<Link
						className="flex flex-row h-[60px] w-full border p-[20px] items-center text-xl  gap-[25px]"
						to="settings"
					>
						<IoSettings /> Settings
					</Link>
				</div>
				<div className="w-[calc(100%-300px)]  h-full">
					<Routes>
						<Route index element={<h1>Dashboard</h1>} />
						<Route path="products" element={<ProductsAdminPage />} />
						<Route path="newProduct" element={<AddProductPage />} />
						<Route path="orders" element={<OrdersPageAdmin />} />
						<Route path="updateProduct" element={<UpdateProductPage />} />
					</Routes>
				</div>
			</> : (
				showLogin ? <LoginPage redirectTo="/admin" /> : <div className="w-full h-full flex items-center justify-center">You are not authorized</div>
			)}
		</div>
	);
}