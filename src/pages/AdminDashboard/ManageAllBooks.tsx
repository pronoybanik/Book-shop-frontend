import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "../../redux/features/product/productApi";
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
  const { data } = useGetAllProductQuery(undefined);
  const [deleteProduct] = useDeleteProductMutation();
  const bookData = data?.data || [];

  const handleDelete = async (bookId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
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
    }
  };

  return (
    <section>
      <div className="text-center text-lg py-2">
        <p className="text-2xl uppercase mb-4 text-black inline-block border-b-2 border-[#e95b5b]">
          All Books list
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-[#e95b5b] text-white">
              <th className="py-2 px-4 border border-gray-200">Title</th>
              <th className="py-2 px-4 border border-gray-200">Author</th>
              <th className="py-2 px-4 border border-gray-200">Category</th>
              <th className="py-2 px-4 border border-gray-200">Price</th>
              <th className="py-2 px-4 border border-gray-200">Quantity</th>
              <th className="py-2 px-4 border border-gray-200">In Stock</th>
              <th className="py-2 px-4 border border-gray-200">Image</th>
              <th className="py-2 px-4 border border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookData.map((book: TBook) => (
              <tr key={book._id} className="text-center hover:bg-gray-100">
                <td className="py-2 px-4 border border-gray-200">
                  {book.title}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {book.author}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {book.category}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  TK:-{book.price}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {book.quantity}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  {book.inStock ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 border border-gray-200">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                </td>
                <td className="py-2 px-4 border border-gray-200">
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
