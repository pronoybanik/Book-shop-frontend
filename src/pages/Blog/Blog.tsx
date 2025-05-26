import { Link } from "react-router-dom";
import { useGetAllBlogsQuery } from "../../redux/features/blogs/blogsApi";
import Loading from "../../shared/Loading";

const Blog = () => {
  const { data, isLoading, isError } = useGetAllBlogsQuery({});

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Something went wrong!
      </div>
    );

  return (
    <section>
      <div className="relative lg:h-[300px] md:h-[400px] h-80 bg-[url(https://images.unsplash.com/photo-1694232823592-20507733009c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJvb2slMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/20 sm:from-black/50 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="flex items-center justify-center h-full">
          <div className="relative px-4">
            <p className="text-white max-w-screen-sm text-center lg:text-4xl md:text-3xl text-2xl sm:text-xl">
              Blog
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl uppercase font-bold text-center text-gray-800 mb-8">
          Blog Posts
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.data?.map((blog: any) => (
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
    </section>
  );
};

export default Blog;
