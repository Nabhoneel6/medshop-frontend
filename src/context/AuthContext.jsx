import { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  getStoredUser,
  fetchProfile,
  updateProfile as updateProfileApi,
  changePassword as changePasswordApi,
  addAddress as addAddressApi,
  deleteAddress as deleteAddressApi,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(false);

  // On mount, refresh user from server
  useEffect(() => {
    const refresh = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const freshUser = await fetchProfile();
        setUser(freshUser);
        localStorage.setItem("user", JSON.stringify(freshUser));
      } catch {
        logoutUser();
        setUser(null);
      }
    };
    refresh();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, phone) => {
    setLoading(true);
    try {
      const data = await registerUser({ name, email, password, phone });
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  // Update profile (name, phone)
  const updateProfile = async (data) => {
    const updated = await updateProfileApi(data);
    setUser(updated);
    return updated;
  };

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    return await changePasswordApi(currentPassword, newPassword);
  };

  // Add address
  const addAddress = async (address) => {
    const updated = await addAddressApi(address);
    setUser((prev) => ({ ...prev, addresses: updated }));
    return updated;
  };

  // Delete address
  const deleteAddress = async (addressId) => {
    const updated = await deleteAddressApi(addressId);
    setUser((prev) => ({ ...prev, addresses: updated }));
    return updated;
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        addAddress,
        deleteAddress,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
