import api from "./api";

// Get all orders (admin)
export const getAllOrders = async (status = "") => {
  const params = status ? { status } : {};
  const { data } = await api.get("/orders", { params });
  return data.orders;
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  const { data } = await api.put(`/orders/${orderId}/status`, { status });
  return data.order;
};
