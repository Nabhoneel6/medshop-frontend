import { FiStar } from "react-icons/fi";

const reviews = [
  {
    name: "Niti Rohan",
    date: "Dec 11, 2024",
    text: "Ordered my dad's heart medication late evening — delivered next morning. Smooth process and good discount!",
  },
  {
    name: "Yogesh Shukla",
    date: "Jan 10, 2025",
    text: "Ordered wrong tablets by mistake — customer support arranged return pickup and refund in 2 days.",
  },
  {
    name: "Anuj Kumar",
    date: "Mar 12, 2025",
    text: "Best app for ordering medicines. Using it for 5 years. Support team is excellent.",
  },
  {
    name: "Meha Jain",
    date: "Apr 3, 2025",
    text: "Great options for generic medicines from reputed firms — saves money and gives choices!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex gap-1 text-yellow-400 mb-3">
                {[...Array(5)].map((_, j) => (
                  <FiStar key={j} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm text-gray-700 mb-4">"{r.text}"</p>
              <div className="border-t pt-3">
                <p className="font-semibold text-sm">{r.name}</p>
                <p className="text-xs text-gray-500">{r.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
