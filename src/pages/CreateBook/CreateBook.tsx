import { useForm } from "react-hook-form";
import PrimaryButton from "../../utils/PrimaryButton";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

// // Default values
// const defaultValue: BookFormData = {
//   title: "Atomic Habits2",
//   author: "James Clear",
//   price: 19.99,
//   category: "SelfDevelopment",
//   description:
//     "An easy and proven way to build good habits and break bad ones.",
//   quantity: 100,
//   inStock: true,
//   image: [],
// };

const CreateBook = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>();

  const [createProduct, { isLoading }] =
    useCreateProductMutation();

  const onSubmit = async (data: BookFormData) => {
    const toastId = toast.loading("Submitting...");

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
      // Upload image to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dvcbclqid/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        toast.error("Image upload failed");
      }

      const imgData = await response.json();
      const bookImageUrl = imgData.secure_url;

      // Prepare your book data
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
        toast.success(res.data.message, { id: toastId, duration: 4000 });
        setTimeout(() => {
          navigate("/dashboard/all-books");
        }, 2000);
      } else {
        toast.error("Submission failed", { id: toastId, duration: 4000 });
      }
    } catch (err) {
      console.error("Upload Error:", err);
      toast.error("Something went wrong. Try again later.", { id: toastId });
    }
  };

  

  // const validationError =
  //   bookError?.data?.errorSources?.[0]?.message || bookError?.data?.message;


  return (
    <div className="mx-auto max-w-screen-xl lg:my-4 my-2">
      <div className="text-center text-lg font-semibold py-2">
        <p className="text-2xl uppercase  text-black inline-block border-b-2 border-[#e95b5b]">
          Create Books
        </p>
      </div>
      <div className="mx-auto max-w-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">Add a New Book</p>

          {/* Error Display */}
          {/* {validationError && <Error>{validationError}</Error>} */}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:border-[#e95b5b] focus:ring-[#b84d69] focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              {...register("author", { required: "Author is required" })}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:border-[#e95b5b] focus:ring-[#b84d69] focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {errors.author && (
              <p className="text-red-500 text-xs mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:border-[#e95b5b] focus:ring-[#b84d69] focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              {...register("category", { required: "Category is required" })}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:border-[#e95b5b] focus:ring-[#b84d69] focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:border-[#e95b5b] focus:ring-[#b84d69] focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                valueAsNumber: true,
              })}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:border-[#e95b5b] focus:ring-[#b84d69] focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>

          {/* In Stock */}
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                {...register("inStock")}
                className="rounded border-gray-300 text-[#e95b5b] shadow-sm focus:ring-[#e95b5b]"
              />
              <span className="ml-2 text-sm text-gray-600">In Stock</span>
            </label>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              {...register("image", { required: "Image is required" })}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:border-[#e95b5b] focus:ring-[#b84d69] focus:outline-none focus:ring focus:ring-opacity-40"
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center h-full">
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
