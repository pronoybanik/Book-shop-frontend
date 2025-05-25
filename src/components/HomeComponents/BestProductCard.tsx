import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { TBook } from '../../types/BookItem.Type';

const BestProductCard = ({ book }: { book: TBook }) => {
    return (
         <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {book.bestseller && (
        <div className="absolute top-4 left-4 z-10 bg-[#f96d6d] text-white px-3 py-1 rounded-full text-xs font-semibold">
          Bestseller
        </div>
      )}
      <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-110 transition-all duration-200">
        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
      </button>
      <div className="relative overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-64 sm:h-72 lg:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
          <button className="p-3 bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200">
            <Eye className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-3 bg-orange-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-orange-500 uppercase tracking-wide">
            {book.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {book.rating ?? "N/A"}
            </span>
            <span className="text-xs text-gray-500">({book.reviews ?? 0})</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">by {book.author}</p>
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {book.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              ${book.price}
            </span>
            {/* {book.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${book.originalPrice}
              </span>
            )} */}
          </div>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200 text-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    );
};

export default BestProductCard;