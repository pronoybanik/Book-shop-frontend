import {
  useDeleteProductMutation,
  useGetAllProductForDashboardQuery,
} from "../../redux/features/product/productApi";
import Loading from "../../shared/Loading";
import HeaderTitle from "../../utils/HeaderTitle";
import SecondaryButton from "../../utils/SecondaryButton";
import { toast } from "sonner";

type TBook = {
  _id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  quantity: number;
  inStock: boolean;
  image: string;
};

const ManageAllBooks = () => {
  const { data, isLoading } = useGetAllProductForDashboardQuery({});
  const [deleteProduct] = useDeleteProductMutation();
  const bookData = data?.data || [];

  if (isLoading) return <Loading />;

  const handleDelete = async (bookId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;

    try {
      const response = await deleteProduct(bookId).unwrap();
      if (response?.success) {
        toast.success("Book deleted successfully");
      } else {
        toast.error("Failed to delete the book");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="p-4">
      <div className="text-center text-2xl font-semibold mb-6">
        <HeaderTitle title="All Books List" />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-[#e95b5b] text-white sticky top-0">
            <tr>
              <th className="py-3 px-4 text-left"></th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Author</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-center">Price</th>
              <th className="py-3 px-4 text-center">Quantity</th>
              <th className="py-3 px-4 text-center">In Stock</th>
              <th className="py-3 px-4 text-center">Image</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookData.map((book: TBook, idx: number) => (
              <tr
                key={book._id}
                className={`hover:bg-gray-50 transition duration-200 ${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-4">{idx + 1}</td>
                <td className="py-3 px-4">{book.title}</td>
                <td className="py-3 px-4">{book.author}</td>
                <td className="py-3 px-4">{book.category}</td>
                <td className="py-3 px-4 text-center">৳{book.price}</td>
                <td className="py-3 px-4 text-center">{book.quantity}</td>
                <td className="py-3 px-4 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      book.inStock
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {book.inStock ? "Yes" : "No"}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-14 h-14 rounded object-cover mx-auto"
                  />
                </td>
                <td className="py-3 px-4 text-center">
                  <button onClick={() => handleDelete(book._id)}>
                    <SecondaryButton>Delete</SecondaryButton>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageAllBooks;
