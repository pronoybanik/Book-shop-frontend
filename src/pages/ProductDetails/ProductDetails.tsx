import React from "react";
import SecondaryButton from "../../utils/SecondaryButton";
import { useParams } from "react-router-dom";
import { useGetSingleUserQuery } from "../../redux/features/product/productApi";
import { addBookToCart } from "../../redux/features/product/productSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data } = useGetSingleUserQuery(id);
  console.log(data?.data);

  if (!data) return <p>Loading...</p>;

  const handleAddToCart = () => {
    dispatch(addBookToCart(data.data));
    toast.success("Book add to card");
  };

  return (
    <div className="lg:my-16">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-8 ">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Image Section */}
          <div className="p-4 flex justify-center items-center border-1">
            <img
              src={
                data?.data?.image ||
                "https://noraure-5.myshopify.com/cdn/shop/products/6_990320d7-faef-46a6-bc4f-0265c75d2476_1024x1024.png?v=1645682991"
              }
              alt="By The Air"
              className="w-full max-w-sm object-cover rounded"
            />
          </div>

          {/* Product Details Section */}
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              {data?.data?.title}
            </h1>
            <p className="text-xl font-bold text-[#e95b5b] mb-4">
              Tk {data?.data?.price}
            </p>

            <div className="text-sm text-gray-600 mb-6">
              <p>author:-{data?.data?.author}</p>
              <p>Type:- {data?.data?.category}</p>
              <p>
                Availability:-
                <span className="text-green-500"> {data?.data?.quantity}</span>
              </p>
            </div>

            <p className="text-gray-700 text-sm mb-6">
              {data?.data?.description}
            </p>

            <table className="w-full mb-6 text-sm text-left text-gray-600">
              <tbody>
                <tr>
                  <th className="py-2 pr-4 font-medium">Name:</th>
                  <td>{data?.data?.author}</td>
                </tr>

                <tr>
                  <th className="py-2 pr-4 font-medium">Type:</th>
                  <td>{data?.data?.category}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4 font-medium">Manufacturing:</th>
                  <td>2022 / 02 / 23</td>
                </tr>
              </tbody>
            </table>

            <div className="flex items-center gap-4 mb-6">
              <div onClick={handleAddToCart}>
                <SecondaryButton>Add to Cart</SecondaryButton>
              </div>

              <SecondaryButton>Buy it now</SecondaryButton>
            </div>

            <div className="flex text-sm gap-6 text-gray-500">
              <a className="hover:text-gray-800">Size Guide</a>
              <a className="hover:text-gray-800">Shipping</a>
              <a className="hover:text-gray-800">Ask About This Product</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
