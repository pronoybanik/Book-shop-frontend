
const ProductLoaderKeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 relative overflow-hidden animate-pulse">
      {/* Badge */}
      <div className="absolute top-3 left-3 z-10">
        <div className="bg-gray-200 h-4 w-20 rounded"></div>
      </div>

      {/* Icons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <div className="bg-gray-200 p-3 rounded-full shadow-md" />
        <div className="bg-gray-200 p-3 rounded-full shadow-md" />
      </div>

      {/* Image Placeholder */}
      <div className="bg-gray-200 w-full h-48 sm:h-56" />

      {/* Info */}
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-3 w-3 rounded-full bg-gray-300"
              ></div>
            ))}
          </div>
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-16 bg-gray-300 rounded" />
          <div className="h-8 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProductLoaderKeleton;
