import api from "./api";

// Get current user's cart
export const getCart = async () => {
  const { data } = await api.get("/cart");
  return data.cart;
};

// Add item to cart
export const addToCart = async (medicineId, quantity = 1) => {
  const { data } = await api.post("/cart/add", { medicineId, quantity });
  return data.cart;
};

// Update item quantity
export const updateCartItem = async (medicineId, quantity) => {
  const { data } = await api.put("/cart/update", { medicineId, quantity });
  return data.cart;
};

// Remove item from cart
export const removeFromCart = async (medicineId) => {
  const { data } = await api.delete(`/cart/remove/${medicineId}`);
  return data.cart;
};

// Clear entire cart
export const clearCart = async () => {
  const { data } = await api.delete("/cart/clear");
  return data.cart;
};
