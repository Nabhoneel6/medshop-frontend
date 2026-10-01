import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getMedicineById } from "../services/productService";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMedicineById(id);
        setProduct(data);
      } catch (err) {
        console.error("Failed to load medicine:", err);
        toast.error("Medicine not found");
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  const handleAdd = async () => {
    if (product.stock <= 0) return toast.error("Out of stock");
    try {
      await addToCart(product);
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(err.message || "Failed to add to cart");
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="mb-4">Product not found.</p>
        <Link to="/shop" className="text-primary font-semibold">
          ← Back to Shop
        </Link>
      </div>
    );
  }

  const image =
    product.images?.[0] || "https://via.placeholder.com/400x400?text=Medicine";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/shop" className="text-primary text-sm">
        ← Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mt-4">
        <img src={image} alt={product.name} className="rounded-lg w-full" />

        <div>
          <p className="text-sm text-gray-500">{product.brand}</p>
          <h1 className="text-3xl font-bold mt-1">{product.name}</h1>

          {product.requiresPrescription && (
            <span className="inline-block mt-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
              Prescription Required
            </span>
          )}

          <div className="flex items-center gap-3 mt-4">
            <span className="text-3xl font-bold text-primary">
              ₹{product.price}
            </span>
            {product.mrp > product.price && (
              <span className="text-lg text-gray-400 line-through">
                ₹{product.mrp}
              </span>
            )}
          </div>

          <p className="mt-4 text-gray-700">{product.description}</p>

          <div className="mt-6 space-y-2 text-sm">
            {product.composition && (
              <p>
                <strong>Composition:</strong> {product.composition}
              </p>
            )}
            {product.dosage && (
              <p>
                <strong>Dosage:</strong> {product.dosage}
              </p>
            )}
            {product.manufacturer && (
              <p>
                <strong>Manufacturer:</strong> {product.manufacturer}
              </p>
            )}
            <p>
              <strong>Stock:</strong>{" "}
              {product.stock > 0 ? (
                <span className="text-emerald-600">
                  {product.stock} available
                </span>
              ) : (
                <span className="text-red-500">Out of stock</span>
              )}
            </p>
          </div>

          <button
            onClick={handleAdd}
            disabled={product.stock <= 0}
            className="mt-6 w-full md:w-auto bg-primary text-white px-8 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
