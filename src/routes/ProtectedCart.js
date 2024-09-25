import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

const ProtectedCart = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/auth/signin" />;
  }

  return children;
};

export default ProtectedCart;
