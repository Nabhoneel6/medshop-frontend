import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const image =
    product.images?.[0] || "https://via.placeholder.com/300x300?text=Medicine";
  const id = product._id || product.id;

  const handleAdd = async () => {
    try {
      await addToCart(product);
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(err.message || "Failed to add to cart");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <p className="text-xs text-gray-500">{product.brand}</p>
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-primary line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-lg font-bold text-primary">
            ₹{product.price}
          </span>
          {product.mrp > product.price && (
            <span className="text-sm text-gray-400 line-through">
              ₹{product.mrp}
            </span>
          )}
        </div>
        <button
          onClick={handleAdd}
          className="mt-3 w-full bg-primary text-white py-2 rounded-lg hover:opacity-90"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
