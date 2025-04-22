/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetUserOrderProductQuery } from "../../redux/features/order/orderApi";
import UserOrderCard from "../../components/UserDashboardComponents/OrderCard";

const UserOrder = () => {
  const user = useAppSelector(selectCurrentUser);
  const userId = user?.userId;

  const {
    data: ordersData,
    isLoading,
    isError,
  } = useGetUserOrderProductQuery(userId);

  const orders = ordersData?.date || [];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        My Orders
      </h1>

      {isLoading ? (
        <p className="text-center text-blue-600">Loading orders...</p>
      ) : isError ? (
        <p className="text-center text-red-600">
          Failed to fetch orders. Please try again.
        </p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        orders.map((order: any) => (
          <UserOrderCard key={order._id} order={order} />
        ))
      )}
    </div>
  );
};

export default UserOrder;
