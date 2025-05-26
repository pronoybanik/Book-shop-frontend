import { TBook } from "../../types/BookItem.Type";
import { Book, Star } from "lucide-react";
import { Link } from "react-router-dom";

const NaVBarSearchProduct = ({
  bookData,
  searchTerm,
}: {
  bookData: TBook[];
  searchTerm: string;
}) => {
  return (
    <div className="absolute top-full px-4 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 mt-1 max-h-96 overflow-y-auto w-full max-w-screen-xl mx-auto">
      {bookData.length > 0 ? (
        <>
          {/* Results Header */}
          <div className="p-3 border-b border-gray-100 bg-gray-50">
            <p className="text-sm text-gray-600">
              Found {bookData.length} result
              {bookData.length !== 1 ? "s" : ""} for "{searchTerm}"
            </p>
          </div>

          {/* Results List */}
          <div className="divide-y divide-gray-100">
            {bookData.map((book) => (
              <Link to={`/productDetails/${book._id}`}
                key={book._id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
                  {/* Book Image */}
                  <div className="flex-shrink-0 self-start sm:self-auto">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-16 h-20 object-cover rounded shadow-sm group-hover:shadow-md transition-shadow duration-150"
                    />
                  </div>

                  {/* Book Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-[#f96d6d] transition-colors duration-150">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          by {book.author}
                        </p>

                        <div className="flex flex-wrap items-center mt-2 space-x-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {book.category}
                          </span>
                          {!book.inStock && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Price and Rating */}
                      <div className="flex flex-col items-start sm:items-end space-y-1 mt-3 sm:mt-0 sm:ml-4">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-bold text-[#f96d6d]">
                            ${book.price}
                          </span>
                       
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star
                            size={12}
                            className="text-yellow-400 fill-current"
                          />
                          <span className="text-xs text-gray-600">
                            {book.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <Link
            to="/allProducts"
            className="p-3 border-t border-gray-100 bg-gray-50 block"
          >
            <button className="w-full text-center text-sm text-[#f96d6d] hover:text-[#e85a5a] font-medium transition-colors duration-150">
              View all {bookData.length} results →
            </button>
          </Link>
        </>
      ) : (
        // No Results
        <div className="p-8 text-center">
          <Book size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-base font-medium text-gray-900 mb-2">
            No books found
          </h3>
          <p className="text-sm text-gray-500">
            Try searching with different keywords or check your spelling.
          </p>
        </div>
      )}
    </div>
  );
};

export default NaVBarSearchProduct;
