import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import UploadPrescription from "../pages/UploadPrescription";
import HealthArticles from "../pages/HealthArticlePreview";
import ArticleDetail from "../pages/ArticleDetail";
import DoctorConsult from "../pages/DoctorConsult";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Address from "../pages/Address";
import OrderDetail from "../pages/OrderDetail";
import MyOrders from "../pages/MyOrders";
import AdminOrders from "../pages/AdminOrders";
import Profile from "../pages/Profile";
import AdminLayout from "../layouts/AdminLayout";
import AdminUsers from "../pages/AdminUsers";
import AdminDashboard from "../pages/AdminDashboard";
import AdminMedicines from "../pages/AdminMedicines";
import AdminDoctors from "../pages/AdminDoctors";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/address" element={<Address />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Content pages */}
        <Route path="/upload-prescription" element={<UploadPrescription />} />
        <Route path="/health-articles" element={<HealthArticles />} />
        <Route path="/health-articles/:id" element={<ArticleDetail />} />
        <Route path="/doctor-consult" element={<DoctorConsult />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Orders */}
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="medicines" element={<AdminMedicines />} />
          <Route path="doctors" element={<AdminDoctors />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
