import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { IoPeople, IoSettings } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";

import ProductsAdminPage from "./admin/productsAdminPage";
import AddProductPage from "./admin/addProductAdminPage";
import UpdateProductPage from "./admin/updateProduct";
import OrdersPageAdmin from "./admin/ordersPageAdmin";
import UsersAdminPage from "./admin/usersAdminPage";
import SettingsAdminPage from "./admin/settingsAdminPage";
import DashboardPage from "./admin/dashboardPage";

import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminPage() {
  const navigate = useNavigate();
  const [adminValidated, setAdminValidated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("You are not logged in");
      navigate("/login");
    } else {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.role == "admin") {
          setAdminValidated(true);
        } else {
          toast.error("You are not authorized");
          navigate("/login");
        }
      })
      .catch(() => {
        toast.error("You are not authorized");
        navigate("/login");
      });
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex bg-primary">
      {adminValidated ? (
        <>
          {/* Sidebar */}
          <div className="w-[300px] h-full flex flex-col items-center bg-primary border-r border-secondary/10">

            <span className="text-3xl font-bold my-5 text-secondary ">
              Admin Panel
            </span>

            <Link className="admin-link" to="/admin/dashboard">
              <LuLayoutDashboard /> Dashboard
            </Link>

            <Link className="admin-link" to="/admin/products">
              <FaBoxArchive /> Products
            </Link>

            <Link className="admin-link" to="/admin/orders">
              <GiShoppingBag /> Orders
            </Link>

            <Link className="admin-link" to="/admin/users">
              <IoPeople /> Users
            </Link>

            <Link className="admin-link" to="/admin/settings">
              <IoSettings /> Settings
            </Link>
          </div>

          {/* Content */}
          <div className="w-[calc(100%-300px)] h-full">
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/products" element={<ProductsAdminPage />} />
              <Route path="/newProduct" element={<AddProductPage />} />
              <Route path="/orders" element={<OrdersPageAdmin />} />
              <Route path="/updateProduct" element={<UpdateProductPage />} />
              <Route path="/users" element={<UsersAdminPage />} />
              <Route path="/settings" element={<SettingsAdminPage />} />
            </Routes>
          </div>

          {/* Sidebar link style */}
          <style>{`
            .admin-link {
              display: flex;
              align-items: center;
              gap: 12px;
              width: 100%;
              padding: 16px 20px;
              font-size: 18px;
              color: #2C183E;
              border-bottom: 1px solid rgba(44,24,62,0.1);
              transition: all 0.2s ease;
            }

            .admin-link:hover {
              background: #7B3F8C;
              color: white;
            }
          `}</style>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}