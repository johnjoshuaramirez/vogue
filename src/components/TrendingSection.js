import TrendingItem from "./TrendingItem";
import { useTrendingProducts } from "../hooks/useTrendingProducts";

const TrendingSection = () => {
  const { trendingProducts } = useTrendingProducts();

  return (
    <div className="py-24">
      <h2 className="text-2xl tracking-tight font-extrabold mb-4">
        Trending Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {trendingProducts.map(product => (
          <TrendingItem
            key={product._id}
            id={product._id}
            imageURL={product.imageUrl}
            alt={product.alt}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;