import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Paginator from "../../components/paginator";

export default function UsersAdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
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
        import.meta.env.VITE_BACKEND_URL + "/api/users/update/" + userId,
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

  if (!Array.isArray(users)) {
    return <div className="p-5">Invalid data format</div>;
  }

  return (
    <div className="min-h-screen bg-[#F3E8F7] flex flex-col p-6">
  <div className="bg-white rounded-xl shadow-lg p-6 flex-1">
		  


      {/* TABLE CARD */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-sm font-semibold text-[#2C183E]">
            All Users
          </h2>
          <span className="text-xs text-gray-400">
            {users.length} users
          </span>
        </div>

        {/* TABLE */}
        <table className="w-full text-sm">

          {/* COLUMN HEADER */}
          <thead>
            <tr className="bg-[#F3E8F7] text-[#2C183E] border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right"></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-[#F3E8F7] transition"
              >

                {/* NAME */}
                <td className="p-3 font-medium text-[#2C183E]">
                  {user.firstName} {user.lastName}
                </td>

                {/* EMAIL */}
                <td className="p-3">{user.email}</td>

                {/* PHONE */}
                <td className="p-3">{user.phone}</td>

                {/* ROLE */}
                <td className="p-3">
                  <span className="px-2 py-1 text-xs rounded bg-[#F3E8F7] text-[#7B3F8C]">
                    {user.role}
                  </span>
                </td>

                {/* STATUS (ONLY COLOR FIXED) */}
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      user.blocked
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {user.blocked ? "Blocked" : "Active"}
                  </span>
                </td>

                {/* BUTTON */}
                <td className="p-3 text-right">
                  <button
                    onClick={() =>
                      toggleBlock(user._id, user.blocked)
                    }
                    className="px-3 py-1 text-xs border rounded hover:bg-[#7B3F8C] hover:text-white"
                  >
                    {user.blocked ? "Unblock" : "Block"}
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATOR (ONLY UI ADDED, NO LOGIC CHANGE) */}
      <Paginator
        currentPage={1}
        totalPages={1}
        setCurrentPage={() => {}}
        limit={10}
        setLimit={() => {}}
        setLoading={() => {}}
      />
    </div>
    </div>
  );
}