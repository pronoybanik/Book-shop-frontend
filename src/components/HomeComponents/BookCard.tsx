import { TBook } from "../../types/BookItem.Type";
import { Heart, Scale, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addBookToCart } from "../../redux/features/product/productSlice";
import { toast } from "sonner";
import { useGetSingleUserQuery } from "../../redux/features/product/productApi";
import SecondaryButton from "../../utils/SecondaryButton";
import Loading from "../../shared/Loading";

const BookCard = ({ product }: { product: TBook }) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetSingleUserQuery(product._id);

  if (isLoading)
    return (
      <p>
        <Loading></Loading>
      </p>
    );

  const handleAddToCart = () => {
    const bookingData = {
      ...data.data,
      quantity: 1,
    };

    dispatch(addBookToCart(bookingData));
    toast.success("Book add to card");
  };

  const renderStars = (rating = 3) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={`${
          i < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 group relative overflow-hidden">
      {/* Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-[#f96d6d] text-white px-2 py-1 rounded text-xs font-medium">
          {product?.category}
        </span>
      </div>

      {/* Icons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
          <Heart size={16} className="text-gray-600" />
        </button>
        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
          <Scale size={16} className="text-gray-600" />
        </button>
      </div>

      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-48 sm:h-56 object-cover z-0 group-hover:scale-105 transition-transform duration-300"
        />

        {/* Overlay */}
        <Link
          to={`/productDetails/${product._id}`}
          className="absolute inset-0  bg-opacity-10 group-hover:bg-opacity-20 z-10 transition-all duration-300 flex items-center justify-center"
        >
          <button className="bg-[#f96d6d] text-white px-6 py-2 rounded opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-medium">
            QUICK VIEW
          </button>
        </Link>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 hover:text-orange-500 transition-colors cursor-pointer">
          {product?.title}
        </h3>
        <p className="text-sm text-gray-500 mb-2">by {product?.author}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">{renderStars(product?.rating)}</div>
          <span className="text-sm text-gray-500">
            {product?.reviews || 0} Reviews
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-800">
              ${product?.price.toFixed(2)}
            </span>
          </div>
          <div onClick={handleAddToCart} className="text-xs">
            <SecondaryButton>Add ot cart</SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
