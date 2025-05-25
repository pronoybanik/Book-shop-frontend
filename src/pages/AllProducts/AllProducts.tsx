import { useState } from "react";
import {
  Search,
  ChevronDown,
  Filter,
  Grid3X3,
  List,
  Menu,
  X,
} from "lucide-react";
import { useGetAllProductQuery } from "../../redux/features/product/productApi";
import BookCard from "../../components/HomeComponents/BookCard";
import { TBook } from "../../types/BookItem.Type";
import Loading from "../../shared/Loading";
import PrimaryButton from "../../utils/PrimaryButton";

const ProductSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [showItems, setShowItems] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedPriceLabel, setSelectedPriceLabel] = useState("");
  const categoryParam = selectedCategories.join(",");

  const { data, isLoading, error } = useGetAllProductQuery({
    searchTerm: searchQuery,
    sort: sortBy,
    category: categoryParam,
    page: currentPage,
    limit: showItems,
    priceMin: priceRange.min,
    priceMax: priceRange.max,
  });

  const products: TBook[] = data?.data || [];
  const totalPage = data?.meta?.totalPage || 1;

  if (isLoading) return <Loading />;
  if (error) return <p>Something went wrong</p>;

  const categories = [
    { name: "Fiction" },
    { name: "Science" },
    { name: "SelfDevelopment" },
    { name: "Poetry" },
    { name: "Religious" },
  ];

  const priceRanges = [
    { label: "$100.00 - $500.00", min: 100, max: 500 },
    { label: "$500.00 - $1000.00", min: 500, max: 1000 },
    { label: "$1000.00 - $5000.00", min: 1000, max: 5000 },
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: "", max: "" });
    setSearchQuery("");
    setSelectedPriceLabel("");
    setIsMobileMenuOpen(false);
  };

  const FilterSidebar = ({ isMobile = false }) => (
    <div className="space-y-6 sticky top-40">
      {/* Filter Header */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Filter size={18} />
            Filter:
          </h3>
          <button
            onClick={clearAllFilters}
            className="text-orange-500 hover:text-orange-600 text-sm font-medium"
          >
            Clean All
          </button>
        </div>

        {/* Product Categories */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-3 flex items-center justify-between">
            Product Categories
            <ChevronDown size={16} />
          </h4>

          <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1 sm:max-h-none sm:overflow-visible">
            {categories.map((category) => (
              <label
                key={category.name}
                className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-1 rounded"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => handleCategoryChange(category.name)}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-400"
                  />
                  <span className="text-sm text-gray-700">{category.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Price Section  */}
        <div className="mb-6 w-full max-w-lg mx-auto">
          <h4 className="font-medium text-gray-800 mb-3 flex items-center justify-between text-lg sm:text-xl">
            Price
            <ChevronDown size={16} />
          </h4>

          {/* Price Range Options */}
          <div className="space-y-2 mb-4">
            {priceRanges.map((range) => (
              <label
                key={range.label}
                className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 sm:p-3 rounded-md transition duration-200 ease-in-out"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={selectedPriceLabel === range.label}
                    onChange={() => {
                      setSelectedPriceLabel(range.label);
                      setPriceRange({
                        min: String(range.min),
                        max: String(range.max),
                      });
                    }}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 focus:ring-orange-400"
                  />
                  <span className="text-sm sm:text-base text-gray-700">
                    {range.label}
                  </span>
                </div>
              </label>
            ))}
          </div>

          {/* Custom Price Range Input */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <input
              type="number"
              placeholder="$min"
              value={priceRange.min}
              onChange={(e) => {
                setSelectedPriceLabel(""); // Clear radio
                setPriceRange((prev) => ({ ...prev, min: e.target.value }));
              }}
              className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <span className="py-2 text-gray-500 text-center sm:py-0">-</span>
            <input
              type="number"
              placeholder="$max"
              value={priceRange.max}
              onChange={(e) => {
                setSelectedPriceLabel(""); // Clear radio
                setPriceRange((prev) => ({ ...prev, max: e.target.value }));
              }}
              className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>
      </div>

      {/* Apply Filters Button for Mobile */}
      {isMobile && (
        <div className="p-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full bg-[#f96d6d] hover:bg-orange-500 text-white py-3 rounded-lg font-medium transition-colors"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );

  return (
    <section>
      <div className="flex flex-col items-center justify-center min-h-12 bg-white px-6 text-center py-12">
        {/* Explore Button */}
        <button className="mt-4 px-6 py-2 bg-blue-100 text-[#f96d6d] rounded-full text-sm sm:text-base">
          Explore eBooks
        </button>

        {/* Headline */}
        <h1 className="mt-8 text-3xl sm:text-4xl font-bold">
          Your Digital Library of <span className="text-[#f96d6d]">eBooks</span>
        </h1>

        {/* Subheading */}
        <p className="mt-4 text-gray-600 text-sm sm:text-base max-w-md">
          Instantly access thousands of eBooks from top authors. Read anywhere,
          anytime with seamless downloads and customer reviews.
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex items-center w-full max-w-md border border-gray-300 rounded-full overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Search eBooks, genres, or authors"
            className="flex-grow px-4 py-3 text-gray-700 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="px-6 py-3 lg:text-sm text-xs text-white">
            <PrimaryButton>Search</PrimaryButton>
          </button>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <span>Home</span>
            <span>›</span>
            <span className="text-gray-800">Shop</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar Filters */}
            <div className="hidden lg:block lg:w-80">
              <FilterSidebar />
            </div>

            {/* Mobile Filter Overlay */}
            {isMobileMenuOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                {/* Backdrop */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Sidebar */}
                <div className="absolute left-0 top-0 h-full w-80 max-w-xs bg-gray-50 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
                  {/* Close Button */}
                  <div className="flex items-center justify-between p-4 border-b bg-white">
                    <h2 className="text-lg font-semibold text-gray-800">
                      Filters
                    </h2>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X size={20} className="text-gray-600" />
                    </button>
                  </div>

                  {/* Filter Content */}
                  <div className="p-4">
                    <FilterSidebar isMobile={true} />
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1">
              {/* Top Bar */}
              <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {/* Mobile Filter Button */}
                    <button
                      onClick={() => setIsMobileMenuOpen(true)}
                      className="lg:hidden flex items-center gap-2 bg-[#f96d6d] hover:bg-orange-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      <Menu size={18} />
                      Filters
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Sort By:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value="latest">Sort by latest</option>
                        <option value="price">Price: Low to High</option>
                        <option value="-price">Price: High to Low</option>
                        {/* <option value="rating">Highest Rated</option> */}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Show</span>
                      <select
                        value={showItems}
                        onChange={(e) => {
                          setShowItems(Number(e.target.value));
                          setCurrentPage(1); // Reset to first page
                        }}
                        className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        <option value={6}>6</option>
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                        <option value={48}>48</option>
                      </select>
                    </div>

                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 ${
                          viewMode === "grid"
                            ? "bg-[#f96d6d] text-white"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <Grid3X3 size={16} />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 ${
                          viewMode === "list"
                            ? "bg-[#f96d6d] text-white"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <List size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 "
                    : "grid-cols-1"
                }`}
              >
                {products?.map((product) => (
                  <BookCard key={product._id} product={product} />
                ))}
              </div>

              {/* No Results */}
              {products.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search size={48} className="mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}

              {/* pagination section */}
              <ul className="flex justify-center gap-1 text-gray-900 mt-10">
                {/* Previous Page */}
                <li>
                  <button
                    onClick={() =>
                      currentPage > 1 && setCurrentPage(currentPage - 1)
                    }
                    className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>

                {/* Page Numbers */}
                {[...Array(totalPage)].map((_, index) => {
                  const pageNum = index + 1;
                  const isActive = pageNum === currentPage;

                  return (
                    <li key={pageNum}>
                      <button
                        onClick={() => setCurrentPage(pageNum)}
                        className={`block size-8 rounded border text-center text-sm/8 font-medium transition-colors ${
                          isActive
                            ? "bg-[#f96d6d] text-white"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    </li>
                  );
                })}

                {/* Next Page */}
                <li>
                  <button
                    onClick={() =>
                      currentPage < totalPage && setCurrentPage(currentPage + 1)
                    }
                    className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
                    disabled={currentPage === totalPage}
                    aria-label="Next page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
