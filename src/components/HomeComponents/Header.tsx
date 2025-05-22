import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import imageOne from "../../images/slider_top_4.png";
import imageThree from "../../images/slider_top_1.png";
import bgImage4 from "../../images/slider_top_2.png";

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Let's Make The Happy Place",
      subtitle: "INTERIOR DESIGN IN HOME",
      cta: "SHOP NOW",
      accentColor: "text-orange-400",
      image: imageOne,
    },
    {
      id: 2,
      title: "Design Your Dream Space",
      subtitle: "MODERN FURNITURE COLLECTION",
      cta: "EXPLORE NOW",
      accentColor: "text-blue-400",
      image: imageThree,
    },
    {
      id: 3,
      title: "Comfort Meets Style",
      subtitle: "PREMIUM QUALITY FURNITURE",
      cta: "DISCOVER MORE",
      accentColor: "text-green-400",
      image: bgImage4,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-96 md:h-[500px] bg-gray-100 overflow-hidden">
      {/* Background shape */}
      <div className="absolute left-0 top-0 w-1/2 h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-100 rounded-full transform scale-150 translate-x-1/4 opacity-60"></div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white"
        aria-label="Previous slide"
      >
        <ArrowLeft size={20} />
      </button>

      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white"
        aria-label="Next slide"
      >
        <ArrowRight size={20} />
      </button>

      {/* Main content container */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Furniture image */}
        <div className="relative w-1/2 h-full flex items-center justify-center">
          <div className="w-full max-w-lg">
            <div className="relative w-full aspect-[4/3]">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="w-1/2 pl-8 flex flex-col items-start justify-center">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs tracking-widest text-gray-600 font-medium">
                {slides[currentSlide].subtitle}
              </span>
              <div className="hidden md:flex gap-1 items-center">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-gray-300"></div>
                ))}
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
              {slides[currentSlide].title.split(" ").map((word, i) =>
                word.toLowerCase() === "happy" ? (
                  <span key={i} className={slides[currentSlide].accentColor}>
                    {" "}
                    {word}{" "}
                  </span>
                ) : (
                  <span key={i}> {word} </span>
                )
              )}
            </h2>

            <div className="mt-6">
              <a
                href="#shop"
                className="inline-flex items-center uppercase text-sm font-medium"
              >
                {slides[currentSlide].cta}
                <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-6 right-6 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === index ? "bg-orange-400 w-6" : "bg-gray-300"
                } transition-all duration-300`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
