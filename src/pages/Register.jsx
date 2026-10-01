import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return toast.error("Please fill all required fields");
    }

    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const result = await register(
      form.name,
      form.email,
      form.password,
      form.phone,
    );

    if (result.success) {
      toast.success(`Welcome, ${result.user.name}!`);
      navigate("/");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center">Create Account</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Join MedShop and get 25% off your first order
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            placeholder="Email *"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Password * (min 6 characters)"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Confirm Password *"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
