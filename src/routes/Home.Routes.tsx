import About from "../pages/About/About";
import AllProducts from "../pages/AllProducts/AllProducts";
import Home from "../pages/Home/Home";
import ProductDetails from "../pages/ProductDetails/ProductDetails";

export const NavbarPath = [
  {
    name: "home",
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
    // name: "Books",
    path: "/productDetails",
    element: <ProductDetails />,
  },
];
