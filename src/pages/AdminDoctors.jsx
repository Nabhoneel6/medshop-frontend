import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi";
import {
  getAllDoctorsAdmin,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../services/adminService";

const emptyForm = {
  name: "",
  specialty: "",
  qualification: "",
  experience: "",
  fee: "",
  rating: "4.5",
  image: "",
  about: "",
};

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = async () => {
    setLoading(true);
    try {
      const data = await getAllDoctorsAdmin();
      setDoctors(data);
    } catch (err) {
      toast.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (d) => {
    setEditingId(d._id);
    setForm({
      name: d.name || "",
      specialty: d.specialty || "",
      qualification: d.qualification || "",
      experience: d.experience || "",
      fee: d.fee || "",
      rating: d.rating || "4.5",
      image: d.image || "",
      about: d.about || "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.specialty || !form.fee) {
      return toast.error("Name, specialty, and fee required");
    }

    const payload = {
      ...form,
      fee: Number(form.fee),
      rating: Number(form.rating),
    };

    try {
      if (editingId) {
        await updateDoctor(editingId, payload);
        toast.success("Doctor updated");
      } else {
        await createDoctor(payload);
        toast.success("Doctor added");
      }
      setShowModal(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await deleteDoctor(id);
      toast.success("Doctor deleted");
      load();
    } catch (err) {
      toast.error("Failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Doctors</h1>
          <p className="text-sm text-gray-600">Total: {doctors.length}</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90"
        >
          <FiPlus /> Add Doctor
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : doctors.length === 0 ? (
        <p className="text-center py-12 text-gray-500">No doctors.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((d) => (
            <div key={d._id} className="bg-white rounded-lg shadow p-4">
              <div className="flex gap-3">
                <img
                  src={d.image || "https://via.placeholder.com/60"}
                  alt={d.name}
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{d.name}</h3>
                  <p className="text-sm text-emerald-600">{d.specialty}</p>
                  <p className="text-xs text-gray-500">
                    {d.experience} · {d.qualification}
                  </p>
                  <p className="text-xs text-yellow-600 mt-1">⭐ {d.rating}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <span className="font-bold text-primary">₹{d.fee}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(d)}
                    className="text-primary hover:text-sky-700"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(d._id, d.name)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
              <h2 className="text-lg font-bold">
                {editingId ? "Edit Doctor" : "Add Doctor"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <FiX size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              <input
                placeholder="Doctor Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border p-2 rounded-lg"
              />
              <input
                placeholder="Specialty *"
                value={form.specialty}
                onChange={(e) =>
                  setForm({ ...form, specialty: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
              />
              <input
                placeholder="Qualification"
                value={form.qualification}
                onChange={(e) =>
                  setForm({ ...form, qualification: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
              />
              <input
                placeholder="Experience (e.g. 5+ years)"
                value={form.experience}
                onChange={(e) =>
                  setForm({ ...form, experience: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Fee *"
                  value={form.fee}
                  onChange={(e) => setForm({ ...form, fee: e.target.value })}
                  className="border p-2 rounded-lg"
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="Rating (0-5)"
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
                  className="border p-2 rounded-lg"
                />
              </div>
              <input
                placeholder="Image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full border p-2 rounded-lg"
              />
              <textarea
                placeholder="About"
                value={form.about}
                onChange={(e) => setForm({ ...form, about: e.target.value })}
                rows={2}
                className="w-full border p-2 rounded-lg"
              />

              <div className="flex gap-3 pt-3">
                <button className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold">
                  {editingId ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 border rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
