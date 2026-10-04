import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiMapPin, FiPlus, FiCheck } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { placeOrder } from "../services/orderService";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const savedAddresses = user?.addresses || [];
  const hasSaved = savedAddresses.length > 0;

  // Which mode: "saved" (pick from list) or "new" (enter manually)
  const [mode, setMode] = useState(hasSaved ? "saved" : "new");

  // Selected saved address id
  const [selectedId, setSelectedId] = useState(savedAddresses[0]?._id || null);

  // New address form (for when there are no saved addresses)
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const deliveryFee = total > 500 ? 0 : 40;
  const grandTotal = total + deliveryFee;

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to checkout");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Get the final shipping address (either from saved list or new form)
  const getFinalAddress = () => {
    if (mode === "saved") {
      const found = savedAddresses.find((a) => a._id === selectedId);
      if (!found) return null;
      return {
        name: found.name,
        phone: found.phone,
        address: found.address,
        city: found.city,
        state: found.state || "",
        pincode: found.pincode,
      };
    }
    return form;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const shippingAddress = getFinalAddress();

    if (!shippingAddress) {
      return toast.error("Please select a delivery address");
    }

    if (
      !shippingAddress.name ||
      !shippingAddress.phone ||
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.pincode
    ) {
      return toast.error("Please fill all required fields");
    }

    setLoading(true);
    try {
      const order = await placeOrder({
        shippingAddress,
        paymentMethod: "COD",
      });
      toast.success("Order placed successfully!");
      await clearCart();
      navigate(`/orders/${order._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to place order");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/shop" className="bg-primary text-white px-6 py-3 rounded-lg">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        {/* LEFT: Delivery */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FiMapPin /> Delivery Address
          </h2>

          {/* SAVED ADDRESSES */}
          {hasSaved && (
            <div className="space-y-3">
              {savedAddresses.map((a) => (
                <label
                  key={a._id}
                  className={`block border-2 rounded-lg p-3 cursor-pointer transition ${
                    mode === "saved" && selectedId === a._id
                      ? "border-primary bg-sky-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex gap-3">
                    <input
                      type="radio"
                      name="address"
                      checked={mode === "saved" && selectedId === a._id}
                      onChange={() => {
                        setMode("saved");
                        setSelectedId(a._id);
                      }}
                      className="mt-1"
                    />
                    <div className="flex-1 text-sm">
                      <p className="font-semibold">{a.name}</p>
                      <p className="text-gray-600">{a.address}</p>
                      <p className="text-gray-600">
                        {a.city}, {a.state} {a.pincode}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">📞 {a.phone}</p>
                    </div>
                  </div>
                </label>
              ))}

              {/* Add new address option */}
              <label
                className={`flex items-center gap-2 border-2 border-dashed rounded-lg p-3 cursor-pointer transition ${
                  mode === "new"
                    ? "border-primary bg-sky-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  checked={mode === "new"}
                  onChange={() => setMode("new")}
                />
                <FiPlus className="text-primary" />
                <span className="text-sm font-medium">
                  Use a different address
                </span>
              </label>
            </div>
          )}

          {/* NEW ADDRESS FORM */}
          {(!hasSaved || mode === "new") && (
            <div className="space-y-3 pt-2 border-t">
              {hasSaved && (
                <p className="text-xs text-gray-500">
                  Enter a new address below. It won't be saved to your profile.
                </p>
              )}
              <input
                placeholder="Full Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border p-3 rounded-lg"
              />
              <input
                placeholder="Phone *"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border p-3 rounded-lg"
              />
              <textarea
                placeholder="Address *"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={2}
                className="w-full border p-3 rounded-lg"
              />
              <div className="grid grid-cols-3 gap-3">
                <input
                  placeholder="City *"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="border p-3 rounded-lg"
                />
                <input
                  placeholder="State"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="border p-3 rounded-lg"
                />
                <input
                  placeholder="Pincode *"
                  value={form.pincode}
                  onChange={(e) =>
                    setForm({ ...form, pincode: e.target.value })
                  }
                  className="border p-3 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Link to profile to manage addresses */}
          <div className="pt-2 text-xs text-gray-500">
            Want to manage your saved addresses?{" "}
            <Link to="/profile" className="text-primary font-semibold">
              Go to Profile →
            </Link>
          </div>

          {/* Payment method */}
          <div className="p-4 bg-sky-50 rounded-lg mt-4">
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <div className="flex items-center gap-2 text-sm">
              <input type="radio" checked readOnly />
              <span>Cash on Delivery (COD)</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Summary */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          {cart.map((item) => {
            const med = item.medicine;
            return (
              <div key={med._id} className="flex justify-between text-sm mb-2">
                <span className="line-clamp-1">
                  {med.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            );
          })}

          <div className="border-t my-3"></div>

          <div className="flex justify-between mb-2 text-sm">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm">
            <span>Delivery</span>
            <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
          </div>

          <div className="border-t my-3"></div>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>₹{grandTotal}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Placing order..." : "Place Order (COD)"}
          </button>
        </div>
      </form>
    </div>
  );
}
