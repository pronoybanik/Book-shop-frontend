import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { TBook } from "../../types/BookItem.Type";
import { Link } from "react-router-dom";

const BestProductCard = ({ book }: { book: TBook }) => {
  return (
    <Link
      data-aos="fade-up"
      to={`/productDetails/${book._id}`}
      className="group relative bg-white rounded-3xl shadow-md hover:shadow-2xl overflow-hidden border border-gray-100 hover:-translate-y-1 transition-all duration-500 ease-out"
    >
      {/* Badges */}
      {book.bestseller && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-[#f96d6d] to-[#ff8f8f] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
          🔥 Bestseller
        </div>
      )}

      {/* Wishlist Button */}
      <button className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white hover:scale-105 hover:shadow-lg transition-all duration-500 ease-out">
        <Heart className="w-4 h-4 text-gray-500 hover:text-[#f96d6d] transition-colors duration-500 ease-out" />
      </button>

      {/* Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-64 sm:h-72 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-end justify-center pb-6">
          <div className="flex items-center gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <button className="p-3 bg-white rounded-xl shadow-lg hover:scale-105 hover:bg-gray-50 transition-all duration-400 ease-out">
              <Eye className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-3 bg-gradient-to-r from-[#f96d6d] to-[#ff8f8f] text-white rounded-xl shadow-lg hover:scale-105 transition-all duration-400 ease-out">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-[#f96d6d] uppercase tracking-wider bg-[#f96d6d]/10 px-2 py-1 rounded-md transition-colors duration-500 ease-out">
            {book.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-700">
              {book.rating ?? "4.5"}
            </span>
            <span className="text-xs text-gray-400">({book.reviews ?? 0})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-[#f96d6d] transition-colors duration-500 ease-out">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-sm text-gray-500 mb-3">
          by <span className="font-medium text-gray-700">{book.author}</span>
        </p>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {book.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-2xl font-bold text-[#f96d6d] group-hover:scale-105 transition-transform duration-500 ease-out origin-left">৳{book.price}</span>
          <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">
            In Stock
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BestProductCard;
