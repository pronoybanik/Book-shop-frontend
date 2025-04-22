/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Package,
  User,
  CreditCard,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Trash2,
} from "lucide-react";
import { useDeleteOrderMutation } from "../../redux/features/order/orderApi";
import { toast } from "sonner";

const UserOrderCard = ({ order }: { order: any }) => {
  const [expanded, setExpanded] = useState(true);
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this order?");
    if (confirmed) {
      try {
        await deleteOrder(order._id).unwrap();
        toast.success("Order deleted successfully.");
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to delete order.");
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price: number) => {
    return `৳${price}`;
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mt-6">
      {/* Header */}
      <div className="bg-green-500 text-white px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Package size={20} className="mr-2" />
          <span className="font-medium">Order #{order._id.slice(-8)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-green-600 text-xs font-medium px-3 py-1 rounded-full">
            Confirmed
          </span>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-white hover:text-red-200 transition"
            title="Delete Order"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Order Details</h1>
            <p className="text-gray-500">Placed on {formatDate(order.createdAt)}</p>
          </div>
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
            <CreditCard size={18} className="text-gray-500 mr-2" />
            <span className="font-medium text-gray-700">
              Total: {formatPrice(order.totalPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center mb-2">
          <User size={16} className="text-gray-500 mr-2" />
          <h3 className="font-medium text-gray-700">Customer</h3>
        </div>
        <div className="ml-6">
          <p className="text-gray-800 font-medium">{order.userId.name}</p>
          <p className="text-gray-600">{order.userId.email}</p>
          <p className="text-gray-500 text-sm mt-1">
            Customer since {formatDate(order.userId.createdAt)}
          </p>
        </div>
      </div>

      {/* Product List */}
      <div className="px-6 py-4">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <h2 className="text-lg font-bold text-gray-800 flex items-center">
            <Package size={18} className="mr-2 text-gray-500" />
            Products Ordered ({order.products.length})
          </h2>
          {expanded ? (
            <ChevronUp size={20} className="text-gray-500" />
          ) : (
            <ChevronDown size={20} className="text-gray-500" />
          )}
        </div>

        {expanded && (
          <div className="mt-4 space-y-4">
            {order.products.map((item: any) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <div className="w-full sm:w-1/4 h-48 sm:h-auto">
                  <img
                    src={item.productId.image}
                    alt={item.productId.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {item.productId.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        By {item.productId.author}
                      </p>
                      <div className="mt-2 flex items-center">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {item.productId.category}
                        </span>
                        <span className="ml-2 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          ID: {item.productId._id.slice(-6)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-800">
                        {formatPrice(item.productId.price)}
                      </p>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-600 text-sm line-clamp-2">
                    {item.productId.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          item.productId.inStock
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.productId.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                      {item.productId.inStock && (
                        <span className="ml-2 text-xs text-gray-500">
                          {item.productId.quantity} units available
                        </span>
                      )}
                    </div>
                    <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                      View Details <ArrowRight size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between">
          <div>
            <h3 className="font-medium text-gray-700">Order Info</h3>
            <p className="text-gray-600 text-sm mt-1">Order ID: {order._id}</p>
            <p className="text-gray-600 text-sm">
              Order Date: {formatDate(order.createdAt)}
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <h3 className="font-medium text-gray-700">Price Summary</h3>
            <div className="mt-1 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-800">
                  {formatPrice(order.totalPrice - 230)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping & Handling:</span>
                <span className="text-gray-800">{formatPrice(230)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-gray-200 mt-2">
                <span>Total:</span>
                <span>{formatPrice(order.totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderCard;
