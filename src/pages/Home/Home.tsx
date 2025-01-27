import React from "react";
import Header from "../../components/HomeComponents/Header";
import Products from "../../components/HomeComponents/Products";
import CategoryCards from "../../components/HomeComponents/CategoryCards";
import BestSellProduct from "../../components/HomeComponents/BestSellProduct";

const Home = () => {
  return (
    <div>
      <Header />
      <CategoryCards />
      <Products />
      <BestSellProduct />
    </div>
  );
};

export default Home;
