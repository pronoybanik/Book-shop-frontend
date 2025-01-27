import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import UserManage from "../pages/AdminDashboard/UserManage";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "/dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "user Management",
    path: "/user-management",
    element: <UserManage />,
  },
//   {
//     name: "User Management",
//     children: [
//       {
//         name: "User Manage",
//         path: "/user-Manage",
//         element: <UserManage />,
//       },
//     ],
//   },
];
