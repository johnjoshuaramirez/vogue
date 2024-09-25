import { createContext, useReducer, useEffect } from "react";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART_ITEMS": {
      return [...action.payload];
    }
    case "CLEAR_CART_ITEMS": {
      return [];
    }
    case "ADD_CART_ITEM": {
      const product = action.payload;

      // Check if the item already exists in the cart
      const existingCartItem = state.find(
        item =>
          item.productId === product.productId &&
          item.color === product.color &&
          item.size === product.size
      );

      // If it exists, update the quantity
      if (existingCartItem) {
        return state.map(item =>
          item.productId === product.productId &&
          item.color === product.color &&
          item.size === product.size
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }

      // Otherwise, add the new item to the cart
      return [...state, { ...product, quantity: product.quantity }];
    }

    case "INCREMENT": {
      const { productId, color, size } = action.payload;

      return state.map(item =>
        item.productId === productId &&
        item.color === color &&
        item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    case "DECREMENT": {
      const { productId, color, size } = action.payload;

      return state.map(item =>
        item.productId === productId &&
        item.color === color &&
        item.size === size
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) } // Ensure quantity never goes below 1
          : item
      );
    }

    case "DELETE": {
      const { productId, color, size } = action.payload;

      // Filter out the item to remove from the state
      return state.filter(
        item =>
          !(
            item.productId === productId &&
            item.color === color &&
            item.size === size
          )
      );
    }
    default:
      return state;
  }
};

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};