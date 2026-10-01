import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { getAllOrders, updateOrderStatus } from "../services/adminService";

const statuses = [
  "placed",
  "confirmed",
  "packed",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

const statusColors = {
  placed: "bg-blue-100 text-blue-700",
  confirmed: "bg-sky-100 text-sky-700",
  packed: "bg-yellow-100 text-yellow-700",
  shipped: "bg-orange-100 text-orange-700",
  out_for_delivery: "bg-purple-100 text-purple-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrders() {
  const { isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders(filter);
      setOrders(data);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, filter]);

  if (!isAdmin) return <Navigate to="/" replace />;

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success("Status updated");
      load();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin · All Orders</h1>

      <div className="mb-4 flex items-center gap-3">
        <label className="text-sm text-gray-600">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="">All</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading...</div>
      ) : orders.length === 0 ? (
        <p className="text-center py-20 text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Change</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-t">
                  <td className="p-3">
                    <p className="font-mono text-xs">#{o._id.slice(-8)}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="p-3">
                    <p className="font-medium">{o.user?.name}</p>
                    <p className="text-xs text-gray-500">{o.user?.email}</p>
                  </td>
                  <td className="p-3">{o.items.length}</td>
                  <td className="p-3 font-semibold">₹{o.totalPrice}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                        statusColors[o.orderStatus] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {o.orderStatus.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={o.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(o._id, e.target.value)
                      }
                      className="border text-xs p-1 rounded"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
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
