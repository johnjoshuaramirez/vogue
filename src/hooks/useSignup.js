import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/config";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  
  const navigate = useNavigate();

  const signup = async (email, firstName, lastName, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, firstName, lastName, password })
    });

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));

      setIsLoading(false);

      navigate("/auth/signin");
    }
  };

  return { signup, isLoading, error };
};