import { doctors, specialties } from "../data/medicines";
import { FiStar, FiVideo } from "react-icons/fi";
import toast from "react-hot-toast";

export default function DoctorConsult() {
  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-r from-sky-600 to-emerald-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Consult a Doctor Online
          </h1>
          <p className="mb-6">Talk to certified doctors in under 18 minutes</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <div className="bg-white/20 px-4 py-2 rounded-full">
              🏥 40+ Certified Doctors
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              💬 50K+ Consultations
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-full">
              ⭐ 4.8/5 Rating
            </div>
          </div>
        </div>
      </section>

      {/* SPECIALTIES */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">20+ Specialities</h2>
          <button className="text-primary font-semibold text-sm">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {specialties.map((s) => (
            <div
              key={s.name}
              className="bg-sky-50 border border-sky-100 rounded-lg p-5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            >
              <div>
                <h3 className="font-semibold text-gray-800">{s.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{s.desc}</p>
              </div>
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DOCTORS */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">
          Doctor consult in <span className="text-emerald-600">18 mins</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((d) => (
            <div
              key={d.id}
              className="bg-white p-5 rounded-lg shadow-sm border hover:shadow-lg transition"
            >
              <div className="flex gap-4">
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-sky-100"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{d.name}</h3>
                  <p className="text-sm text-emerald-600 font-medium">
                    {d.specialty}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {d.experience} · {d.qualification}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="flex items-center gap-1 text-yellow-500">
                      <FiStar fill="currentColor" /> {d.rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <span className="font-bold text-primary">₹{d.fee}</span>
                <button
                  onClick={() =>
                    toast.success(`Consultation booked with ${d.name}`)
                  }
                  className="bg-white border border-emerald-600 text-emerald-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-50 flex items-center gap-1"
                >
                  <FiVideo /> Consult Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
