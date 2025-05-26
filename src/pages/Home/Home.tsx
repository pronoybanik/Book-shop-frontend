import Header from "../../components/HomeComponents/Header";
import Products from "../../components/HomeComponents/Products";
import CategoryCards from "../../components/HomeComponents/CategoryCards";
import BestSellProduct from "../../components/HomeComponents/BestSellProduct";
import BestProduct from "../../components/HomeComponents/BestProduct";
import BlogSection from "../../components/HomeComponents/BlogSection";

const Home = () => {
  return (
    <div>
      <Header />
      <CategoryCards />
      <Products />
      <BestProduct />
      <BlogSection />
      <BestSellProduct />
    </div>
  );
};

export default Home;
