import { useAuthContext } from "./useAuthContext";
import { useCurrentUserContext } from "./useCurrentUserContext";
import BASE_URL from "../utils/config";

export const useGetUser = () => {
  const { user } = useAuthContext()
  const { dispatch } = useCurrentUserContext()

  const getUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_USER_DATA", payload: data });
        console.log("Success fetching user data: ", data);
      }
    } catch (err) {
      console.error("Error fetching user data: ", err);
    }
  };

  return { getUser };
};
