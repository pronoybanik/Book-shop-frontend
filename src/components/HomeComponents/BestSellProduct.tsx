import React from "react";

// Define types for product
type Product = {
  title: string;
  price: string;
  oldPrice?: string;
  img: string;
};

const products = {
  hotSale: [
    {
      title: "Product with video",
      price: "Tk 4,900.00",
      oldPrice: "Tk 15,800.00",
      img: "📘",
    },
    {
      title: "Unique content for each",
      price: "Tk 12,300.00",
      oldPrice: "Tk 13,800.00",
      img: "📙",
    },
    {
      title: "New badge product",
      price: "Tk 10,000.00",
      oldPrice: "Tk 13,800.00",
      img: "📕",
    },
  ],
  bestSale: [
    {
      title: "New and sale badge product",
      price: "Tk 13,700.00",
      oldPrice: "Tk 16,100.00",
      img: "📗",
    },
    {
      title: "This is the large title",
      price: "Tk 2,400.00",
      oldPrice: "Tk 2,700.00",
      img: "📓",
    },
    {
      title: "Countdown product",
      price: "Tk 4,900.00",
      oldPrice: "Tk 7,500.00",
      img: "📘",
    },
  ],
};

// Define ProductCard Component with proper typings
const ProductCard: React.FC<Product> = ({ title, price, oldPrice, img }) => (
  <div className="flex items-start gap-4 p-4 border rounded-lg hover:shadow-md">
    <div className="text-4xl">{img}</div>
    <div>
      <h4 className="text-lg font-medium">{title}</h4>
      <p className="text-red-500 font-semibold">{price}</p>
      {oldPrice && <p className="text-gray-400 line-through">{oldPrice}</p>}
    </div>
  </div>
);

// Define BestSellProduct component and pass the typed products
const BestSellProduct: React.FC = () => {
  return (
    <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Hot Sale and Best Sale Columns */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hot Sale Column */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Hot Sale</h2>
          <div className="flex flex-col gap-4">
            {products.hotSale.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>

        {/* Best Sale Column */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Best Sale</h2>
          <div className="flex flex-col gap-4">
            {products.bestSale.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-pink-100 rounded-lg p-6 flex flex-col items-center justify-center">
        <h2 className="text-[#e95b5b] font-bold text-lg mb-2">BACK TO SCHOOL</h2>
        <p className="text-4xl font-bold text-blue-900 mb-4">HUGE SALE</p>
        <div className="bg-yellow-300 rounded-full w-20 h-20 flex items-center justify-center">
          📚
        </div>
      </div>
    </div>
  );
};

export default BestSellProduct;
