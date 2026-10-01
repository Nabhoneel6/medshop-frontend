import { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  getStoredUser,
  fetchProfile,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(false);

  // On mount, refresh user from server (in case role/data changed)
  useEffect(() => {
    const refresh = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const freshUser = await fetchProfile();
        setUser(freshUser);
        localStorage.setItem("user", JSON.stringify(freshUser));
      } catch {
        // Invalid token — clear it
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
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
