import { toast } from "sonner";
import Error from "../../utils/Error";
import PrimaryButton from "../../utils/PrimaryButton";
import {
  useDeleteOrderMutation,
  useGetAllOrderQuery,
} from "../../redux/features/order/orderApi";

interface Product {
  _id: string;
  productId: {
    title: string;
    category: string;
    price: number;
  };
  quantity: number;
}

interface User {
  email: string;
  name: string;
}

interface Order {
  _id: string;
  userId: User;
  totalPrice: number;
  products: Product[];
}

const UserOrderBooks = () => {
  const { data, isLoading, refetch } = useGetAllOrderQuery(undefined);
  const [deleteOrder] = useDeleteOrderMutation();

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmDelete) return;

    try {
      const res = await deleteOrder(id).unwrap();

      if (res.success) {
        toast.success(res.message);
        refetch(); // Refresh orders after deletion
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order. Please try again.");
    }
  };

  if (isLoading) return <p className="text-center font-bold">Loading...</p>;

  return (
    <section>
      <div className="text-center text-lg py-2">
        <p className="text-2xl uppercase mb-4 text-black inline-block border-b-2 border-[#e95b5b]">
          Order Page
        </p>
      </div>

      {data?.data?.length ? (
        <div
          className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 "
          aria-modal="true"
          role="dialog"
        >
          {data?.data?.map((order: Order) => (
            <div
              key={order._id}
              className="mb-6 p-4 border rounded-lg bg-white shadow"
            >
              <div className="px-2">
                <p className="font-medium text-center border-b-2 border-gray-600 w-32 mx-auto mb-2 uppercase">
                  Buyer Info:
                </p>
                <p className="font-medium">Email: {order.userId?.email}</p>
                <p className="font-medium">Name: {order.userId?.name}</p>
                <p className="font-medium flex gap-2">
                  Payment Status: <span className="text-red-600">Paid</span>
                </p>
                <p className="font-medium flex gap-2">
                  Total Price: <span>{order.totalPrice} TK</span>
                </p>
                <p className="font-medium">Present Address: Not Provided</p>
                <p className="font-medium">Shipping Address: Not Provided</p>
              </div>

              {/* Order Products */}
              <div className="mt-4 space-y-6">
                <p className="font-medium text-center border-b-2 border-gray-600 w-40 mx-auto mb-2 uppercase">
                  Order Products
                </p>
                {order.products.map((product: Product) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-4 p-2 border rounded-lg"
                  >
                    <img
                      src="https://via.placeholder.com/80"
                      alt={product.productId?.title}
                      className="h-20 w-20 rounded object-cover"
                    />
                    <div>
                      <h3 className="text-sm text-gray-900">
                        {product.productId?.title}
                      </h3>
                      <p className="text-xs text-gray-600">
                        <span className="">Category:</span>{" "}
                        {product.productId?.category}
                      </p>
                      <p className="text-xs text-gray-600">
                        <span className="">Price:</span>{" "}
                        {product.productId?.price} TK
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delete Order Button (Placed at Order Level) */}
              <div
                onClick={() => handleDelete(order._id)}
                className="flex justify-center mt-4"
              >
                <PrimaryButton>Delete Order</PrimaryButton>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Error>There are no order new</Error>
      )}
    </section>
  );
};

export default UserOrderBooks;
