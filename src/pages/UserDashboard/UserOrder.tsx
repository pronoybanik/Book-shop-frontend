/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetUserOrderProductQuery } from "../../redux/features/order/orderApi";
import UserOrderCard from "../../components/UserDashboardComponents/OrderCard";
import HeaderTitle from "../../utils/HeaderTitle";
import Loading from "../../shared/Loading";

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
    <div className=" bg-gray-50 py-10 px-4">
      <h1 className="text-center my-4">
        <HeaderTitle title="My Orders" />
      </h1>

      {isLoading ? (
        <>
          <Loading />
        </>
      ) : isError ? (
        <p className="text-center text-red-600 text-xl">
          Failed to fetch orders. Please try again.
        </p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600 text-xl">No orders found.</p>
      ) : (
        orders.map((order: any) => (
          <UserOrderCard key={order._id} order={order} />
        ))
      )}
    </div>
  );
};

export default UserOrder;
