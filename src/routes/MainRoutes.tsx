import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import { routeGenerator } from "../utils/routesGenerator";
import { NavbarPath } from "./Home.Routes";
import AdminLayOut from "../components/LayOut/AdminLayOut";

const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeGenerator(NavbarPath),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/dashboard",
    element: <AdminLayOut />
  },
]);

export default MainRoutes;
