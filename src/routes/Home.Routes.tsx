import About from "../pages/About/About";
import AllProducts from "../pages/AllProducts/AllProducts";
import CreateBook from "../pages/CreateBook/CreateBook";
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
    path: "/productDetails",
    element: <ProductDetails />,
  },
  {
    name: "Create-Book",
    path: "/create-product",
    element: <CreateBook />,
  },
];
