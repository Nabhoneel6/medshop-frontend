import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiMapPin } from "react-icons/fi";

export default function Address() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, address, city, pincode } = form;
    if (!name || !phone || !address || !city || !pincode) {
      return toast.error("Please fill all required fields");
    }
    localStorage.setItem("deliveryAddress", JSON.stringify(form));
    toast.success("Address saved!");
    navigate("/checkout");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-primary">
          <FiMapPin size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Delivery Address</h1>
          <p className="text-sm text-gray-600">Where should we deliver?</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            placeholder="Full Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-3 rounded-lg"
          />
          <input
            placeholder="Phone Number *"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="border p-3 rounded-lg"
          />
        </div>

        <textarea
          placeholder="Full Address (House No, Street, Landmark) *"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          rows={3}
          className="w-full border p-3 rounded-lg"
        />

        <div className="grid md:grid-cols-3 gap-4">
          <input
            placeholder="City *"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="border p-3 rounded-lg"
          />
          <input
            placeholder="State"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            className="border p-3 rounded-lg"
          />
          <input
            placeholder="Pincode *"
            value={form.pincode}
            onChange={(e) => setForm({ ...form, pincode: e.target.value })}
            className="border p-3 rounded-lg"
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" id="save" defaultChecked />
          <label htmlFor="save">Save this address for future orders</label>
        </div>

        <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90">
          Save & Continue to Checkout
        </button>
      </form>
    </div>
  );
}
