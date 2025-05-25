import { Link } from "react-router-dom";
import { useGetAllProductQuery } from "../../redux/features/product/productApi";
import { TBook } from "../../types/BookItem.Type";
import PrimaryButton from "../../utils/PrimaryButton";
import BestProductCard from "./BestProductCard";
import SecondaryButton from "../../utils/SecondaryButton";

const BestProduct = () => {
  const { data, error, isLoading } = useGetAllProductQuery({});

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:items-center lg:gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="max-w-lg lg:max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                Featured Books
              </h2>
              <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                Discover our handpicked collection of bestselling books across
                various genres. From thrilling adventures to practical guides,
                find your next great read.
              </p>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/18885582/pexels-photo-18885582/free-photo-of-gmy-wear.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="rounded-2xl shadow-xl w-full h-64 sm:h-80 lg:h-96 object-cover"
                alt="Featured Books Collection"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    Special Offer
                  </h3>
                  <p className="text-sm text-gray-700 mt-1">
                    Get 20% off on all featured books this month
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-10">Loading...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">
            Failed to load books.
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

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Browse our complete collection of over 10,000 books across all
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
    </section>
  );
};

export default BestProduct;
