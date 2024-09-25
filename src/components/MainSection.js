import CategorySection from "./CategorySection";
import TrendingSection from "./TrendingSection";

const MainSection = () => {
  return (
    <main className="mx-auto w-[90%] max-w-[1026px]">
      <CategorySection />
      <TrendingSection />
    </main>
  );
};

export default MainSection;