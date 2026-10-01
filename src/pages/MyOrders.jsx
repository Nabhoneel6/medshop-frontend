import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getMyOrders } from "../services/orderService";
import { useAuth } from "../context/AuthContext";

const statusColors = {
  placed: "bg-blue-100 text-blue-700",
  confirmed: "bg-sky-100 text-sky-700",
  packed: "bg-yellow-100 text-yellow-700",
  shipped: "bg-orange-100 text-orange-700",
  out_for_delivery: "bg-purple-100 text-purple-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function MyOrders() {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) load();
    else setLoading(false);
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Please login to view orders</h2>
        <Link
          to="/login"
          className="bg-primary text-white px-6 py-3 rounded-lg"
        >
          Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading orders...</div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-6">
          Start shopping to see your orders here
        </p>
        <Link to="/shop" className="bg-primary text-white px-6 py-3 rounded-lg">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order._id}
            to={`/orders/${order._id}`}
            className="block bg-white rounded-lg shadow hover:shadow-md transition p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-sm text-gray-500">
                  Order #{order._id.slice(-8)}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                  statusColors[order.orderStatus] || "bg-gray-100 text-gray-700"
                }`}
              >
                {order.orderStatus.replace(/_/g, " ")}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              {order.items.slice(0, 3).map((item) => (
                <img
                  key={item._id}
                  src={item.image || "https://via.placeholder.com/40"}
                  alt={item.name}
                  className="w-12 h-12 rounded object-cover border"
                />
              ))}
              {order.items.length > 3 && (
                <span className="text-sm text-gray-500">
                  +{order.items.length - 3} more
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {order.items.length} item{order.items.length > 1 ? "s" : ""}
              </span>
              <span className="font-bold text-primary">
                ₹{order.totalPrice}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
