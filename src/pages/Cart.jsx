import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const { cart, removeFromCart, updateQty, total, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Please login to view cart</h2>
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
      <div className="text-center py-20 text-gray-500">Loading cart...</div>
    );
  }

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const med = item.medicine;
            const image =
              med.images?.[0] ||
              "https://via.placeholder.com/100x100?text=Medicine";
            return (
              <div
                key={med._id}
                className="bg-white p-4 rounded-lg shadow flex gap-4"
              >
                <img
                  src={image}
                  alt={med.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{med.name}</h3>
                  <p className="text-primary font-bold">₹{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(med._id, item.quantity - 1)}
                      className="px-3 bg-gray-200 rounded"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQty(med._id, item.quantity + 1)}
                      className="px-3 bg-gray-200 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(med._id)}
                      className="text-red-500 text-sm ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="font-bold">₹{item.price * item.quantity}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Delivery</span>
            <span>{total > 500 ? "FREE" : "₹40"}</span>
          </div>
          <div className="border-t my-3"></div>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total</span>
            <span>₹{total > 500 ? total : total + 40}</span>
          </div>
          <Link
            to="/checkout"
            className="block text-center bg-primary text-white py-3 rounded-lg"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
