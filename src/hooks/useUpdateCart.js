import { useAuthContext } from "./useAuthContext";
import { useCartContext } from "./useCartContext";

export const useUpdateCart = () => {
  const { user } = useAuthContext()
  const { dispatch } = useCartContext();

  const updateCart = async () => {
    try {
      const response = await fetch("/api/cart/", {
        headers: { Authorization: `Bearer ${user?.token}` }
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CART_ITEMS", payload: data });
        console.log("Cart updated: ", data);
      }
    } catch (err) {
      console.error("Error fetching cart items: ", err);
    }
  };

  return { updateCart };
};
