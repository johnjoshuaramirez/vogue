import { Link } from "react-router-dom";

const CategoryItem = ({ imageUrl, path, name }) => {
  return (
    <Link to={{ pathname: "/api/products", search: `?category=${path}` }} className="isolate relative rounded overflow-hidden aspect-[3/4]">
      <img
        src={imageUrl}
        alt={path}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
      />
      <div className="bg-gradient-to-t pointer-events-none to-transparent from-black/[.5] absolute inset-0 z-10"></div>
      <p className="font-medium bottom-4 z-10 left-1/2 -translate-x-1/2 text-white absolute">
        {name}
      </p>
    </Link>
  );
};

export default CategoryItem;
