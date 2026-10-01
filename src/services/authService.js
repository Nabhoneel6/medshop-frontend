import api from "./api";

// Register new user
export const registerUser = async (userData) => {
  const { data } = await api.post("/auth/register", userData);
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
};

// Login user
export const loginUser = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get current user from localStorage
export const getStoredUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Get token
export const getToken = () => localStorage.getItem("token");

// Fetch latest profile from server
export const fetchProfile = async () => {
  const { data } = await api.get("/auth/me");
  return data.user;
};
