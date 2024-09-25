import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGetProduct } from "../hooks/useGetProduct";
import { useUpdateCart } from "../hooks/useUpdateCart";
import LoadingScreen from "../components/LoadingScreen";
import { BsBag } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";

const DetailsPage = () => {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const { product, isLoading } = useGetProduct(id);
  const { updateCart } = useUpdateCart();

  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Create item object with selected options
  const item = {
    // userId:
    productId: id,
    name: product?.name,
    price: product?.price,
    color: selectedColor,
    size: selectedSize,
    quantity,
    imageUrl: product?.imageUrl
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!user) return navigate("/auth/signin");
    
    try {
      setIsAdding(true);

      toast.loading("Loading...", {
        position: "top-center"
      });

      const response = await fetch("/api/cart/", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      });

      toast.dismiss();

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        toast.error("Error");
      }

      if (response.ok) {
        updateCart(user);
        toast.success("Success");
        setError(null);
      }
    } catch (err) {
      setError("Error adding to cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <main className="mx-auto w-[90%] max-w-[1026px]">
      <Toaster />
      <section className="py-16 md:py-28">
        <h2 className="text-2xl mb-4 md:mb-6 font-extrabold tracking-tight">
          Details page
        </h2>
        <form onSubmit={handleSubmit} className="md:flex gap-8 justify-center">
          {/* Image */}
          <div className="aspect-square rounded overflow-hidden mb-4 md:mb-0">
            <img
              src={product?.imageUrl}
              alt={product?.name || "Product image"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="max-w-[500px] w-full">
            <h2 className="text-2xl font-semibold mb-2 tracking-tight">
              {product?.name}
            </h2>
            <span className="block mb-4 font-bold text-gray-700">
              ${product?.price}
            </span>
            <p className="mb-2 md:mb-8 text-gray-600">{product?.description}</p>

            {/* Color Selector */}
            <p className="mb-2 text-sm text-gray-600">Color</p>
            <div className="selection flex items-center relative flex-wrap gap-2 mb-4 md:mb-8">
              {["black", "white", "blue"].map(color => (
                <label
                  key={color}
                  className={`px-5 py-2 ring-1 rounded text-sm select-none cursor-pointer
                    ${
                      selectedColor === color
                        ? "bg-black text-white ring-black"
                        : "hover:bg-gray-100 ring-gray-400"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    className="opacity-0 absolute"
                    required
                    onChange={() => setSelectedColor(color)}
                  />
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </label>
              ))}
            </div>

            {/* Size Selector */}
            <p className="mb-2 text-sm text-gray-600">Size</p>
            <div className="selection flex items-center gap-3 flex-wrap mb-6">
              {["small", "medium", "large"].map(size => (
                <label
                  key={size}
                  className={`px-5 py-2 ring-1 rounded text-sm select-none cursor-pointer
                    ${
                      selectedSize === size
                        ? "bg-black text-white ring-black"
                        : "hover:bg-gray-100 ring-gray-400"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    className="opacity-0 absolute"
                    required
                    onChange={() => setSelectedSize(size)}
                  />
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </label>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="mb-4 md:mb-8">
              <p className="mb-2 text-sm text-gray-600">Quantity</p>
              <div className="w-fit ring-gray-400 overflow-hidden ring-1 rounded text-sm select-none flex items-center">
                <button
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  type="button"
                  className="hover:bg-gray-100 py-2 px-4"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  type="button"
                  className="hover:bg-gray-100 py-2 px-4"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              type="submit"
              className="w-full transition-colors flex items-center gap-2 justify-center rounded bg-black px-6 hover:bg-gray-950 py-3 text-white"
              disabled={isAdding}
            >
              <BsBag />
              <span>{"Add to cart"}</span>
            </button>
            {error && <div>{error}</div>}
          </div>
        </form>
      </section>
    </main>
  );
};

export default DetailsPage;
