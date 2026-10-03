import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiUsers,
  FiShoppingBag,
  FiPackage,
  FiDollarSign,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { getStats } from "../services/adminService";

const statusColors = {
  placed: "#3b82f6",
  confirmed: "#0ea5e9",
  packed: "#eab308",
  shipped: "#f97316",
  out_for_delivery: "#a855f7",
  delivered: "#10b981",
  cancelled: "#ef4444",
};

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getStats();
        setData(res);
      } catch (err) {
        toast.error("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading...</div>;
  }

  if (!data) {
    return <div className="text-center py-12">No data available.</div>;
  }

  const { stats, recentOrders, statusBreakdown } = data;

  const cards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: FiUsers,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders,
      icon: FiShoppingBag,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "Medicines",
      value: stats.totalMedicines,
      icon: FiPackage,
      color: "bg-purple-100 text-purple-700",
    },
    {
      label: "Revenue",
      value: `₹${stats.totalRevenue}`,
      icon: FiDollarSign,
      color: "bg-amber-100 text-amber-700",
    },
  ];

  const pieData = statusBreakdown.map((s) => ({
    name: s._id.replace(/_/g, " "),
    value: s.count,
    color: statusColors[s._id] || "#94a3b8",
  }));

  const barData = statusBreakdown.map((s) => ({
    status: s._id.replace(/_/g, " "),
    count: s.count,
  }));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${c.color}`}
              >
                <c.icon size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold">{c.value}</p>
            <p className="text-xs text-gray-500 mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="font-bold mb-4">Orders by Status</h2>
          {barData.length === 0 ? (
            <p className="text-gray-500 text-sm">No data</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData}>
                <XAxis dataKey="status" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="font-bold mb-4">Order Distribution</h2>
          {pieData.length === 0 ? (
            <p className="text-gray-500 text-sm">No data</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold">Recent Orders</h2>
          <Link
            to="/admin/orders"
            className="text-primary text-sm font-semibold"
          >
            View All →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500 text-sm">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-600">
                <tr>
                  <th className="p-2">Order</th>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Items</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o._id} className="border-t">
                    <td className="p-2 font-mono text-xs">
                      #{o._id.slice(-6)}
                    </td>
                    <td className="p-2">
                      <p className="font-medium">{o.user?.name || "—"}</p>
                      <p className="text-xs text-gray-500">{o.user?.email}</p>
                    </td>
                    <td className="p-2">{o.items.length}</td>
                    <td className="p-2 font-semibold">₹{o.totalPrice}</td>
                    <td className="p-2">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold capitalize"
                        style={{
                          background:
                            (statusColors[o.orderStatus] || "#94a3b8") + "20",
                          color: statusColors[o.orderStatus] || "#475569",
                        }}
                      >
                        {o.orderStatus.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="p-2 text-xs text-gray-500">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
