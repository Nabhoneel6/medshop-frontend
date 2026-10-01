import { useState } from "react";
import { Link } from "react-router-dom";
import { articles } from "../data/medicines";

export default function HealthArticles() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(articles.map((a) => a.category))];

  const filtered = articles.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || a.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Health Articles</h1>
      <p className="text-gray-600 mb-6">
        Trusted, expert-written health information
      </p>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg flex-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 rounded-lg"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((a) => (
            <Link
              key={a.id}
              to={`/health-articles/${a.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-lg transition group"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <div className="p-4">
                <span className="text-xs bg-sky-100 text-primary px-2 py-0.5 rounded">
                  {a.category}
                </span>
                <h3 className="font-semibold mt-2 line-clamp-2">{a.title}</h3>
                <p className="text-xs text-gray-500 mt-2">
                  {a.date} · {a.readTime} read
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
