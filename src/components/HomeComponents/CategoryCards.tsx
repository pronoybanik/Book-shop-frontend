import React from "react";

const categories = [
  {
    title: "Photography",
    subtitle: "Super Collections",
    icon: "📸",
    bgColor: "bg-purple-100",
  },
  {
    title: "Food & Drink",
    subtitle: "Special Collections",
    icon: "🍔",
    bgColor: "bg-orange-100",
  },
  {
    title: "Health",
    subtitle: "Best Collections",
    icon: "🩺",
    bgColor: "bg-blue-100",
  },
  {
    title: "Romance",
    subtitle: "Top Collections",
    icon: "💖",
    bgColor: "bg-pink-100",
  },
  {
    title: "Biography",
    subtitle: "Nice Collections",
    icon: "📄",
    bgColor: "bg-green-100",
  },
];

const CategoryCards = () => {
  return (
    <div className="mx-auto max-w-screen-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-6 mt-24">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow-md ${category.bgColor}`}
        >
          <div className="text-5xl mb-4">{category.icon}</div>
          <h2 className="text-xl font-bold mb-2">{category.title}</h2>
          <p className="text-sm text-gray-600">{category.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryCards;
