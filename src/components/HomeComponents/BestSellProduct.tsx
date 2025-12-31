import React from "react";
import { Flame, TrendingUp, Sparkles, ArrowRight } from "lucide-react";

type Product = {
  title: string;
  price: string;
  oldPrice?: string;
  img: string;
  discount?: string;
};

const products = {
  hotSale: [
    {
      title: "Product with video",
      price: "Tk 4,900.00",
      oldPrice: "Tk 15,800.00",
      img: "📘",
      discount: "69%",
    },
    {
      title: "Unique content for each",
      price: "Tk 12,300.00",
      oldPrice: "Tk 13,800.00",
      img: "📙",
      discount: "11%",
    },
    {
      title: "New badge product",
      price: "Tk 10,000.00",
      oldPrice: "Tk 13,800.00",
      img: "📕",
      discount: "28%",
    },
  ],
  bestSale: [
    {
      title: "New and sale badge product",
      price: "Tk 13,700.00",
      oldPrice: "Tk 16,100.00",
      img: "📗",
      discount: "15%",
    },
    {
      title: "This is the large title",
      price: "Tk 2,400.00",
      oldPrice: "Tk 2,700.00",
      img: "📓",
      discount: "11%",
    },
    {
      title: "Countdown product",
      price: "Tk 4,900.00",
      oldPrice: "Tk 7,500.00",
      img: "📘",
      discount: "35%",
    },
  ],
};

const ProductCard: React.FC<Product> = ({
  title,
  price,
  oldPrice,
  img,
  discount,
}) => (
  <div className="group relative flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#f96d6d]/30 hover:shadow-lg hover:shadow-[#f96d6d]/10 transition-all duration-300 cursor-pointer">
    {/* Discount Badge */}
    {discount && (
      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#f96d6d] to-[#ff8f8f] text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
        -{discount}
      </div>
    )}

    {/* Book Image */}
    <div className="relative flex-shrink-0 w-16 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
      <span className="text-4xl drop-shadow-sm">{img}</span>
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-[#f96d6d] transition-colors duration-300">
        {title}
      </h4>
      <div className="flex items-center gap-2 mt-2">
        <p className="text-[#f96d6d] font-bold text-base">{price}</p>
        {oldPrice && (
          <p className="text-gray-400 line-through text-xs">{oldPrice}</p>
        )}
      </div>
    </div>

    {/* Arrow Icon */}
    <ArrowRight
      size={18}
      className="text-gray-300 group-hover:text-[#f96d6d] group-hover:translate-x-1 transition-all duration-300"
    />
  </div>
);

const BestSellProduct: React.FC = () => {
  return (
    <section data-aos="fade-up" className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[#f96d6d]/10 text-[#f96d6d] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            Featured Products
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Trending <span className="text-[#f96d6d]">Best Sellers</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Discover our most popular books loved by readers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hot Sale and Best Sale Columns */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hot Sale Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl text-white shadow-lg shadow-orange-200">
                  <Flame size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Hot Sale</h3>
                  <p className="text-xs text-gray-500">Limited time offers</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {products.hotSale.map((product, index) => (
                  <ProductCard key={index} {...product} />
                ))}
              </div>
            </div>

            {/* Best Sale Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl text-white shadow-lg shadow-emerald-200">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Best Sale</h3>
                  <p className="text-xs text-gray-500">Customer favorites</p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                {products.bestSale.map((product, index) => (
                  <ProductCard key={index} {...product} />
                ))}
              </div>
            </div>
          </div>

          {/* Promotional Banner */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#fef3f3] via-[#fff5f5] to-[#ffeaea] rounded-3xl p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#f96d6d]/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-300/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            {/* Content */}
            <div className="relative z-10">
              <span className="inline-block bg-[#f96d6d] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 animate-pulse">
                🎉 SPECIAL OFFER
              </span>
              <h2 className="text-[#f96d6d] font-extrabold text-xl tracking-wide mb-2">
                BACK TO SCHOOL
              </h2>
              <p className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                HUGE
              </p>
              <p className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#f96d6d] to-[#ff8f8f] bg-clip-text text-transparent mb-6">
                SALE
              </p>

              {/* Book Stack Icon */}
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full flex items-center justify-center shadow-xl shadow-yellow-200/50 mx-auto">
                  <span className="text-5xl animate-bounce">📚</span>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-black/10 rounded-full blur-sm"></div>
              </div>

              <p className="text-gray-600 text-sm mb-6">
                Up to <span className="font-bold text-[#f96d6d]">70% OFF</span>{" "}
                on selected items
              </p>

              <button className="bg-gradient-to-r from-[#f96d6d] to-[#ff8f8f] text-white font-semibold px-8 py-3 rounded-full hover:shadow-lg hover:shadow-[#f96d6d]/30 hover:-translate-y-0.5 transition-all duration-300">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellProduct;
