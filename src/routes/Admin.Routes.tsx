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
        element: <UserOrderBooks />,
      },
      {
        name: "User Manage",
        path: "user-manage",
        element: <UserManagement />,
      },
    ],
  },
  {
    name: "Admin Management",
    children: [
      {
        name: "Create-Book",
        path: "create-product",
        element: <CreateBook />,
      },

      {
        name: "All Books",
        path: "all-books",
        element: <ManageAllBooks />,
      },
    ],
  },
];
