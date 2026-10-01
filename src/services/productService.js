import api from "./api";

// Get all medicines (with optional filters)
export const getMedicines = async (params = {}) => {
  const { data } = await api.get("/medicines", { params });
  return data; // { count, medicines }
};

// Get single medicine by ID
export const getMedicineById = async (id) => {
  const { data } = await api.get(`/medicines/${id}`);
  return data.medicine;
};

// Get all categories
export const getCategories = async () => {
  const { data } = await api.get("/categories");
  return data; // { count, categories }
};

// Search medicines by text
export const searchMedicines = async (query) => {
  const { data } = await api.get("/medicines", { params: { search: query } });
  return data;
};
