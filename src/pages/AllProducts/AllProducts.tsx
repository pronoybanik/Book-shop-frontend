import { useState } from "react";
import { useGetAllProductQuery } from "../../redux/features/product/productApi";
import { Link } from "react-router-dom";

// Define the product type
interface TProduct {
  _id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string; // Add category to filter by
}

const ProductSection = () => {
  const { data, error, isLoading } = useGetAllProductQuery(undefined);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  // Filter and sort the products based on search term, category, and sort order
  const filteredProducts = data?.data
    .filter((product: TProduct) => {
      const matchesSearchTerm = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      return matchesSearchTerm && matchesCategory;
    })
    .sort((a: TProduct, b: TProduct) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <section>
      <div className="relative lg:h-[300px] md:h-[400px] h-80 bg-[url(https://images.unsplash.com/photo-1607473129014-0afb7ed09c3a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ym9va3MlMjBpbWFlZ3xlbnwwfHwwfHx8MA%3D%3D)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/20 sm:from-black/50 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="flex items-center justify-center h-full">
          <div className="relative px-4">
            <p className="text-white max-w-screen-sm text-center lg:text-4xl md:text-3xl text-2xl sm:text-xl">
              Get Lost in Our Book Collection
            </p>
          </div>
        </div>
      </div>

      <div className="text-center text-lg py-2 my-8">
        <p className="text-4xl uppercase text-black inline-block border-b-2 border-[#e95b5b]">
          Our books
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-4 flex flex-col sm:flex-row justify-between gap-4">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full sm:w-1/3 p-2 border border-gray-300 rounded"
          />

          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full sm:w-1/3 p-2 border border-gray-300 rounded"
          >
            <option value="">All Categories</option>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="SelfDevelopment">Self Development</option>
            <option value="Poetry">Poetry</option>
            <option value="Religious">Religious</option>
          </select>

          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="w-full sm:w-1/3 p-2 border border-gray-300 rounded"
          >
            <option value="">Sort by Price</option>
            <option value="asc"> Low to High</option>
            <option value="desc"> High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts?.map((product: TProduct) => (
            <Link key={product._id} to={`/productDetails/${product._id}`}>
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
                  src={product?.image}
                  alt={product.title}
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
    </section>
  );
};

export default ProductSection;
