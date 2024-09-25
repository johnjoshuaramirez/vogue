import { useAuthContext } from "./useAuthContext";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export const useSignout = () => {
  const { dispatch: dispatchAuth } = useAuthContext();
  const { dispatch: dispatchCart } = useContext(CartContext);
  const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    dispatchAuth({ type: "LOG_OUT" });
    dispatchCart({ type: "CLEAR_CART_ITEMS" });
    
    navigate("/");
  };

  return { signout };
};
