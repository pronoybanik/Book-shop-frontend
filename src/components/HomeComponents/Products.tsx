import { useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Aos from "aos";
import "aos/dist/aos.css";

import { useGetLimitProductQuery } from "../../redux/features/product/productApi";
import ProductLoaderKeleton from "../../shared/ProductLoader";

interface Product {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  price?: number;
}

const Products = () => {
  const { data, isLoading } = useGetLimitProductQuery(undefined);
  const bookData: Product[] = data?.data || [];

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 4 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
  };

  const BookListName = [
    { name: "Cardiac Clinic" },
    { name: "Ophthalmology Clinic" },
    { name: "Gynaecological Clinic" },
    { name: "Outpatient Rehabilitation" },
    { name: "Laryngological Clinic" },
    { name: "Pediatric Clinic" },
    { name: "To Kill a Mockingbird" },
    { name: "1984" },
    { name: "Pride and Prejudice" },
    { name: "The Great Gatsby" },
    { name: "Moby-Dick" },
  ];

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-24 my-16">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 max-w-screen-2xl mx-auto">
        {/* Sidebar Book List */}
        <div
          data-aos="fade-up"
          className="bg-[#f96d6d] p-6 rounded-2xl shadow-md order-2 lg:order-1"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Book List</h2>
          <ul className="space-y-2">
            {BookListName.map((data, index) => (
              <li key={index} className="text-sm text-white">
                {data.name}
              </li>
            ))}
          </ul>
          <p className="text-sm mt-6 text-white cursor-pointer hover:underline">
            View All
          </p>
        </div>

        {/* Carousel Product Section */}
        <div data-aos="fade-up" className="lg:col-span-3 order-1 lg:order-2">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 uppercase">
            Our Books
          </h2>

          <div className="mt-4">
            {isLoading ? (
              <ProductLoaderKeleton />
            ) : bookData.length > 0 ? (
              <Carousel
                autoPlay
                infinite
                autoPlaySpeed={3000}
                responsive={responsive}
                itemClass="px-2"
                className="p-4"
              >
                {bookData.map((item: Product, index: number) => (
                  <Link
                    to={`/productDetails/${item._id}`}
                    key={item._id || index}
                    className="group block bg-white  h-[100%] rounded-xl shadow-md overflow-hidden transition hover:shadow-xl"
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/300"}
                      alt={item.title || "Book"}
                      className="h-[350px] w-full object-cover"
                    />

                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:underline">
                        {item.title || "Book Title"}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description?.substring(0, 60) ||
                          "No description available."}
                        ...
                      </p>
                      <p className="text-[#e95b5b] mt-2 font-bold">
                        TK: {item.price || "N/A"}
                      </p>
                    </div>
                  </Link>
                ))}
              </Carousel>
            ) : (
              <p className="text-gray-600">No books available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
