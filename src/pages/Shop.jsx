import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import ProductCard from "../components/product/ProductCard";
import { getMedicines, getCategories } from "../services/productService";

export default function Shop() {
  const [params] = useSearchParams();
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(params.get("category") || "");
  const [sort, setSort] = useState("");

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories);
      } catch (err) {
        console.error("Categories load failed:", err);
      }
    };
    loadCategories();
  }, []);

  // Load medicines whenever filters change
  useEffect(() => {
    const loadMedicines = async () => {
      setLoading(true);
      try {
        const query = {};
        if (search) query.search = search;
        if (category) query.category = category;
        if (sort) query.sort = sort;

        const data = await getMedicines(query);
        setMedicines(data.medicines);
      } catch (err) {
        toast.error("Failed to load medicines");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(loadMedicines, 300); // debounce search
    return () => clearTimeout(timer);
  }, [search, category, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shop Medicines</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg flex-1"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c._id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-3 rounded-lg"
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A to Z</option>
          <option value="rating_desc">Rating: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">
          Loading medicines...
        </div>
      ) : medicines.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No medicines found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {medicines.map((m) => (
            <ProductCard key={m._id} product={m} />
          ))}
        </div>
      )}
    </div>
  );
}
