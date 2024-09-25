import { useState } from "react";
import { useCartContext } from "./useCartContext";
import { useAuthContext } from "./useAuthContext";
import BASE_URL from "../utils/config";

export const useCartActions = () => {
  const { dispatch } = useCartContext();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkout = async (e, orderDetails) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/api/cart/checkout`, {
        method: "POST",
        body: JSON.stringify(orderDetails),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to checkout order");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const remove = async cartItem => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/api/cart/`, {
        method: "DELETE",
        body: JSON.stringify(cartItem),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      dispatch({ type: "DELETE", payload: cartItem });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const increment = async cartItem => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/api/cart/increment`, {
        method: "PATCH",
        body: JSON.stringify(cartItem),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to increment item");
      }

      dispatch({ type: "INCREMENT", payload: cartItem });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const decrement = async cartItem => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/api/cart/decrement`, {
        method: "PATCH",
        body: JSON.stringify(cartItem),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to decrement item");
      }

      dispatch({ type: "DECREMENT", payload: cartItem });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    remove,
    increment,
    decrement,
    checkout,
    isLoading,
    error
  };
};
