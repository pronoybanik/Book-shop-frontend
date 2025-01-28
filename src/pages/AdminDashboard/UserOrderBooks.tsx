import React from "react";
import { useGetAllOrderQuery } from "../../redux/features/order/orderApi";

const UserOrderBooks = () => {
  const { data } = useGetAllOrderQuery(undefined);
  console.log(data);
  
  
  return <div>order Books</div>;
};

export default UserOrderBooks;
