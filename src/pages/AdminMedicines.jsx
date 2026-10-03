import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi";
import {
  getAllMedicinesAdmin,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  getCategoriesAdmin,
} from "../services/adminService";

const emptyForm = {
  name: "",
  brand: "",
  category: "",
  price: "",
  mrp: "",
  stock: "",
  description: "",
  composition: "",
  dosage: "",
  manufacturer: "",
  requiresPrescription: false,
  images: "",
};

export default function AdminMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = async () => {
    setLoading(true);
    try {
      const [meds, cats] = await Promise.all([
        getAllMedicinesAdmin(),
        getCategoriesAdmin(),
      ]);
      setMedicines(meds);
      setCategories(cats);
    } catch (err) {
      toast.error("Failed to load data");
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

  const openEdit = (m) => {
    setEditingId(m._id);
    setForm({
      name: m.name || "",
      brand: m.brand || "",
      category: m.category?._id || m.category || "",
      price: m.price || "",
      mrp: m.mrp || "",
      stock: m.stock || "",
      description: m.description || "",
      composition: m.composition || "",
      dosage: m.dosage || "",
      manufacturer: m.manufacturer || "",
      requiresPrescription: m.requiresPrescription || false,
      images: m.images?.[0] || "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.brand ||
      !form.category ||
      !form.price ||
      !form.stock
    ) {
      return toast.error("Fill all required fields");
    }

    const payload = {
      ...form,
      price: Number(form.price),
      mrp: Number(form.mrp) || Number(form.price),
      stock: Number(form.stock),
      images: form.images ? [form.images] : [],
    };

    try {
      if (editingId) {
        await updateMedicine(editingId, payload);
        toast.success("Medicine updated");
      } else {
        await createMedicine(payload);
        toast.success("Medicine added");
      }
      setShowModal(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save");
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await deleteMedicine(id);
      toast.success("Medicine deleted");
      load();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const filtered = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.brand.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Medicines</h1>
          <p className="text-sm text-gray-600">Total: {medicines.length}</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90"
        >
          <FiPlus /> Add Medicine
        </button>
      </div>

      <input
        type="text"
        placeholder="Search medicines..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-80 border p-2 rounded-lg mb-4"
      />

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : filtered.length === 0 ? (
        <p className="text-center py-12 text-gray-500">No medicines.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Brand</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Rx</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m._id} className="border-t">
                  <td className="p-3">
                    <img
                      src={m.images?.[0] || "https://via.placeholder.com/40"}
                      alt={m.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                  </td>
                  <td className="p-3 font-medium">{m.name}</td>
                  <td className="p-3 text-gray-600">{m.brand}</td>
                  <td className="p-3 text-gray-600">
                    {m.category?.name || "—"}
                  </td>
                  <td className="p-3 font-semibold text-primary">₹{m.price}</td>
                  <td className="p-3">
                    <span
                      className={
                        m.stock < 20 ? "text-red-500 font-semibold" : ""
                      }
                    >
                      {m.stock}
                    </span>
                  </td>
                  <td className="p-3">
                    {m.requiresPrescription ? (
                      <span className="text-red-500 text-xs font-semibold">
                        Yes
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">No</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(m)}
                        className="text-primary hover:text-sky-700"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(m._id, m.name)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
              <h2 className="text-lg font-bold">
                {editingId ? "Edit Medicine" : "Add Medicine"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <FiX size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  placeholder="Name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border p-2 rounded-lg"
                />
                <input
                  placeholder="Brand *"
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  className="border p-2 rounded-lg"
                />
              </div>

              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border p-2 rounded-lg"
              >
                <option value="">Select Category *</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-3 gap-3">
                <input
                  type="number"
                  placeholder="Price *"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="border p-2 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="MRP"
                  value={form.mrp}
                  onChange={(e) => setForm({ ...form, mrp: e.target.value })}
                  className="border p-2 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Stock *"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className="border p-2 rounded-lg"
                />
              </div>

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={2}
                className="w-full border p-2 rounded-lg"
              />

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  placeholder="Composition"
                  value={form.composition}
                  onChange={(e) =>
                    setForm({ ...form, composition: e.target.value })
                  }
                  className="border p-2 rounded-lg"
                />
                <input
                  placeholder="Dosage"
                  value={form.dosage}
                  onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                  className="border p-2 rounded-lg"
                />
              </div>

              <input
                placeholder="Manufacturer"
                value={form.manufacturer}
                onChange={(e) =>
                  setForm({ ...form, manufacturer: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
              />

              <input
                placeholder="Image URL"
                value={form.images}
                onChange={(e) => setForm({ ...form, images: e.target.value })}
                className="w-full border p-2 rounded-lg"
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.requiresPrescription}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      requiresPrescription: e.target.checked,
                    })
                  }
                />
                Requires Prescription
              </label>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold"
                >
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
