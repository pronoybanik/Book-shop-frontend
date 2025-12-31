import { useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";

import { useGetLimitProductQuery } from "../../redux/features/product/productApi";
import ProductLoaderKeleton from "../../shared/ProductLoader";

interface Product {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  price?: number;
}

const Products = () => {
  const { data, isLoading } = useGetLimitProductQuery(undefined);
  const bookData: Product[] = data?.data || [];

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 4 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
  };

  const BookListName = [
    { name: "Fiction", icon: "📖" },
    { name: "Non-Fiction", icon: "📘" },
    { name: "Science & Tech", icon: "🔬" },
    { name: "Self Development", icon: "🎯" },
    { name: "Biography", icon: "👤" },
    { name: "History", icon: "🏛️" },
    { name: "Romance", icon: "💕" },
    { name: "Mystery", icon: "🔍" },
    { name: "Fantasy", icon: "🪄" },
    { name: "Children", icon: "🧒" },
  ];

  useEffect(() => {
    Aos.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-24 my-16">
      {/* Section Header */}
      <div className="text-center mb-12 max-w-screen-2xl mx-auto">
        <span className="inline-flex items-center gap-2 bg-[#f96d6d]/10 text-[#f96d6d] px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles size={16} />
          Our Collection
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Explore Our <span className="text-[#f96d6d]">Books</span>
        </h2>
        <p className="text-gray-500 mt-3 max-w-md mx-auto">
          Discover amazing reads from our curated collection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 max-w-screen-2xl mx-auto">
        {/* Sidebar Book List */}
        <div
          data-aos="fade-right"
          className="relative overflow-hidden bg-gradient-to-br from-[#f96d6d] to-[#ff8f8f] p-6 rounded-2xl shadow-xl shadow-[#f96d6d]/20 order-2 lg:order-1"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                <BookOpen size={24} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Categories</h2>
            </div>

            <ul className="space-y-1">
              {BookListName.map((item, index) => (
                <li
                  key={index}
                  className="group flex items-center gap-3 p-2 rounded-xl hover:bg-white/15 transition-all duration-300 cursor-pointer"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
                  <ArrowRight
                    size={14}
                    className="ml-auto text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Carousel Product Section */}
        <div data-aos="fade-left" className="lg:col-span-3 order-1 lg:order-2">
          <div className="mt-4">
            {isLoading ? (
              <ProductLoaderKeleton />
            ) : bookData.length > 0 ? (
              <Carousel
                autoPlay
                infinite
                autoPlaySpeed={3000}
                responsive={responsive}
                itemClass="px-2"
                className="py-4"
              >
                {bookData.map((item: Product, index: number) => (
                  <Link
                    to={`/productDetails/${item._id}`}
                    key={item._id || index}
                    className="group block bg-white h-full rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image || "https://via.placeholder.com/300"}
                        alt={item.title || "Book"}
                        className="h-[300px] w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#f96d6d] text-white text-xs font-bold px-3 py-1 rounded-full">
                          New
                        </span>
                      </div>
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#f96d6d] transition-colors line-clamp-1">
                        {item.title || "Book Title"}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                        {item.description?.substring(0, 80) ||
                          "No description available."}
                        ...
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-xl font-bold text-[#f96d6d]">
                          ৳{item.price || "N/A"}
                        </p>
                        <div className="flex items-center gap-1 text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-sm">
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </Carousel>
            ) : (
              <div className="text-center py-12">
                <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No books available</p>
              </div>
            )}
          </div>
          <div className="text-center mt-8">
            <Link to="/allProducts">
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f96d6d] to-[#ff8f8f] text-white font-semibold px-8 py-3 rounded-full hover:shadow-lg hover:shadow-[#f96d6d]/30 hover:-translate-y-0.5 transition-all duration-300">
                View All Books
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
