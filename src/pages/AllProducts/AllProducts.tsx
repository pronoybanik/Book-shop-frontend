import { useState } from "react";
import { useGetAllProductQuery } from "../../redux/features/product/productApi";
import { Link } from "react-router-dom";

const ProductSection = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("price");
  const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(10);

  const { data, error, isLoading } = useGetAllProductQuery(undefined);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search and Filters Section */}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data?.map((product: any) => (
          <Link to={`/productDetails/${product._id}`}>
            <a href="#" className="group relative block overflow-hidden">
              <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
                <span className="sr-only">Wishlist</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>

              <img
                src="https://images.unsplash.com/photo-1628202926206-c63a34b1618f?q=80&w=2574&auto=format&fit=crop"
                alt=""
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
              />

              <div className="relative border border-gray-100 bg-white p-6">
                <p className="text-gray-700">TK {product?.price}</p>

                <h3 className="mt-1.5 text-lg font-medium text-gray-900">
                  {product?.title}
                </h3>

                <p className="mt-1.5 line-clamp-3 text-gray-700">
                  {product?.description}
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
