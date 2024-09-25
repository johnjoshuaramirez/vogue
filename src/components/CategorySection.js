import CategoryItem from "./CategoryItem";

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      imageUrl: "https://i.ibb.co/Q8T2hFx/baby1.webp",
      path: "baby",
      name: "Baby"
    },
    {
      id: 2,
      imageUrl: "https://i.ibb.co/Qdvczn8/kids1.webp",
      path: "kids",
      name: "Kids"
    },
    {
      id: 3,
      imageUrl: "https://i.ibb.co/X7BBsdZ/men1.webp",
      path: "men",
      name: "Men"
    },
    {
      id: 4,
      imageUrl: "https://i.ibb.co/HB9V4LH/women1.webp",
      path: "women",
      name: "Women"
    }
  ];

  return (
    <div className="pb-24 md:py-24">
      <h2 className="text-2xl tracking-tight font-black mb-4">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map(category => (
          <CategoryItem
            key={category.id}
            imageUrl={category.imageUrl}
            path={category.path}
            name={category.name}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
