import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUpload } from "react-icons/fi";
import ProductCard from "../components/product/ProductCard";
import { getMedicines, getCategories } from "../services/productService";
import { useAuth } from "../context/AuthContext";
import OfferStrip from "../components/home/OfferStrip";
import PrescriptionBar from "../components/home/PrescriptionBar";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";
import HealthArticlePreview from "../components/home/HealthArticlePreview";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [meds, cats] = await Promise.all([
          getMedicines({ sort: "rating_desc" }),
          getCategories(),
        ]);
        setFeatured(meds.medicines.slice(0, 4));
        setCategories(cats.categories);
      } catch (err) {
        console.error("Home load error:", err);
      }
    };
    load();
  }, []);

  // Emoji map for categories
  const iconMap = {
    Tablets: "💊",
    Capsules: "💉",
    Syrups: "🍯",
    Vitamins: "🧴",
    Powders: "🥄",
    Ointments: "🧴",
  };

  return (
    <div>
      <OfferStrip />

      {/* HERO */}
      <section className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Your Health, Delivered
          </h1>
          <p className="text-base md:text-lg mb-8">
            Order medicines online with ease — trusted by millions
          </p>
          <div className="max-w-xl mx-auto bg-white rounded-full p-2 flex items-center mb-6">
            <FiSearch className="text-gray-400 ml-2" size={20} />
            <input
              type="text"
              placeholder="Search for medicines, health products..."
              className="flex-1 px-3 py-2 outline-none text-gray-700"
            />
            <Link
              to="/shop"
              className="bg-primary text-white px-5 py-2 rounded-full font-semibold"
            >
              Search
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100"
            >
              Shop Medicines
            </Link>
            <Link
              to="/upload-prescription"
              className="bg-primary border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-sky-700 flex items-center gap-2"
            >
              <FiUpload /> Upload Prescription
            </Link>
          </div>
        </div>
      </section>

      {/* PRESCRIPTION BAR */}
      <PrescriptionBar />

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/shop?category=${cat.slug}`}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg text-center font-medium transition group"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition">
                {iconMap[cat.name] || "💊"}
              </div>
              <div>{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Medicines</h2>
          <Link to="/shop" className="text-primary text-sm font-semibold">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((m) => (
            <ProductCard key={m._id} product={m} />
          ))}
        </div>
      </section>

      {/* DOCTOR CONSULT BANNER */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-sky-600 to-emerald-500 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">Consult a Doctor Online</h3>
            <p className="text-sm opacity-90">
              Talk to certified doctors in under 18 minutes — from home
            </p>
          </div>
          <Link
            to="/doctor-consult"
            className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 whitespace-nowrap"
          >
            Consult Now
          </Link>
        </div>
      </section>

      {/* HEALTH ARTICLES */}
      <HealthArticlePreview />

      {/* WHY CHOOSE US */}
      <WhyChooseUs />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* CTA */}
      <section className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Get Medicines Delivered at Your Doorstep
          </h2>
          {isAuthenticated ? (
            <>
              <p className="mb-6">
                Browse more medicines and enjoy free delivery above ₹500
              </p>
              <Link
                to="/shop"
                className="inline-block bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100"
              >
                Continue Shopping
              </Link>
            </>
          ) : (
            <>
              <p className="mb-6">
                Sign up and get 25% off on your first order
              </p>
              <Link
                to="/register"
                className="inline-block bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
