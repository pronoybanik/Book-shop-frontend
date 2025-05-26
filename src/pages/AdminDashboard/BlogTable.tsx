import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "../../redux/features/blogs/blogsApi";
import { toast } from "sonner";


const BlogTable = () => {
  const { data, isLoading, isError } = useGetAllBlogsQuery({});
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id).unwrap();
      toast.success("Blog deleted successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete blog");
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Something went wrong!
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        All Blogs
      </h1>

      <div className="overflow-x-auto rounded-2xl shadow border border-gray-200">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((blog: any) => (
              <tr
                key={blog._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3 font-medium">{blog.title}</td>
                <td className="px-4 py-3">{blog.author}</td>
                <td className="px-4 py-3">{blog.category}</td>
                <td className="px-4 py-3">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition text-xs"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}

            {data?.data?.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogTable;
