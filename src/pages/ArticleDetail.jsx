import { useParams, Link } from "react-router-dom";
import { articles } from "../data/medicines";

export default function ArticleDetail() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <div className="text-center py-20">
        <p>Article not found.</p>
        <Link to="/health-articles" className="text-primary mt-4 inline-block">
          ← Back to articles
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/health-articles" className="text-primary text-sm">
        ← Back to Articles
      </Link>
      <span className="inline-block mt-4 bg-sky-100 text-primary text-xs px-2 py-1 rounded">
        {article.category}
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {article.date} · {article.readTime} read
      </p>
      <img
        src={article.image}
        alt={article.title}
        className="w-full rounded-lg mb-6"
      />
      <div className="prose max-w-none text-gray-700 space-y-4">
        <p>
          This is placeholder content for the article. In a real application,
          this would be fetched from the backend along with the full article body.
        </p>
        <p>
          Health articles are reviewed by medical professionals to ensure accuracy
          and reliability. Always consult your doctor before making health decisions.
        </p>
        <h2 className="text-2xl font-bold mt-6">Key Takeaways</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Always consult a qualified healthcare provider</li>
          <li>Follow prescribed dosages strictly</li>
          <li>Maintain a healthy lifestyle</li>
          <li>Regular checkups are important</li>
        </ul>
        <p className="text-sm text-gray-500 italic mt-8">
          Disclaimer: This article is for informational purposes only and is not
          a substitute for professional medical advice.
        </p>
      </div>
    </article>
  );
}
