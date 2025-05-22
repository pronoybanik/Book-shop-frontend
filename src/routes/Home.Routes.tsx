import About from "../pages/About/About";
import AddToCard from "../pages/AddToCard/AddToCard";
import AllProducts from "../pages/AllProducts/AllProducts";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Registration from "../pages/Registration/Registration";

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
    {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
];
