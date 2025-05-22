
const categories = [
  {
    title: "Fiction",
    subtitle: "Imaginary Stories",
    icon: "📖",
    bgColor: "bg-purple-100",
  },
  {
    title: "Non-Fiction",
    subtitle: "Real-Life Facts",
    icon: "📘",
    bgColor: "bg-blue-100",
  },
  {
    title: "Science & Technology",
    subtitle: "Explore Innovation",
    icon: "🔬",
    bgColor: "bg-green-100",
  },
  {
    title: "Children's Books",
    subtitle: "Fun for Kids",
    icon: "🧸",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Young Adult (YA)",
    subtitle: "Teens' Favorites",
    icon: "📚",
    bgColor: "bg-pink-100",
  },
  {
    title: "Fantasy & Sci-Fi",
    subtitle: "Magic & Beyond",
    icon: "🪄",
    bgColor: "bg-indigo-100",
  },
  {
    title: "Romance",
    subtitle: "Heartwarming Reads",
    icon: "💖",
    bgColor: "bg-rose-100",
  },
  {
    title: "Mystery & Thriller",
    subtitle: "Suspense Stories",
    icon: "🕵️‍♂️",
    bgColor: "bg-gray-100",
  },
  {
    title: "Business & Finance",
    subtitle: "Grow Smarter",
    icon: "💼",
    bgColor: "bg-orange-100",
  },
  {
    title: "Religion & Spirituality",
    subtitle: "Mind & Soul",
    icon: "🕊️",
    bgColor: "bg-teal-100",
  },
];


const CategoryCards = () => {

  return (
    <div className="mx-auto max-w-screen-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-6 my-24">
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
