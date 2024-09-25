import { createContext, useReducer } from "react";

const currentUserReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return { currentUser: action.payload };
    default:
      return state;
  }
};

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(currentUserReducer, {
    currentUser: null
  });
  return (
    <CurrentUserContext.Provider value={{ state, dispatch }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
