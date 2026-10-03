import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllUsers, toggleBlockUser } from "../services/adminService";
import { useAuth } from "../context/AuthContext";

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleToggle = async (id, isBlocked) => {
    const action = isBlocked ? "unblock" : "block";
    if (!window.confirm(`${action} this user?`)) return;
    try {
      await toggleBlockUser(id);
      toast.success(`User ${action}ed`);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">All Users</h1>
      <p className="text-gray-600 text-sm mb-6">
        Total: {users.length} registered users
      </p>

      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-80 border p-2 rounded-lg mb-4"
      />

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : filtered.length === 0 ? (
        <p className="text-center py-12 text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Role</th>
                <th className="p-3">Joined</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="p-3 font-medium">
                    {u.name}
                    {u._id === currentUser?._id && (
                      <span className="ml-2 text-xs text-primary">(you)</span>
                    )}
                  </td>
                  <td className="p-3 text-gray-600">{u.email}</td>
                  <td className="p-3 text-gray-600">{u.phone || "—"}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${
                        u.role === "admin"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {u.isBlocked ? (
                      <span className="text-red-500 text-xs font-semibold">
                        Blocked
                      </span>
                    ) : (
                      <span className="text-emerald-600 text-xs font-semibold">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    {u.role !== "admin" && (
                      <button
                        onClick={() => handleToggle(u._id, u.isBlocked)}
                        className={`text-xs px-3 py-1 rounded font-semibold ${
                          u.isBlocked
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                      >
                        {u.isBlocked ? "Unblock" : "Block"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
