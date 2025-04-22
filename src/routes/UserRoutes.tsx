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
        element: "order page",
      },
      {
        name: "change password",
        path: "change-password",
        element: "change page",
      },
    ],
  },
];
