import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiMapPin } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { placeOrder } from "../services/orderService";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const saved = JSON.parse(localStorage.getItem("deliveryAddress") || "null");
  const [form, setForm] = useState(
    saved || {
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
  );

  const deliveryFee = total > 500 ? 0 : 40;
  const grandTotal = total + deliveryFee;

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to checkout");
      navigate("/login");
    }
    if (cart.length === 0 && isAuthenticated) {
      // Empty cart — send them shopping
    }
  }, [isAuthenticated, navigate, cart.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      return toast.error("Please fill all required fields");
    }

    setLoading(true);
    try {
      const order = await placeOrder({
        shippingAddress: {
          name: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },
        paymentMethod: "COD",
      });

      toast.success("Order placed successfully!");
      await clearCart();
      localStorage.removeItem("deliveryAddress");

      // Go to order detail
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
        {/* Left: Delivery */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FiMapPin /> Delivery Details
          </h2>

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
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              className="border p-3 rounded-lg"
            />
          </div>

          <div className="mt-4 p-4 bg-sky-50 rounded-lg">
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <div className="flex items-center gap-2 text-sm">
              <input type="radio" checked readOnly />
              <span>Cash on Delivery (COD)</span>
            </div>
          </div>
        </div>

        {/* Right: Summary */}
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
