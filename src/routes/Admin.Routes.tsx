import ProtectedRoute from "../components/LayOut/ProtectedRoute";
import ManageAllBooks from "../pages/AdminDashboard/ManageAllBooks";
import UserManagement from "../pages/AdminDashboard/UserManage";
import UserOrderBooks from "../pages/AdminDashboard/UserOrderBooks";
import CreateBook from "../pages/CreateBook/CreateBook";

export const AdminPaths = [
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
    ],
  },
];
