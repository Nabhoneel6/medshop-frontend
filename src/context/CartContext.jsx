import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import * as cartApi from "../services/cartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart when login state changes
  useEffect(() => {
    const loadCart = async () => {
      if (!isAuthenticated) {
        setCart([]);
        return;
      }
      try {
        setLoading(true);
        const serverCart = await cartApi.getCart();
        setCart(serverCart.items || []);
      } catch (err) {
        console.error("Load cart error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, [isAuthenticated]);

  // Add to cart
  const addToCart = async (medicine) => {
    if (!isAuthenticated) {
      throw new Error("Please login to add items to cart");
    }
    const id = medicine._id || medicine.id;
    const updated = await cartApi.addToCart(id, 1);
    setCart(updated.items || []);
    return updated;
  };

  // Update quantity
  const updateQty = async (medicineId, qty) => {
    const updated = await cartApi.updateCartItem(medicineId, qty);
    setCart(updated.items || []);
  };

  // Remove item
  const removeFromCart = async (medicineId) => {
    const updated = await cartApi.removeFromCart(medicineId);
    setCart(updated.items || []);
  };

  // Clear all
  const clearCart = async () => {
    await cartApi.clearCart();
    setCart([]);
  };

  // Derived totals
  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0,
  );
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        total,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
