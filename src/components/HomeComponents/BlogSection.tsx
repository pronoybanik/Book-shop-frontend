import { Link } from "react-router-dom";
import { useGetAllBlogsQuery } from "../../redux/features/blogs/blogsApi";
import { Sparkles, ArrowRight, Calendar, User, Loader2 } from "lucide-react";

const BlogSection = () => {
  const { data, isLoading, isError } = useGetAllBlogsQuery({});

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={40} className="text-[#f96d6d] animate-spin" />
      </div>
    );
  if (isError)
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <span className="text-2xl">😕</span>
        </div>
        <p className="text-red-500 font-medium">Something went wrong!</p>
      </div>
    );

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[#f96d6d]/10 text-[#f96d6d] px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            From Our Blog
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Latest <span className="text-[#f96d6d]">Articles</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Insights, tips, and stories for book lovers
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.data?.slice(0, 3).map((blog: any, index: number) => (
            <Link
              to={`/blog/${blog._id}`}
              key={blog._id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-[#f96d6d] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                    {blog.category}
                  </span>
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#f96d6d] transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {blog.content}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User size={14} />
                    <span className="font-medium text-gray-700">
                      {blog.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar size={14} />
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Read More */}
                <div className="flex items-center gap-2 mt-4 text-[#f96d6d] font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Read More
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f96d6d] to-[#ff8f8f] text-white font-semibold px-8 py-3 rounded-full hover:shadow-lg hover:shadow-[#f96d6d]/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            View All Posts
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
