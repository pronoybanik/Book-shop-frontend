import ChangePassword from "../pages/UserDashboard/ChangePassword";
import UserOrder from "../pages/UserDashboard/UserOrder";
import UserProfile from "../pages/UserDashboard/UserProfile";

export const UserPaths = [
  {
    name: "User Dashboard",
    children: [
      {
        name: "Profile",
        path: "profile",
        element: <UserProfile />,
      },
      {
        name: "My Order",
        path: "my-order",
        element: <UserOrder />,
      },
      {
        name: "change password",
        path: "change-password",
        element: <ChangePassword />,
      },
    ],
  },
];
