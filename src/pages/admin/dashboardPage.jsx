import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    products: 0,
    revenue: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Users" value={stats.users} />
        <Card title="Orders" value={stats.orders} />
        <Card title="Products" value={stats.products} />
        <Card title="Revenue" value={`Rs. ${stats.revenue}`} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="p-5 bg-white shadow rounded-xl border">
      <h2 className="text-gray-500">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}