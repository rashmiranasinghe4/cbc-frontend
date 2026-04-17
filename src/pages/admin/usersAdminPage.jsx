import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UsersAdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // 🔥 FIX HERE
        setUsers(res.data.users || res.data); 
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load users");
        setLoading(false);
      });
  }, [loading]);

  function toggleBlock(userId, currentlyBlocked) {
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/api/users/" + userId,
        { blocked: !currentlyBlocked },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        toast.success(currentlyBlocked ? "User unblocked" : "User blocked");
        setLoading(true);
      })
      .catch(() => toast.error("Failed to update user"));
  }

  // 🛡️ EXTRA SAFETY (avoid crash)
  if (!Array.isArray(users)) {
    return <div className="p-5">Invalid data format</div>;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h2 className="text-sm font-medium text-secondary">All Users</h2>
        <span className="text-xs text-gray-400">{users.length} total</span>
      </div>

      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left text-xs text-gray-400 px-5 py-3">Name</th>
            <th className="text-left text-xs text-gray-400 px-5 py-3">Email</th>
            <th className="text-left text-xs text-gray-400 px-5 py-3">Phone</th>
            <th className="text-left text-xs text-gray-400 px-5 py-3">Role</th>
            <th className="text-left text-xs text-gray-400 px-5 py-3">Status</th>
            <th className="px-5 py-3"></th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b hover:bg-gray-50">
              <td className="px-5 py-3">
                {user.firstName} {user.lastName}
              </td>
              <td className="px-5 py-3">{user.email}</td>
              <td className="px-5 py-3">{user.phone}</td>

              <td className="px-5 py-3">
                <span className="text-xs px-2 py-1 rounded bg-gray-100">
                  {user.role}
                </span>
              </td>

              <td className="px-5 py-3">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    user.blocked
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {user.blocked ? "Blocked" : "Active"}
                </span>
              </td>

              <td className="px-5 py-3 text-right">
                <button
                  onClick={() => toggleBlock(user._id, user.blocked)}
                  className="px-3 py-1 text-xs border rounded"
                >
                  {user.blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}