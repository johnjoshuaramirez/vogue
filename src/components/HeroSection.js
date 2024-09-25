import { Link } from "react-router-dom";
import HeroImage from "./HeroImage";

const HeroSection = () => {
  return (
    <main className="h-[100vh] flex flex-col isolate">
      <section className="grow">
        <div className="w-[90%] mx-auto max-w-[1026px] h-full flex items-center relative overflow-hidden">
          <div className="w-fit mb-32 z-20">
            <h1 className="text-5xl max-w-[13ch] font-black tracking-tight">
              Summer styles are finally here
            </h1>
            <p className="max-w-md mt-4 text-gray-600">
              Shop the latest styles at our apparel store! From trendy tops to
              stylish bottoms, we have the perfect outfits for every occasion.
            </p>
            <Link to="/api/products" className="bg-black rounded px-6 py-3 hover:bg-gray-950 transition-all text-white text-sm mt-6 block w-fit">
              Shop now
            </Link>
          </div>
          <HeroImage />
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
