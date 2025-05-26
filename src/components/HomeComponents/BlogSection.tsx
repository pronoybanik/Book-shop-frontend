import { Link } from "react-router-dom";
import { useGetAllBlogsQuery } from "../../redux/features/blogs/blogsApi";

const BlogSection = () => {
  const { data, isLoading, isError } = useGetAllBlogsQuery({});

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Something went wrong!
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold uppercase text-center text-gray-800 mb-8">
        Blog Posts
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.data?.slice(0, 3).map((blog: any) => (
          <Link
            to={`/blog/${blog._id}`}
            key={blog._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              <p className="text-sm text-blue-600 font-medium mb-2">
                {blog.category}
              </p>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {blog.content}
              </p>

              <div className="flex justify-between items-center text-sm text-gray-500">
                <p>
                  By{" "}
                  <span className="font-medium text-gray-700">
                    {blog.author}
                  </span>
                </p>
                <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
