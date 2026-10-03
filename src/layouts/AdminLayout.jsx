import { NavLink, Outlet, Navigate } from "react-router-dom";
import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiUserCheck,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/admin", label: "Dashboard", icon: FiGrid, end: true },
  { to: "/admin/orders", label: "Orders", icon: FiShoppingBag },
  { to: "/admin/users", label: "Users", icon: FiUsers },
  { to: "/admin/medicines", label: "Medicines", icon: FiPackage },
  { to: "/admin/doctors", label: "Doctors", icon: FiUserCheck },
];

export default function AdminLayout() {
  const { isAdmin } = useAuth();

  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="bg-white rounded-lg shadow p-3 h-fit">
          <h2 className="font-bold text-lg px-3 py-2 text-primary">
            Admin Panel
          </h2>
          <nav className="flex flex-col gap-1 mt-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-sky-50"
                  }`
                }
              >
                <l.icon size={18} />
                {l.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
