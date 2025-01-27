import { useState } from "react";
import { useGetAllProductQuery } from "../../redux/features/product/productApi";

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
      <div className="mb-6 flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-64"
            placeholder="Search for products..."
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="All">All Categories</option>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="SelfDevelopment">Self Development</option>
            <option value="Poetry">Poetry</option>
            <option value="Religious">Religious</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          >
            <option value="price">Sort by Price</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
        <div>
          <button
            onClick={() => setPage(1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data?.map((product: any) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-lg">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-sm text-gray-600">{product.author}</p>
            <p className="text-xl font-bold text-green-500">${product.price}</p>
            <p className="text-sm text-gray-500 mt-2">{product.description}</p>
            <div className="mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center space-x-4">
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          className="p-2 bg-gray-300 text-black rounded-lg"
        >
          Prev
        </button>
        <span className="text-lg">{page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="p-2 bg-gray-300 text-black rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductSection;
