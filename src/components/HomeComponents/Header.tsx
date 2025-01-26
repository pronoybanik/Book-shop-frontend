import { useState, useEffect } from "react";
import imageOne from "../../images/slider_top_4.png";
import imageTwo from "../../images/slider_top_2.png";
import imageThree from "../../images/slider_top_1.png";
import bgImage1 from "../../images/banner-bg-image/pexels-photo-1034008.png";
import bgImage2 from "../../images/banner-bg-image/pexels-photo-1296000.png";
import bgImage4 from "../../images/banner-bg-image/pexels-photo-990432.png";
import PrimaryButton from "../../utils/PrimaryButton";

const ImageBanner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sideImage, setSideImage] = useState(0);

  const images = [bgImage1, bgImage4];
  const sideImageList = [imageOne,  imageThree];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSideImage((prevIndex) => (prevIndex + 1) % sideImageList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [sideImageList.length]);

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px]">
      {/* Background Images */}
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className={`absolute top-0 left-0 object-cover w-full h-full transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Content Section */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-6 md:px-12">
        {/* Left Content */}
        <div className="text-center md:text-left max-w-lg px-4">
          <p className="text-white font-serif font-semibold text-3xl md:text-4xl lg:text-5xl mb-4">
            Organic Products
          </p>
          <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed mb-6">
            Vegetables are nutritious, essential components of a healthy diet.
            They come in various colors, shapes, and flavors, providing a wide
            range of vitamins, minerals, and fiber. Incorporating a diverse
            selection of veggies into your meals promotes overall well-being and
            supports a balanced diet.
          </p>

          {/* Buttons */}
          <div className="flex justify-center md:justify-start gap-4">
            <PrimaryButton>Shop</PrimaryButton>
          </div>
        </div>

        {/* Right Side Images */}
        <div className="relative w-2/3 md:w-1/2 lg:w-1/3 h-full flex justify-center md:justify-start mt-6 md:mt-0">
          {sideImageList.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Side Image ${index + 1}`}
              className={`absolute top-0 left-0 object-cover rounded-lg transition-opacity duration-1000 w-full h-full max-w-xs md:max-w-sm lg:max-w-md ${
                index === sideImage ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageBanner;
