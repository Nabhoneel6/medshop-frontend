import { Link } from "react-router-dom";
import { articles } from "../../data/medicines";

export default function HealthArticlePreview() {
  const preview = articles.slice(0, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Health Articles</h2>
        <Link
          to="/health-articles"
          className="text-primary font-semibold text-sm"
        >
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {preview.map((a) => (
          <Link
            key={a.id}
            to={`/health-articles/${a.id}`}
            className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-lg transition group"
          >
            <div className="relative h-32 overflow-hidden">
              <img
                src={a.image}
                alt={a.title}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-3">
                {a.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
