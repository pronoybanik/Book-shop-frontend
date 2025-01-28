import About from "../pages/About/About";
import AddToCard from "../pages/AddToCard/AddToCard";
import AllProducts from "../pages/AllProducts/AllProducts";
import Home from "../pages/Home/Home";
import ProductDetails from "../pages/ProductDetails/ProductDetails";

export const NavbarPath = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "About",
    path: "/about",
    element: <About />,
  },
  {
    name: "Books",
    path: "/allProducts",
    element: <AllProducts />,
  },
  {
    path: "/productDetails/:id",
    element: <ProductDetails />,
  },
  {
    name: "Add-Card",
    path: "/addCard",
    element: <AddToCard />,
  },
];
