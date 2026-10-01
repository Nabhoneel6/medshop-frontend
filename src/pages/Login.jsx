import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      return toast.error("Please fill all fields");
    }

    const result = await login(form.email, form.password);

    if (result.success) {
      toast.success(`Welcome back, ${result.user.name}!`);
      navigate("/");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center">Login</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Welcome back to MedShop
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
