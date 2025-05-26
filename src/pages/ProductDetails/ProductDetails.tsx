import { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { addBookToCart } from "../../redux/features/product/productSlice";
import {
  useGetBooksCategoryQuery,
  useGetSingleUserQuery,
} from "../../redux/features/product/productApi";
import Loading from "../../shared/Loading";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { TBook } from "../../types/BookItem.Type";


export default function BookProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetSingleUserQuery(id);
  const { data: bookData } = useGetBooksCategoryQuery(data?.data?.category);

  if (!data) return <Loading />;

  if (isLoading) return <Loading />;

  const handleAddToCart = () => {
    const bookingData = {
      ...data.data,
      quantity,
    };

    dispatch(addBookToCart(bookingData));
    toast.success("Book add to card");
  };

  const productImages = [
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&h=600&fit=crop",
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=600&fit=crop",
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Breadcrumb */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <span>Home</span> / <span>Books</span> / <span>Fiction</span> /{" "}
            <span className="text-gray-900">The Midnight Library</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images Section */}
          <div className="space-y-4 ">
            <div className="relative aspect-[3/4]  bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={data?.data?.image}
                alt="The Midnight Library"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() =>
                  setSelectedImage(
                    selectedImage > 0
                      ? selectedImage - 1
                      : productImages.length - 1
                  )
                }
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setSelectedImage(
                    selectedImage < productImages.length - 1
                      ? selectedImage + 1
                      : 0
                  )
                }
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {data?.data?.title || "The Midnight Library"}
              </h1>

              <p className="mb-2">
                Availability:-
                {data?.data?.quantity > 0 ? (
                  <span className="text-green-500 ml-2 front-bold">
                    {data?.data?.quantity}
                  </span>
                ) : (
                  <span className="text-red-600 ml-2 font-semibold">
                    {"stock out"}
                  </span>
                )}
              </p>

              {/* Star Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">{renderStars(4.5)}</div>
                <span className="text-sm text-gray-600">(4.5)</span>
                <span className="text-sm text-gray-500">|</span>
                <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                  2,847 reviews
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${data?.data?.price || "29.99"}
                </span>

                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                  17% OFF
                </span>
              </div>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">Easy Returns</span>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#f96d6d] w-full hover:bg-[#fc8686] text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    isWishlisted
                      ? "border-red-500 bg-red-50 text-red-600"
                      : "border-gray-300 hover:border-gray-400 text-gray-600"
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>
                <button className="px-4 py-3 rounded-lg border-2 border-gray-300 hover:border-gray-400 text-gray-600 transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {["details", "reviews", "shipping"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? "border-[#f96d6d] text-[#f96d6d]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab === "details" && "Product Details"}
                  {tab === "reviews" && "Reviews"}
                  {tab === "shipping" && "Shipping & Returns"}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "details" && (
              <div className="prose max-w-none">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      About This Book
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {data.data?.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Specifications
                    </h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">ISBN:</dt>
                        <dd className="font-medium">978-0-525-55948-1</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Publisher:</dt>
                        <dd className="font-medium"> {data?.data?.author}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Pages:</dt>
                        <dd className="font-medium">288</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Language:</dt>
                        <dd className="font-medium">English</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Format:</dt>
                        <dd className="font-medium">{data?.data?.category}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Average Ratings
                  </h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-4xl font-bold">4.5</span>
                    <div>
                      <div className="flex items-center mb-1">
                        {renderStars(4.5)}
                      </div>
                      <p className="text-sm text-gray-600">
                        Based on 2,847 reviews
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center space-x-2">
                        <span className="text-sm w-8">{stars}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{
                              width: `${
                                stars === 5
                                  ? 60
                                  : stars === 4
                                  ? 25
                                  : stars === 3
                                  ? 10
                                  : stars === 2
                                  ? 3
                                  : 2
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">
                          {stars === 5
                            ? "1,708"
                            : stars === 4
                            ? "712"
                            : stars === 3
                            ? "285"
                            : stars === 2
                            ? "85"
                            : "57"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      name: "Sarah Johnson",
                      rating: 5,
                      date: "2 days ago",
                      review:
                        "Absolutely loved this book! The concept is fascinating and the writing is beautiful. Made me think about life choices in a whole new way.",
                    },
                    {
                      name: "Mike Chen",
                      rating: 4,
                      date: "1 week ago",
                      review:
                        "Great read with a unique premise. Some parts felt a bit slow, but overall very engaging and thought-provoking.",
                    },
                    {
                      name: "Emma Davis",
                      rating: 5,
                      date: "2 weeks ago",
                      review:
                        "One of the best books I've read this year. The philosophical questions it raises will stay with me for a long time.",
                    },
                  ].map((review, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-6 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                            {review.name[0]}
                          </div>
                          <div>
                            <h4 className="font-medium">{review.name}</h4>
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {renderStars(review.rating)}
                              </div>
                              <span className="text-sm text-gray-500">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.review}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Shipping Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Truck className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Free Standard Shipping</h4>
                        <p className="text-sm text-gray-600">
                          5-7 business days • Orders over $25
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Truck className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Express Shipping</h4>
                        <p className="text-sm text-gray-600">
                          2-3 business days • $9.99
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Truck className="w-5 h-5 text-purple-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Next Day Delivery</h4>
                        <p className="text-sm text-gray-600">
                          Order by 2 PM • $19.99
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Returns & Exchanges
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <RotateCcw className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">30-Day Returns</h4>
                        <p className="text-sm text-gray-600">
                          Easy returns within 30 days of purchase
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Quality Guarantee</h4>
                        <p className="text-sm text-gray-600">
                          We stand behind the quality of our books
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Suggested Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bookData?.data?.map((book: TBook) => (
              <Link
                to={`/productDetails/${book._id}`}
                key={book._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
              >
                <div className="aspect-[3/4] mb-4 rounded-lg overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                <div className="flex items-center mb-2">
                  {/* <div className="flex items-center mr-2">
                    {renderStars(book?.rating)}
                  </div> */}
                  {/* <span className="text-sm text-gray-600">({book.rating})</span> */}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    ${book.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
