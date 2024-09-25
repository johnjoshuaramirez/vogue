import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useSignin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const signin = async (email, password) => {
    setIsLoading(true);
    setError(null);

    toast.loading("Loading...", {
      duration: 1000,
      position: "top-center"
    });

    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    toast.dismiss();

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
      toast.error("Error");
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));

      toast.success("Success");

      dispatch({ type: "SIGN_IN", payload: data });

      setIsLoading(false);

      navigate("/");
    }
  };

  return { signin, isLoading, error };
};
