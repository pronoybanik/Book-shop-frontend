import { useState } from "react";
import {
  Trash2,
  Package,
  User,
  CreditCard,
  MapPin,
  Eye,
  EyeOff,
  ShoppingBag,
  Calendar,
  DollarSign,
} from "lucide-react";
import {
  useDeleteOrderMutation,
  useGetAllOrderQuery,
} from "../../redux/features/order/orderApi";
import { toast } from "sonner";
import Loading from "../../shared/Loading";
import HeaderTitle from "../../utils/HeaderTitle";

const UserOrderBooks = () => {
  const [expandedOrders, setExpandedOrders] = useState(new Set());
  const { data, isLoading, refetch } = useGetAllOrderQuery(undefined);
  const [deleteOrder] = useDeleteOrderMutation();
  const orders = data?.data || [];
  console.log(orders);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmDelete) return;

    try {
      const res = await deleteOrder(id).unwrap();

      if (res.success) {
        toast.success(res.message);
        refetch();
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order. Please try again.");
    }
  };

  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#f96d6d] to-[#fc8686] rounded-full flex items-center justify-center shadow-lg">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>

            <p >
              <HeaderTitle title="Order Management" />
            </p>
          </div>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Manage and track all customer orders with detailed information and
            easy controls
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {orders.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {orders.reduce(
                    (sum: any, order: any) => sum + order.totalPrice,
                    0
                  )}{" "}
                  TK
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Order Value
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {orders.length > 0
                    ? Math.round(
                        orders.reduce(
                          (sum: any, order: any) => sum + order.totalPrice,
                          0
                        ) / orders.length
                      )
                    : 0}{" "}
                  TK
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Orders
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {orders.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        {orders.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {orders.map((order: any) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-[#f96d6d] to-[#fc8686] p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-sm sm:text-base">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <p className="text-white/80 text-xs sm:text-sm">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-lg sm:text-xl">
                        {order.totalPrice} TK
                      </p>
                      <div className="flex items-center gap-1 justify-end">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-white/80 text-xs">Paid</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">
                        {order.userId?.name}
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {order.userId?.email}
                      </p>
                    </div>
                  </div>

                  {/* Address Info */}
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-gray-600 text-xs sm:text-sm">
                        <span className="font-medium">Present:</span> Not
                        Provided
                      </p>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        <span className="font-medium">Shipping:</span> Not
                        Provided
                      </p>
                    </div>
                  </div>

                  {/* Products Section */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Products ({order.products.length})
                      </h4>
                      <button
                        onClick={() => toggleOrderExpansion(order._id)}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {expandedOrders.has(order._id) ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {expandedOrders.has(order._id) ? (
                      <div className="space-y-3">
                        {order.products.map((product: any) => (
                          <div
                            key={product._id}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                          >
                            <img
                              src={
                                product.productId?.image ||
                                "https://via.placeholder.com/50x50/f96d6d/white?text=Book"
                              }
                              alt={product.productId?.title}
                              className="w-12 h-12 sm:w-15 sm:h-15 rounded-lg object-cover shadow-sm"
                            />
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900 text-xs sm:text-sm line-clamp-1">
                                {product.productId?.title}
                              </h5>
                              <p className="text-gray-600 text-xs">
                                {product.productId?.category}
                              </p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-gray-500">
                                  Qty: {product.quantity}
                                </span>
                                <span className="font-semibold text-[#f96d6d] text-xs sm:text-sm">
                                  {product.productId?.price} TK
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex -space-x-2">
                        {order.products.slice(0, 3).map((product: any) => (
                          <img
                            key={product._id}
                            src={
                              product.productId?.image ||
                              "https://via.placeholder.com/50x50/f96d6d/white?text=Book"
                            }
                            alt={product.productId?.title}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-sm"
                          />
                        ))}
                        {order.products.length > 3 && (
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              +{order.products.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2.5 sm:py-3 px-4 rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 font-medium text-sm sm:text-base flex items-center justify-center gap-2 group"
                  >
                    <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Delete Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
              There are no orders to display at the moment. New orders will
              appear here once customers start placing them.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrderBooks;
