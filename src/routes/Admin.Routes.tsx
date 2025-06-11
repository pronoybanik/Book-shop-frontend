import ProtectedRoute from "../components/LayOut/ProtectedRoute";
import BlogTable from "../pages/AdminDashboard/BlogTable";
import CreateBlog from "../pages/AdminDashboard/CreateBlog";
import ManageAllBooks from "../pages/AdminDashboard/ManageAllBooks";
import UserManagement from "../pages/AdminDashboard/UserManage";
import UserOrderBooks from "../pages/AdminDashboard/UserOrderBooks";
import CreateBook from "../pages/CreateBook/CreateBook";
import Dashboard from "../pages/Dashboard/Dashboard";

export const AdminPaths = [
    {
    name: "Dashboard",
    path: "/dashboard",
    element: <Dashboard/>,
    
  },
  {
    name: "User Management",
    children: [
      {
        name: "Order Page",
        path: "user-order-books",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <UserOrderBooks />
          </ProtectedRoute>
        ),
      },
      {
        name: "User Manage",
        path: "user-manage",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <UserManagement />{" "}
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    name: "Admin Management",
    children: [
      {
        name: "Create-Book",
        path: "create-product",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <CreateBook />,
          </ProtectedRoute>
        ),
      },

      {
        name: "All Books",
        path: "all-books",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <ManageAllBooks />,
          </ProtectedRoute>
        ),
      },
      {
        name: "create-blog",
        path: "create-blog",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <CreateBlog />,
          </ProtectedRoute>
        ),
      },
      {
        name: "All Blogs",
        path: "all-blogs",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <BlogTable />,
          </ProtectedRoute>
        ),
      },
    ],
  },
];
