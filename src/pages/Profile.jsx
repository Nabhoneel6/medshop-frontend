import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const {
    user,
    isAuthenticated,
    updateProfile,
    changePassword,
    addAddress,
    deleteAddress,
  } = useAuth();

  const [tab, setTab] = useState("profile");

  // Profile form
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  // Password form
  const [pwForm, setPwForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Address form
  const [addrForm, setAddrForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileForm);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update");
    }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    if (pwForm.newPassword.length < 6) {
      return toast.error("New password must be at least 6 characters");
    }
    try {
      await changePassword(pwForm.currentPassword, pwForm.newPassword);
      toast.success("Password changed");
      setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change");
    }
  };

  const handleAddressAdd = async (e) => {
    e.preventDefault();
    if (
      !addrForm.name ||
      !addrForm.phone ||
      !addrForm.address ||
      !addrForm.city ||
      !addrForm.pincode
    ) {
      return toast.error("Please fill all required fields");
    }
    try {
      await addAddress(addrForm);
      toast.success("Address added");
      setAddrForm({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add");
    }
  };

  const handleAddressDelete = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      await deleteAddress(id);
      toast.success("Address deleted");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b overflow-x-auto">
        {["profile", "password", "addresses", "orders"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 font-medium capitalize border-b-2 -mb-px whitespace-nowrap ${
              tab === t
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* TAB: Profile */}
      {tab === "profile" && (
        <div className="bg-white p-6 rounded-lg shadow max-w-xl">
          <h2 className="text-xl font-bold mb-4">Personal Info</h2>
          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                value={user.email}
                disabled
                className="w-full border p-3 rounded-lg bg-gray-100 text-gray-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                value={profileForm.name}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, name: e.target.value })
                }
                className="w-full border p-3 rounded-lg"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <input
                value={profileForm.phone}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, phone: e.target.value })
                }
                className="w-full border p-3 rounded-lg"
              />
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90">
              Save Changes
            </button>
          </form>
        </div>
      )}

      {/* TAB: Password */}
      {tab === "password" && (
        <div className="bg-white p-6 rounded-lg shadow max-w-xl">
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <form onSubmit={handlePasswordSave} className="space-y-4">
            <input
              type="password"
              placeholder="Current password"
              value={pwForm.currentPassword}
              onChange={(e) =>
                setPwForm({ ...pwForm, currentPassword: e.target.value })
              }
              className="w-full border p-3 rounded-lg"
            />
            <input
              type="password"
              placeholder="New password"
              value={pwForm.newPassword}
              onChange={(e) =>
                setPwForm({ ...pwForm, newPassword: e.target.value })
              }
              className="w-full border p-3 rounded-lg"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={pwForm.confirmPassword}
              onChange={(e) =>
                setPwForm({ ...pwForm, confirmPassword: e.target.value })
              }
              className="w-full border p-3 rounded-lg"
            />
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90">
              Update Password
            </button>
          </form>
        </div>
      )}

      {/* TAB: Addresses */}
      {tab === "addresses" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Saved Addresses</h2>
            {!user.addresses || user.addresses.length === 0 ? (
              <p className="text-gray-500 text-sm">No addresses saved yet.</p>
            ) : (
              <div className="space-y-3">
                {user.addresses.map((a) => (
                  <div
                    key={a._id}
                    className="border p-3 rounded-lg flex justify-between items-start gap-2"
                  >
                    <div className="text-sm">
                      <p className="font-semibold">{a.name}</p>
                      <p className="text-gray-600">{a.address}</p>
                      <p className="text-gray-600">
                        {a.city}, {a.state} {a.pincode}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">📞 {a.phone}</p>
                    </div>
                    <button
                      onClick={() => handleAddressDelete(a._id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Add New Address</h2>
            <form onSubmit={handleAddressAdd} className="space-y-3">
              <input
                placeholder="Name *"
                value={addrForm.name}
                onChange={(e) =>
                  setAddrForm({ ...addrForm, name: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
              />
              <input
                placeholder="Phone *"
                value={addrForm.phone}
                onChange={(e) =>
                  setAddrForm({ ...addrForm, phone: e.target.value })
                }
                className="w-full border p-2 rounded-lg"
              />
              <textarea
                placeholder="Address *"
                value={addrForm.address}
                onChange={(e) =>
                  setAddrForm({ ...addrForm, address: e.target.value })
                }
                rows={2}
                className="w-full border p-2 rounded-lg"
              />
              <div className="grid grid-cols-3 gap-2">
                <input
                  placeholder="City *"
                  value={addrForm.city}
                  onChange={(e) =>
                    setAddrForm({ ...addrForm, city: e.target.value })
                  }
                  className="border p-2 rounded-lg"
                />
                <input
                  placeholder="State"
                  value={addrForm.state}
                  onChange={(e) =>
                    setAddrForm({ ...addrForm, state: e.target.value })
                  }
                  className="border p-2 rounded-lg"
                />
                <input
                  placeholder="Pincode *"
                  value={addrForm.pincode}
                  onChange={(e) =>
                    setAddrForm({ ...addrForm, pincode: e.target.value })
                  }
                  className="border p-2 rounded-lg"
                />
              </div>
              <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90">
                Add Address
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB: Orders */}
      {tab === "orders" && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">My Recent Orders</h2>
          <p className="text-sm text-gray-600 mb-4">
            View all your past orders and their statuses.
          </p>
          <Link
            to="/my-orders"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90"
          >
            View All Orders →
          </Link>
        </div>
      )}
    </div>
  );
}
