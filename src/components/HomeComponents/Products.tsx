import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import product1 from "../../images/product-images/00001_large.png";
import product2 from "../../images/product-images/11_274c14d0-5fba-4d48-ab54-21692.png";
import product3 from "../../images/product-images/13_a85f7b16-7bf4-44a1-aca8-55250.png";
import product4 from "../../images/product-images/14_6ce35247-61ba-43e3-b237-a27be.png";
import product5 from "../../images/product-images/15_5b5a968a-7834-48df-ae18-eb9ec.png";
import product6 from "../../images/product-images/2_42f44c02-23bd-467f-a9bc-d28ad5.png";
import PrimaryButton from "../../utils/PrimaryButton";

const Products = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const BookListName = [
    { name: "Outpatient Surgery" },
    { name: "Cardiac Clinicy" },
    { name: "Ophthalmology Clinic" },
    { name: "Gynaecological Clinic" },
    { name: "Outpatient Rehabilitation" },
    { name: "Laryngological Clinic" },
    { name: "Pediatric Clinic" },
  ];

  return (
    <section>
      <p className="border mt-10" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 max-w-7xl mx-auto mt-20">
        <div className="bg-[#f96d6d] ">
          <div className="mt-14 ml-8">
            <p className=" text-2xl mb-6 text-white font-sans">Book List</p>
            {BookListName.map((data) => (
              <p className="text-xm font-sans text-white mb-1">{data?.name}</p>
            ))}

            <p className="text-xm mt-10 font-sans text-white">view all</p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div>
            <p className="text-sm md:ml-6 ml-2 text-[#60A3D9]">Innovation</p>
            <p className="text-2xl font-semibold md:ml-6 ml-2">Our Books</p>
          </div>
          <div className="mt-4">
            <Carousel
              autoPlay={true}
              infinite={true}
              autoPlaySpeed={3000}
              responsive={responsive}
            >
              <div className="mx-2 group hover:scale-105 transform transition-transform duration-300 ease-in-out">
                <img src={product6} alt="" className="w-full" />
                <br />
                <p className="text-xl text-[#60A3D9] group-hover:text-blue-500">
                  Ophthalmology Clinic
                </p>
                <p className="border-b-2 mt-4"></p>
                <p className="mt-6 group-hover:text-gray-700 font-sans">
                  Cum sociis natoque penatibus et magnis dis parturient
                  montesmus. Pro vel nibh et elit mollis commodo et nec
                  augueique
                </p>
              </div>
              <div className="mx-2 group hover:scale-105 transform transition-transform duration-300 ease-in-out">
                <img src={product2} alt="" className="w-full" />
                <br />
                <p className="text-xl text-[#60A3D9] group-hover:text-blue-500">
                  Ophthalmology Clinic
                </p>
                <p className="border-b-2 mt-4"></p>
                <p className="mt-6 group-hover:text-gray-700 font-sans">
                  Cum sociis natoque penatibus et magnis dis parturient
                  montesmus. Pro vel nibh et elit mollis commodo et nec
                  augueique
                </p>
              </div>

              <div className="mx-2 group hover:scale-105 transform transition-transform duration-300 ease-in-out">
                <img src={product3} alt="" className="w-full" />
                <br />
                <p className="text-xl text-[#60A3D9] group-hover:text-blue-500">
                  Ophthalmology Clinic
                </p>
                <p className="border-b-2 mt-4"></p>
                <p className="mt-6 group-hover:text-gray-700 font-sans">
                  Cum sociis natoque penatibus et magnis dis parturient
                  montesmus. Pro vel nibh et elit mollis commodo et nec
                  augueique
                </p>
              </div>

              <div className="mx-2 group hover:scale-105 transform transition-transform duration-300 ease-in-out">
                <img src={product5} alt="" className="w-full" />
                <br />
                <p className="text-xl text-[#60A3D9] group-hover:text-blue-500">
                  Ophthalmology Clinic
                </p>
                <p className="border-b-2 mt-4"></p>
                <p className="mt-6 group-hover:text-gray-700 font-sans">
                  Cum sociis natoque penatibus et magnis dis parturient
                  montesmus. Pro vel nibh et elit mollis commodo et nec
                  augueique
                </p>
              </div>
            </Carousel>
          </div>
        </div>
      </div>

      <div className="flex  items-center justify-center mt-8">
        <PrimaryButton>View More</PrimaryButton>
      </div>
    </section>
  );
};

export default Products;
