import { FiUpload } from "react-icons/fi";
import { Link } from "react-router-dom";

const steps = [
  "Upload a photo of your prescription",
  "Add delivery address and place the order",
  "We will call you to confirm the medicines",
  "Now, sit back! your medicines will get delivered at your doorstep",
];

export default function PrescriptionBar() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-sky-50 to-emerald-50 rounded-2xl overflow-hidden grid md:grid-cols-2 border border-sky-100">
        <div className="p-8 flex items-center gap-6">
          <div className="text-6xl">💊</div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              Order with Prescription
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Upload prescription and we will deliver your medicines
            </p>
            <Link
              to="/upload-prescription"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-emerald-700"
            >
              <FiUpload /> Upload
            </Link>
          </div>
        </div>

        <div className="p-8 bg-white/60">
          <h4 className="font-semibold text-gray-800 mb-4">
            How does this work?
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-7 h-7 flex-shrink-0 bg-sky-100 text-primary rounded-full flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
