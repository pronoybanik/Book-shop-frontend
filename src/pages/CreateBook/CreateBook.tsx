import { useForm } from "react-hook-form";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../utils/PrimaryButton";

// Define form data type
interface BookFormData {
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  image: FileList;
}

const CreateBook = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>();

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const onSubmit = async (data: BookFormData) => {
    const toastId = toast.loading("Uploading and submitting...");

    const imageValue = data.image[0];
    if (!imageValue) {
      toast.error("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageValue);
    formData.append("upload_preset", "Book-sell-shop");
    formData.append("cloud_name", "dvcbclqid");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dvcbclqid/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        toast.error("Image upload failed", { id: toastId });
        return;
      }

      const imgData = await response.json();
      const bookImageUrl = imgData.secure_url;

      const bookData = {
        title: data.title,
        author: data.author,
        price: data.price,
        category: data.category,
        description: data.description,
        quantity: data.quantity,
        inStock: data.inStock,
        image: bookImageUrl,
      };

      const res = await createProduct(bookData);

      if (res?.data?.success) {
        toast.success(res.data.message, { id: toastId });
        setTimeout(() => navigate("/dashboard/all-books"), 2000);
      } else {
        toast.error("Submission failed", { id: toastId });
      }
    } catch (err) {
      console.log("Error uploading image:", err);
      toast.error("Something went wrong. Try again later.", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#e95b5b] mb-8">
          Create New Book
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e95b5b]"
              placeholder="Enter book title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Author
            </label>
            <input
              type="text"
              {...register("author", { required: "Author is required" })}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e95b5b]"
              placeholder="Enter author name"
            />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e95b5b]"
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e95b5b]"
            >
              <option value="">-- Select Category --</option>
              <option value="Fiction">Fiction</option>
              <option value="Science">Science</option>
              <option value="SelfDevelopment">Self-Development</option>
              <option value="Poetry">Poetry</option>
              <option value="Religious">Religious</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows={4}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e95b5b]"
              placeholder="Enter book description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                valueAsNumber: true,
              })}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e95b5b]"
              placeholder="Enter stock quantity"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>

          {/* In Stock */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("inStock")}
              className="accent-[#e95b5b] w-4 h-4"
            />
            <label className="text-sm text-gray-600">Available in stock</label>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Book Cover Image
            </label>
            <input
              type="file"
              {...register("image", { required: "Image is required" })}
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-4">
              <PrimaryButton>
              {isLoading ? "Submitting..." : "Submit"}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBook;
