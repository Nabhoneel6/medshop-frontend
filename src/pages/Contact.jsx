import { useState } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      return toast.error("Please fill all fields");
    }
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
          <p>We're here to help — 24/7</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center text-primary">
                <FiPhone size={22} />
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-gray-600 text-sm">+91 98765 43210</p>
                <p className="text-gray-600 text-sm">+91 98765 43211</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center text-primary">
                <FiMail size={22} />
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-600 text-sm">support@medshop.com</p>
                <p className="text-gray-600 text-sm">care@medshop.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center text-primary">
                <FiMapPin size={22} />
              </div>
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-gray-600 text-sm">
                  MedShop HQ, 4th Floor, Tech Park,
                  <br />
                  Bangalore, Karnataka 560001
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-sky-50 rounded-lg">
            <h3 className="font-semibold mb-2">Working Hours</h3>
            <p className="text-sm text-gray-700">
              Monday - Saturday: 8:00 AM - 10:00 PM
            </p>
            <p className="text-sm text-gray-700">Sunday: 10:00 AM - 6:00 PM</p>
            <p className="text-sm text-emerald-600 font-semibold mt-2">
              Emergency support: 24/7
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border p-3 rounded-lg"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border p-3 rounded-lg"
            />
            <textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              className="w-full border p-3 rounded-lg"
            />
            <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
