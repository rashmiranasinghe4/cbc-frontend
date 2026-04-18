import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        console.log("Dashboard load error");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3E8F7]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3E8F7] p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2C183E]">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 text-sm">
          Overview of your system performance
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card title="USERS"  className=" text-accent " value={data.totalUsers} />
        <Card title="PRODUCTS" value={data.totalProducts} />
        <Card title="ORDERS" value={data.totalOrders} />
      </div>

      {/* RECENT SECTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* USERS */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-4 text-[#2C183E]">
            Recent Users
          </h2>

          <div className="space-y-3">
            {data.recentUsers.map((u) => (
              <div
                key={u._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium text-sm text-[#2C183E]">
                    {u.firstName} {u.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{u.email}</p>
                </div>

                <span className="text-xs bg-[#F3E8F7] text-accent px-2 py-1 rounded">
                  User
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-bold mb-4 text-[#2C183E]">
            Recent Products
          </h2>

          <div className="space-y-3">
            {data.recentProducts.map((p) => (
              <div
                key={p._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium text-sm text-[#2C183E]">
                    {p.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Price: ${p.price}
                  </p>
                </div>

                <span className="text-xs bg-[#7B3F8C] text-white px-2 py-1 rounded">
                  Product
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 🔹 REUSABLE CARD */
function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center border-t-4 border-[#7B3F8C]">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-3xl font-bold text-[#7B3F8C] mt-2">
        {value}
      </p>
    </div>
  );
}