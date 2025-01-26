import React from "react";
import { useGetAllProductQuery } from "../../redux/features/product/productApi";

const AllProducts = () => {
  const { data } = useGetAllProductQuery(undefined);
  console.log(data);
  
  return <div>AllProducts page</div>;
};

export default AllProducts;
