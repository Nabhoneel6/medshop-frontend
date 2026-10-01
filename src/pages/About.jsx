import { FiTruck, FiShield, FiClock, FiHeart } from "react-icons/fi";

const features = [
  { icon: FiTruck, title: "Fast Delivery", desc: "Medicines delivered within 24-48 hours to your doorstep." },
  { icon: FiShield, title: "100% Genuine", desc: "All products sourced directly from licensed distributors." },
  { icon: FiClock, title: "24/7 Support", desc: "Our team is available round the clock for your queries." },
  { icon: FiHeart, title: "Trusted by Millions", desc: "Serving 51M+ happy customers across 19,000+ cities." },
];

const cities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
  "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow",
  "Noida", "Gurgaon", "Thane", "Navi Mumbai", "Chandigarh",
];

export default function About() {
  return (
    <div>
      <section className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About MedShop</h1>
          <p className="text-lg">
            Simplifying healthcare, impacting lives — one delivery at a time
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              MedShop is a one-stop online pharmacy connecting you with registered
              retail pharmacies and certified healthcare providers. We deliver
              pharmaceutical and healthcare products directly to your home.
            </p>
            <p className="text-gray-700">
              Our mission is to make healthcare affordable, accessible, and
              simple for every Indian household. With 60,000+ pincodes covered
              and 51 million+ happy customers, we're proud to be India's trusted
              online medical store.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600"
            alt="About MedShop"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="bg-sky-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white p-6 rounded-lg shadow-sm">
                <f.icon className="text-primary mb-4" size={32} />
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">We've Got India Covered</h2>
        <p className="text-center text-gray-600 mb-10">
          Delivering across 60,000+ pincodes in 19,000+ cities
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {cities.map((city) => (
            <span
              key={city}
              className="bg-white border px-4 py-2 rounded-full text-sm text-gray-700"
            >
              {city}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}