import { Link } from "react-router-dom";

const TrendingItem = ({ imageURL, alt, name, price, id }) => {
  return (
    <Link to={`/api/products/${id}`} >
      <div className="rounded overflow-hidden aspect-square">
        <img src={imageURL} alt={alt} className="w-full h-full object-cover" />
      </div>
      <p className="text-sm text-gray-600 md:text-base">{name}</p>
      <span className="block font-semibold">${price}</span>
    </Link>
  );
};

export default TrendingItem;