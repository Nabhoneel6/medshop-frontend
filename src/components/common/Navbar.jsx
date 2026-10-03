import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { count } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          💊 MedShop
        </Link>

        {/* Center links */}
        <div className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <Link to="/shop" className="hover:text-primary">
            Shop
          </Link>
          <Link to="/doctor-consult" className="hover:text-primary">
            Doctors
          </Link>
          <Link to="/health-articles" className="hover:text-primary">
            Articles
          </Link>
          <Link to="/about" className="hover:text-primary">
            About
          </Link>
          <Link to="/contact" className="hover:text-primary">
            Contact
          </Link>
          {isAdmin && (
            <Link
              to="/admin/orders"
              className="hover:text-primary text-emerald-600"
            >
              Admin
            </Link>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <FiShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                {count}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/my-orders"
                className="text-sm font-medium text-gray-700 hover:text-primary hidden md:inline"
              >
                My Orders
              </Link>

              {/* Profile link (was span) */}
              <Link
                to="/profile"
                className="text-sm font-medium text-gray-700 hover:text-primary hidden md:inline"
              >
                Hi, {user.name.split(" ")[0]}
              </Link>

              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-500"
                title="Logout"
              >
                <FiLogOut size={22} />
              </button>
            </div>
          ) : (
            <Link to="/login">
              <FiUser size={22} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
