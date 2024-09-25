import { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import MainSection from "../components/MainSection";
import { useUpdateCart } from "../hooks/useUpdateCart";
import { useGetUser } from "../hooks/useGetUser";
import { useAuthContext } from "../hooks/useAuthContext";

const HomePage = () => {
  const { user } = useAuthContext();
  const { updateCart } = useUpdateCart();
  const { getUser } = useGetUser();

  useEffect(() => {
    if (user) {
      updateCart();
      getUser();
    }
  }, []);

  return (
    <>
      <HeroSection />
      <MainSection />
    </>
  );
};

export default HomePage;
