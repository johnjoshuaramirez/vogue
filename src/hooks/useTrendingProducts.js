import { useEffect, useState } from "react";
import BASE_URL from "../utils/config";

export const useTrendingProducts = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(BASE_URL + "api/products/trending");

        if (!response.ok) {
          throw new Error("Failed to fetch trending products");
        }

        const data = await response.json();
        setTrendingProducts(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching trending products: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingProducts()
  }, []);

  return { trendingProducts, isLoading, error };
};