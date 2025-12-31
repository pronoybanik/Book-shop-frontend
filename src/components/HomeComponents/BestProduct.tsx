import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Sparkles, Award, TrendingUp, Search, ArrowRight } from "lucide-react";

import { useGetAllProductQuery } from "../../redux/features/product/productApi";
import { TBook } from "../../types/BookItem.Type";
import PrimaryButton from "../../utils/PrimaryButton";
import BestProductCard from "./BestProductCard";
import SecondaryButton from "../../utils/SecondaryButton";
import ProductLoaderKeleton from "../../shared/ProductLoader";

const BestProduct = () => {
  const { data, error, isLoading } = useGetAllProductQuery({});

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-12 my-24 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:items-center lg:gap-12 mb-16">
          <div className="lg:col-span-2">
            <div data-aos="fade-right" className="max-w-lg lg:max-w-none">
              <span className="inline-flex items-center gap-2 bg-[#f96d6d]/10 text-[#f96d6d] px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Award size={16} />
                Editor's Choice
              </span>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl leading-tight">
                Featured <span className="text-[#f96d6d]">Books</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                Discover our handpicked collection of bestselling books across
                various genres. From thrilling adventures to practical guides,
                find your next great read.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <p className="text-2xl font-bold text-[#f96d6d]">10K+</p>
                  <p className="text-xs text-gray-500 mt-1">Books</p>
                </div>
                <div className="text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <p className="text-2xl font-bold text-[#f96d6d]">500+</p>
                  <p className="text-xs text-gray-500 mt-1">Authors</p>
                </div>
                <div className="text-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <p className="text-2xl font-bold text-[#f96d6d]">50K+</p>
                  <p className="text-xs text-gray-500 mt-1">Readers</p>
                </div>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="lg:col-span-3">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/18885582/pexels-photo-18885582/free-photo-of-gmy-wear.jpeg"
                className="rounded-3xl shadow-2xl w-full h-64 sm:h-80 lg:h-[420px] object-cover"
                alt="Featured Books Collection"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl"></div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 left-6 right-6 md:left-8 md:right-8">
                <div className="bg-white rounded-2xl p-5 shadow-xl flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-[#f96d6d] to-[#ff8f8f] rounded-xl text-white">
                    <TrendingUp size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      Special Offer
                    </h3>
                    <p className="text-sm text-gray-500">
                      Get <span className="text-[#f96d6d] font-semibold">20% off</span> on all featured books this month
                    </p>
                  </div>
                  <Link to="/allProducts" className="hidden sm:flex items-center gap-2 bg-[#f96d6d] text-white px-4 py-2 rounded-xl font-medium hover:bg-[#e85555] transition-colors">
                    Shop Now
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Decorative Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <span className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                  <Sparkles size={16} className="text-yellow-500" />
                  Bestsellers
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-10 mt-8">
          <h3 className="text-2xl font-bold text-gray-900">Latest Arrivals</h3>
          <p className="text-gray-500 mt-2">Fresh picks just for you</p>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <ProductLoaderKeleton />
        ) : error ? (
          <div className="text-center py-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <span className="text-2xl">😕</span>
            </div>
            <p className="text-red-500 font-medium">Failed to load books.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {data?.data
              .slice(-4)
              .reverse()
              .map((book: TBook) => (
                <BestProductCard key={book._id} book={book} />
              ))}
          </div>
        )}

        {/* CTA Section */}
        <div data-aos="fade-up" className="mt-20">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#fef3f3] via-[#fff5f5] to-[#ffeaea] rounded-3xl p-8 lg:p-12">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f96d6d]/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#f96d6d]/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-6">
                <Search size={28} className="text-[#f96d6d]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Can't find what you're looking for?
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Browse our complete collection of over <span className="font-semibold text-[#f96d6d]">10,000 books</span> across all
                categories. From classics to contemporary, we have something for
                every reader.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/allProducts">
                  <PrimaryButton>Browse All Books</PrimaryButton>
                </Link>
                <Link to="/addCard">
                  <SecondaryButton>Request a Book</SecondaryButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestProduct;
