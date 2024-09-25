import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

const ProtectedAuth = ({ children }) => {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedAuth;
