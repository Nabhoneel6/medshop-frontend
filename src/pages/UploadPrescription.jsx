import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import toast from "react-hot-toast";
import HowItWorks from "../components/home/HowItWorks";

export default function UploadPrescription() {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select a file");
    toast.success("Prescription uploaded! We'll confirm shortly.");
    setFile(null);
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Upload Your Prescription
          </h1>
          <p>We'll verify and deliver your medicines at your doorstep</p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow"
        >
          <label className="border-2 border-dashed border-sky-300 rounded-lg p-10 flex flex-col items-center cursor-pointer hover:bg-sky-50">
            <FiUploadCloud size={48} className="text-primary mb-3" />
            <span className="font-semibold">
              {file ? file.name : "Click to upload prescription"}
            </span>
            <span className="text-sm text-gray-500 mt-1">
              JPG, PNG or PDF (max 5MB)
            </span>
            <input
              type="file"
              accept="image/*,application/pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          <input
            type="tel"
            placeholder="Your Phone Number"
            className="w-full border p-3 rounded-lg mt-6"
          />
          <textarea
            placeholder="Any notes for the pharmacist (optional)"
            className="w-full border p-3 rounded-lg mt-4"
            rows={3}
          />

          <button className="w-full bg-primary text-white py-3 rounded-lg mt-6 font-semibold">
            Submit Prescription
          </button>
        </form>
      </section>

      <HowItWorks />
    </div>
  );
}
