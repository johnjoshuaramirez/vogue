import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState(search || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = "/api/products";

        if (category || search) {
          const params = new URLSearchParams();
          if (category) params.append("category", category);
          if (search) params.append("search", search);
          url += `?${params.toString()}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, search]);

  const handleSort = e => {
    const sortValue = e.target.value;

    let sortedProducts = [...products];

    switch (sortValue) {
      case "asc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "desc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "new":
        sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "old":
        sortedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        sortedProducts = [...products];
        break;
    }

    setProducts(sortedProducts);
  };

  const handleSearch = e => {
    e.preventDefault();

    // Update the search query in the URL
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (searchText) params.append("search", searchText);

    navigate({ pathname: "/api/products", search: params.toString() });
  };

  return (
    <main className="mx-auto w-[90%] max-w-[1026px]">
      <section className="py-16 md:py-28">
        <h2 className="text-2xl tracking-tight font-extrabold mb-4">
          Products
        </h2>
        <div>
          <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
            <input
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              type="text"
              placeholder="Search item"
              className="text-sm ring-1 ring-gray-200 focus:ring-gray-400 outline-none block w-full max-w-[400px] px-5 py-2 rounded"
            />
            <button
              type="submit"
              className="rounded py-2 px-5 bg-black text-white text-sm"
            >
              Search
            </button>
          </form>
          <ul className="flex items-center gap-3 mb-4 overflow-x-auto sm:overflow-x-visible py-2">
            <li>
              <Link
                to="/api/products"
                className={`rounded py-2 px-5 transition-colors text-sm ${
                  !category
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 text-slate-700 ring-1 ring-gray-200"
                } `}
              >
                All
              </Link>
            </li>
            <li>
              <Link
                to={{ pathname: "/api/products", search: "?category=baby" }}
                className={`rounded py-2 px-5 transition-colors text-sm ${
                  category === "baby"
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 text-slate-700 ring-1 ring-gray-200"
                } `}
              >
                Baby
              </Link>
            </li>
            <li>
              <Link
                to={{ pathname: "/api/products", search: "?category=kids" }}
                className={`rounded py-2 px-5 transition-colors text-sm ${
                  category === "kids"
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 text-slate-700 ring-1 ring-gray-200"
                } `}
              >
                Kids
              </Link>
            </li>
            <li>
              <Link
                to={{ pathname: "/api/products", search: "?category=men" }}
                className={`rounded py-2 px-5 transition-colors text-sm ${
                  category === "men"
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 text-slate-700 ring-1 ring-gray-200"
                } `}
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                to={{ pathname: "/api/products", search: "?category=women" }}
                className={`rounded py-2 px-5 transition-colors text-sm ${
                  category === "women"
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 text-slate-700 ring-1 ring-gray-200"
                } `}
              >
                Women
              </Link>
            </li>
          </ul>
          <div>
            <select
              onChange={e => handleSort(e)}
              defaultValue={"sort"}
              className="bg-transparent mb-12 text-sm outline-none ring-gray-200 ring-1 focus:ring-gray-400 px-5 py-2 rounded"
            >
              <option value="sort" disabled>
                Sort by
              </option>
              <option value="desc">Price ↑</option>
              <option value="asc"> Price ↓</option>
              <option value="new">Newest</option>
              <option value="old">Oldest</option>
            </select>
          </div>
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
              <Link key={product._id} to={`/api/products/${product._id}`}>
                <div className="rounded overflow-hidden aspect-square">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-600 text-sm md:text-base">
                  {product.name}
                </p>
                <span className="block font-semibold">${product.price}</span>
              </Link>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
