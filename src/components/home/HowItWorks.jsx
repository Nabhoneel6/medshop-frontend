import { FiUpload, FiMapPin, FiPhone, FiHome } from "react-icons/fi";

const steps = [
  { icon: FiUpload, title: "Upload Prescription", desc: "Upload a photo of your prescription" },
  { icon: FiMapPin, title: "Add Address", desc: "Enter delivery address & place order" },
  { icon: FiPhone, title: "We Confirm", desc: "We'll call you to confirm medicines" },
  { icon: FiHome, title: "Doorstep Delivery", desc: "Sit back — medicines delivered fast" },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Order with Prescription
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Get medicines delivered in 4 easy steps
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 mx-auto bg-sky-50 rounded-full flex items-center justify-center mb-4">
                <step.icon className="text-primary" size={28} />
              </div>
              <div className="text-xs font-bold text-primary mb-1">STEP {i + 1}</div>
              <h3 className="font-semibold mb-1">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href="/upload-prescription"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90"
          >
            Upload Prescription
          </a>
        </div>
      </div>
    </section>
  );
}