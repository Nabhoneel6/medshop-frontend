import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function OfferStrip() {
  const [show, setShow] = useState(true);
  if (!show) return null;

  return (
    <div className="bg-gradient-to-r from-sky-600 to-emerald-500 text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 relative">
        <span>🎉 Get up to 25% OFF on your first order above ₹1,000</span>
        <span className="bg-white text-primary font-bold px-2 py-0.5 rounded text-xs">
          CODE: SAVEPE
        </span>
        <button
          onClick={() => setShow(false)}
          className="absolute right-4 hover:opacity-75"
        >
          <FiX size={18} />
        </button>
      </div>
    </div>
  );
}
