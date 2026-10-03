import api from "./api";

// ========== ORDERS ==========
export const getAllOrders = async (status = "") => {
  const params = status ? { status } : {};
  const { data } = await api.get("/orders", { params });
  return data.orders;
};

export const updateOrderStatus = async (orderId, status) => {
  const { data } = await api.put(`/orders/${orderId}/status`, { status });
  return data.order;
};

// ========== USERS ==========
export const getAllUsers = async () => {
  const { data } = await api.get("/admin/users");
  return data.users;
};

export const toggleBlockUser = async (userId) => {
  const { data } = await api.put(`/admin/users/${userId}/block`);
  return data;
};

// ========== STATS ==========
export const getStats = async () => {
  const { data } = await api.get("/admin/stats");
  return data;
};

// ========== MEDICINES ==========
export const getAllMedicinesAdmin = async () => {
  const { data } = await api.get("/medicines");
  return data.medicines;
};

export const createMedicine = async (medicineData) => {
  const { data } = await api.post("/medicines", medicineData);
  return data.medicine;
};

export const updateMedicine = async (id, medicineData) => {
  const { data } = await api.put(`/medicines/${id}`, medicineData);
  return data.medicine;
};

export const deleteMedicine = async (id) => {
  const { data } = await api.delete(`/medicines/${id}`);
  return data;
};

// ========== CATEGORIES ==========
export const getCategoriesAdmin = async () => {
  const { data } = await api.get("/categories");
  return data.categories;
};

// ========== DOCTORS ==========
export const getAllDoctorsAdmin = async () => {
  const { data } = await api.get("/doctors");
  return data.doctors;
};

export const createDoctor = async (doctorData) => {
  const { data } = await api.post("/doctors", doctorData);
  return data.doctor;
};

export const updateDoctor = async (id, doctorData) => {
  const { data } = await api.put(`/doctors/${id}`, doctorData);
  return data.doctor;
};

export const deleteDoctor = async (id) => {
  const { data } = await api.delete(`/doctors/${id}`);
  return data;
};
