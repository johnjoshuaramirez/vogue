import { CurrentUserContext } from "../context/CurrentUserContext";
import { useContext } from "react";

export const useCurrentUserContext = () => {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw Error("useCurrentUserContext must be used inside a CurrentUserContextProvider");
  }

  return context;
};
