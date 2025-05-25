import ProtectedRoute from "../components/LayOut/ProtectedRoute";
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
        element: (
          <ProtectedRoute roles={["user"]}>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        name: "My Order",
        path: "my-order",
        element: (
          <ProtectedRoute roles={["user"]}>
            <UserOrder />{" "}
          </ProtectedRoute>
        ),
      },
      {
        name: "change password",
        path: "change-password",
        element: (
          <ProtectedRoute roles={["user"]}>
            <ChangePassword />{" "}
          </ProtectedRoute>
        ),
      },
    ],
  },
];
