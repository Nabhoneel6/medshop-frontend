import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getOrderById, cancelOrder } from "../services/orderService";

const statusColors = {
  placed: "bg-blue-100 text-blue-700",
  confirmed: "bg-sky-100 text-sky-700",
  packed: "bg-yellow-100 text-yellow-700",
  shipped: "bg-orange-100 text-orange-700",
  out_for_delivery: "bg-purple-100 text-purple-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await getOrderById(id);
      setOrder(data);
    } catch (err) {
      toast.error("Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) load();
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm("Cancel this order?")) return;
    try {
      await cancelOrder(id);
      toast.success("Order cancelled");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel");
    }
  };

  if (loading)
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  if (!order) return <div className="text-center py-20">Order not found.</div>;

  const canCancel = ["placed", "confirmed", "packed"].includes(
    order.orderStatus,
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/shop" className="text-primary text-sm">
        ← Continue Shopping
      </Link>

      <div className="flex items-center justify-between mt-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Order #{order._id.slice(-8)}</h1>
          <p className="text-sm text-gray-500">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
            statusColors[order.orderStatus] || "bg-gray-100 text-gray-700"
          }`}
        >
          {order.orderStatus.replace(/_/g, " ")}
        </span>
      </div>

      {/* Items */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="font-bold mb-4">Items</h2>
        {order.items.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 py-3 border-b last:border-0"
          >
            <img
              src={item.image || "https://via.placeholder.com/60"}
              alt={item.name}
              className="w-16 h-16 rounded object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.brand}</p>
              <p className="text-sm text-gray-500">
                Qty: {item.quantity} × ₹{item.price}
              </p>
            </div>
            <p className="font-bold">₹{item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      {/* Address */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="font-bold mb-3">Shipping Address</h2>
        <p className="text-sm text-gray-700">
          <strong>{order.shippingAddress.name}</strong>
          <br />
          {order.shippingAddress.address}
          <br />
          {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
          {order.shippingAddress.pincode}
          <br />
          Phone: {order.shippingAddress.phone}
        </p>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-bold mb-3">Payment Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Items</span>
          <span>₹{order.itemsPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Delivery</span>
          <span>
            {order.deliveryFee === 0 ? "FREE" : `₹${order.deliveryFee}`}
          </span>
        </div>
        <div className="border-t my-2"></div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{order.totalPrice}</span>
        </div>
        <p className="text-xs text-gray-500 mt-2 capitalize">
          Payment: {order.paymentMethod} · {order.paymentStatus}
        </p>

        {canCancel && (
          <button
            onClick={handleCancel}
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
}
