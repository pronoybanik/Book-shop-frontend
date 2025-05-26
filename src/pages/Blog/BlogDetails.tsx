
import { useParams } from "react-router-dom";
import { useGetSingleBlogQuery } from "../../redux/features/blogs/blogsApi";
import Loading from "../../shared/Loading";

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetSingleBlogQuery(id);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-center mt-10 text-red-500">Failed to load blog</p>;

  const blog = data?.data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
        
        <div className="text-sm text-gray-500 mb-4 flex items-center gap-3 flex-wrap">
          <span>Author: <span className="text-gray-700 font-medium">{blog.author}</span></span>
          <span>Category: <span className="text-blue-600">{blog.category}</span></span>
          <span>Date: {new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-80 object-cover rounded-xl mb-6"
        />

        <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
          {blog.content}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
