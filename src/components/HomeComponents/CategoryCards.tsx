import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowRight, Sparkles } from "lucide-react";

const categories = [
  {
    title: "Fiction",
    subtitle: "Imaginary Stories",
    icon: "📖",
    gradient: "from-purple-500 to-violet-600",
    lightBg: "bg-purple-50",
    count: "2.5k+",
  },
  {
    title: "Non-Fiction",
    subtitle: "Real-Life Facts",
    icon: "📘",
    gradient: "from-blue-500 to-cyan-600",
    lightBg: "bg-blue-50",
    count: "1.8k+",
  },
  {
    title: "Science & Tech",
    subtitle: "Explore Innovation",
    icon: "🔬",
    gradient: "from-emerald-500 to-teal-600",
    lightBg: "bg-emerald-50",
    count: "950+",
  },
  {
    title: "Children's Books",
    subtitle: "Fun for Kids",
    icon: "🧸",
    gradient: "from-amber-400 to-orange-500",
    lightBg: "bg-amber-50",
    count: "1.2k+",
  },
  {
    title: "Young Adult",
    subtitle: "Teens' Favorites",
    icon: "📚",
    gradient: "from-pink-500 to-rose-600",
    lightBg: "bg-pink-50",
    count: "800+",
  },
  {
    title: "Fantasy & Sci-Fi",
    subtitle: "Magic & Beyond",
    icon: "🪄",
    gradient: "from-indigo-500 to-purple-600",
    lightBg: "bg-indigo-50",
    count: "1.5k+",
  },
  {
    title: "Romance",
    subtitle: "Heartwarming Reads",
    icon: "💖",
    gradient: "from-rose-400 to-pink-600",
    lightBg: "bg-rose-50",
    count: "2.1k+",
  },
  {
    title: "Mystery & Thriller",
    subtitle: "Suspense Stories",
    icon: "🕵️‍♂️",
    gradient: "from-slate-600 to-gray-800",
    lightBg: "bg-slate-50",
    count: "1.3k+",
  },
  {
    title: "Business",
    subtitle: "Grow Smarter",
    icon: "💼",
    gradient: "from-orange-500 to-red-600",
    lightBg: "bg-orange-50",
    count: "680+",
  },
  {
    title: "Spirituality",
    subtitle: "Mind & Soul",
    icon: "🕊️",
    gradient: "from-teal-500 to-emerald-600",
    lightBg: "bg-teal-50",
    count: "540+",
  },
];

const CategoryPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[#f96d6d]/10 text-[#f96d6d] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            Explore Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Browse Book <span className="text-[#f96d6d]">Categories</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Find your next favorite read from our curated collection
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              className={`group relative ${category.lightBg} rounded-2xl p-5 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              {/* Gradient Overlay on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
              ></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon Container */}
                <div className="w-14 h-14 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:bg-white/20 group-hover:shadow-lg transition-all duration-300">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-bold text-gray-800 group-hover:text-white transition-colors duration-300 mb-1 text-sm md:text-base">
                  {category.title}
                </h3>
                <p className="text-xs text-gray-500 group-hover:text-white/80 transition-colors duration-300 mb-3">
                  {category.subtitle}
                </p>

                {/* Book Count & Arrow */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-600 group-hover:text-white/90 bg-white/50 group-hover:bg-white/20 px-2 py-1 rounded-full transition-all duration-300">
                    {category.count} books
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Decorative Circle */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f96d6d] to-[#ff8f8f] text-white font-semibold px-8 py-3 rounded-full hover:shadow-lg hover:shadow-[#f96d6d]/30 hover:-translate-y-0.5 transition-all duration-300">
            View All Categories
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
