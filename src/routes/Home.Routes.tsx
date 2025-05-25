import ProtectedRoute from "../components/LayOut/ProtectedRoute";
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
    name: "Books",
    path: "/allProducts",
    element: <AllProducts />,
  },
  {
    name: "About",
    path: "/about",
    element: <About />,
  },
  {
    path: "/productDetails/:id",
    element: (
      <ProtectedRoute  roles={["user", "admin"]}>
        <ProductDetails />
      </ProtectedRoute>
    ),
  },
  {
    name: "Add-Card",
    path: "/addCard",
    element: (
      <ProtectedRoute roles={["user", "admin"]}>
        <AddToCard />
      </ProtectedRoute>
    ),
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
