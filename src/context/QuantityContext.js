import { createContext, useReducer } from "react";

const quantityReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { quantity: state.quantity + 1 };
    case "DECREMENT":
      return { quantity: Math.max(1, state.quantity - 1) };
    default:
      return state;
  }
};

export const QuantityContext = createContext();

export const QuantityContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quantityReducer, { quantity: 1 });

  return (
    <QuantityContext.Provider value={{ state, dispatch }}>
      {children}
    </QuantityContext.Provider>
  );
};