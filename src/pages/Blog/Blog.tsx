import { Link } from "react-router-dom";
import { useGetAllBlogsQuery } from "../../redux/features/blogs/blogsApi";
import Loading from "../../shared/Loading";

const Blog = () => {
  const { data, isLoading, isError } = useGetAllBlogsQuery({});

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <p className="text-red-600 font-medium">Something went wrong!</p>
          <p className="text-red-400 text-sm mt-1">Please try again later</p>
        </div>
      </div>
    );

  return (
    <section className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative lg:h-[300px] md:h-[400px] h-80 bg-[url(https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-800/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        <div className="flex items-center justify-center h-full">
          <div className="relative px-4 text-center">
            <span className="inline-block px-4 py-1 mb-4 text-sm font-medium text-[#f96d6d] bg-[#f96d6d]/10 rounded-full border border-[#f96d6d]/20">
              Latest Updates
            </span>
            <h1 className="text-white max-w-screen-sm lg:text-5xl md:text-4xl text-3xl font-bold tracking-tight">
              Our <span className="text-[#f96d6d]">Blog</span>
            </h1>
            <p className="mt-4 text-gray-300 text-sm md:text-base max-w-md mx-auto">
              Discover stories, insights, and book recommendations
            </p>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-[#e95b5b] bg-red-50 rounded-full uppercase tracking-wider">
              Articles & Stories
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
              Latest Blog Posts
            </h2>
            <p className="mt-2 text-gray-600 max-w-xl mx-auto">
              Explore our collection of articles, book reviews, and literary insights
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.data?.map((blog: any) => (
              <Link
                to={`/blog/${blog._id}`}
                key={blog._id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#f96d6d]/30 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-white bg-[#f96d6d] rounded-full">
                    {blog.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#e95b5b] transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {blog.content}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#f96d6d] to-[#e95b5b] rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {blog.author?.charAt(0)?.toUpperCase() || 'A'}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {blog.author}
                      </span>
                    </div>
                    <span className="text-[#f96d6d] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                      Read More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {(!data?.data || data?.data?.length === 0) && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Blog Posts Yet</h3>
              <p className="text-gray-500">Check back soon for new articles and stories!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
