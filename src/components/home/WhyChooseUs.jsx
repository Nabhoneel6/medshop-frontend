const stats = [
  { value: "51M+", label: "Happy Customers" },
  { value: "71M+", label: "Orders Delivered" },
  { value: "60,000+", label: "Pincodes Covered" },
  { value: "19,000+", label: "Cities Served" },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-sky-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-lg p-6 text-center shadow-sm"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {s.value}
              </div>
              <div className="text-sm text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
