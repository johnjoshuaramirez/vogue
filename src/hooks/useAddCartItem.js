import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAddCartItem = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate()

  const addCartItem = async (item, user) => {
    setIsLoading(true);
    setError(null);

    if (!user) {
      navigate("/auth/signin");
    } else {
      dispatch({ type: "ADD_TO_CART", payload: item });
    }

    const response = await fetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      setIsLoading(false);
      navigate("/auth/signin");
    }
  };

  return { addCartItem, isLoading, error };
};