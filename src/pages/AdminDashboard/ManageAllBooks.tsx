import React from "react";
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
} from "../../redux/features/product/productApi";
import SecondaryButton from "../../utils/SecondaryButton";

const ManageAllBooks = () => {
  const { data } = useGetAllProductQuery(undefined);
  const [deleteProduct, { data: deleteData }] = useDeleteProductMutation();
  console.log(deleteData);

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
  };

  return (
    <section>
      <div className="text-center text-lg font-semibold py-2">
        <p className="text-2xl uppercase mb-4 text-black inline-block border-b-2 border-[#e95b5b]">
          All Books section
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Title
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Author
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Category
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Image
              </th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.data?.map((item) => (
              <tr key={item._id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {item?.title}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {item?.author}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {item?.category}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  TK:{item?.price}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <img
                    src={item?.image}
                    alt={item?.title}
                    className="h-16 w-16 object-cover rounded-md"
                  />
                </td>
                <td
                  onClick={() => handleDelete(item._id)}
                  className="whitespace-nowrap px-4 py-2"
                >
                  <SecondaryButton>Delete</SecondaryButton>
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
