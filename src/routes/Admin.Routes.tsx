import UserManagement from "../pages/AdminDashboard/UserManage";
import UserOrderBooks from "../pages/AdminDashboard/UserOrderBooks";

export const AdminPaths = [
  {
    name: "User Manage",
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
    name: "Admin Dashboard",
    children: [
      {
        name: "Order Page",
        path: "user-order-books",
        element: <UserOrderBooks />,
      },
     
    ],
  },
];
