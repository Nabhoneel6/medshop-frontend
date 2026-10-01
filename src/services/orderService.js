import api from "./api";

// Place order
export const placeOrder = async (orderData) => {
  const { data } = await api.post("/orders", orderData);
  return data.order;
};

// Get logged-in user's orders
export const getMyOrders = async () => {
  const { data } = await api.get("/orders/my");
  return data.orders;
};

// Get single order
export const getOrderById = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data.order;
};

// Cancel order
export const cancelOrder = async (id) => {
  const { data } = await api.put(`/orders/${id}/cancel`);
  return data.order;
};
