import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import PrimaryButton from "../../utils/PrimaryButton";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import { toast } from "sonner";
import Error from "../../utils/Error";

const defaultValue = {
  title: "Atomic Habits2",
  author: "James Clear",
  price: 19.99,
  category: "SelfDevelopment",
  description:
    "An easy and proven way to build good habits and break bad ones.",
  quantity: 100,
  inStock: true,
};

const CreateBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValue,
  });

  const [createProduct, { isLoading, error: bookError }] =
    useCreateProductMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Submitting...");

    // const bookImage = data.image[0];
    // console.log("Selected Image:", bookImage);

    // const formData = new FormData();
    // formData.append("image", bookImage);

    // const url =
    //   "https://api.imgbb.com/1/upload?key=99f58a547dc4b1d269148eb1b605ef29";

    try {
      // const response = await fetch(url, {
      //   method: "POST",
      //   body: formData,
      // });

      // // Handle non-JSON responses
      // if (!response.ok) {
      //   const errorText = await response.text(); // Get the error response
      //   console.error("ImgBB API Error:", errorText);
      //   toast.error("Image upload failed. Check API key & file format.", {
      //     id: toastId,
      //   });
      //   return;
      // }

      // const imgData = await response.json();

      // // Check if ImgBB returned a valid image URL
      // if (!imgData?.data?.url) {
      //   console.error("ImgBB Response:", imgData);
      //   toast.error("Image upload failed. Invalid response from server.", {
      //     id: toastId,
      //   });
      //   return;
      // }

      // const bookImageRes = imgData.data.url;
      // console.log("Uploaded Image URL:", bookImageRes);

      // Continue with product creation
      const bookData = {
        title: data.title,
        author: data.author,
        price: parseFloat(data.price),
        category: data.category,
        description: data.description,
        quantity: parseInt(data.quantity),
        inStock: data.inStock,
        image: data.image, 
      };

      const res = await createProduct(bookData);

      if (res?.data?.success) {
        toast.success(res.data.message, { id: toastId, duration: 4000 });
      } else {
        toast.error("Submission failed", { id: toastId, duration: 4000 });
      }
    } catch (err) {
      console.error("Upload Error:", err);
      toast.error("Something went wrong. Try again later.", { id: toastId });
    }
  };

  // Extract error message
  const validationError =
    bookError?.data?.errorSources?.[0]?.message || bookError?.data?.message;

  return (
    <div className="mx-auto max-w-screen-xl lg:my-4 my-2">
      <div className="text-center text-lg  py-2">
        <p className="text-2xl uppercase mb-4 text-black inline-block border-b-2 border-[#e95b5b]">
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
          {validationError && <Error>{validationError}</Error>}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              {...register("title")}
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
              {...register("author")}
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
              {...register("price")}
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
              {...register("category")}
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
              {...register("description")}
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
              {...register("quantity")}
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
              Image URL
            </label>
            <input
              type="text"
              {...register("image")}
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg pl-4 focus:border-[#e95b5b] focus:ring-[#b84d69] focus:outline-none focus:ring focus:ring-opacity-40"
            />
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
