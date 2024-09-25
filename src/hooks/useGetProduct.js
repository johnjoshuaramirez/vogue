import { useEffect, useState } from "react";

export const useGetProduct = productId => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProduct = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/products/${productId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }

      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError("Failed to load product details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (productId) getProduct();
  }, [productId]);

  return { getProduct, product, isLoading, error };
};
