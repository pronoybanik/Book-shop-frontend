import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import { routeGenerator } from "../utils/routesGenerator";
import { NavbarPath } from "./Home.Routes";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import { AdminPaths } from "./Admin.Routes";
import ProtectedRoute from "../components/LayOut/ProtectedRoute";
import UserDashboard from "../pages/UserDashboard/UserDashboard";
import { UserPaths } from "./UserRoutes";

const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeGenerator(NavbarPath),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute role="admin">
        <AdminDashboard />,
      </ProtectedRoute>
    ),
    children: routeGenerator(AdminPaths),
  },
  {
    path: "/userDashboard",
    element: (
      <ProtectedRoute role="user">
        <UserDashboard />,
      </ProtectedRoute>
    ),
    children: routeGenerator(UserPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
]);

export default MainRoutes;
