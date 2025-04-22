import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../images/logo_125x.png";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useSingleUserQuery } from "../../redux/features/auth/authApi";
import { NavBarItemsGenerator } from "../../utils/NavBarItemsGenerator";
import { UserPaths } from "../../routes/UserRoutes";
import { ReactElement, ReactNode } from "react";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

// Type Guard to check if a value is a React Element
const isReactElement = (node: ReactNode): node is ReactElement => {
  return (node as ReactElement).props !== undefined;
};

interface TUser {
  userId: string;
}

const UserDashboardSiteBar = () => {
  const userData = useAppSelector<RootState, TUser | null>(selectCurrentUser);
  const id = userData?.userId;
  const { data } = useSingleUserQuery(id);

  const UserSidebarItems = NavBarItemsGenerator(UserPaths, "UserDashboard");

  return (
    <div className="flex flex-col h-screen md:flex-row bg-white">
      {/* Sidebar */}
      <div className="w-full md:w-64 h-full flex-shrink-0 border-r bg-white">
        <div className="px-4 py-6">
          {/* Logo */}
          <div className="md:flex md:items-center md:gap-12">
            <Link to="/" className="block">
              <span className="sr-only">Home</span>
              <div className="flex gap-1 font-serif">
                <img
                  src={logo}
                  alt="Logo"
                  style={{ height: "24px", marginRight: "8px" }}
                />
              </div>
            </Link>
          </div>

          <nav className="mt-6 space-y-2">
            {UserSidebarItems.map((item) => {
              const children = item?.children || [];

              // Render the main item if it exists without children
              const mainLabel = item?.label;
              const mainLink = isReactElement(mainLabel)
                ? mainLabel.props?.to
                : mainLabel;

              return (
                <div key={item?.key}>
                  <NavLink
                    to={mainLink}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm font-medium rounded-lg ${
                        isActive
                          ? "bg-gray-200 text-gray-900"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    {isReactElement(mainLabel)
                      ? mainLabel.props?.children
                      : mainLabel}
                  </NavLink>

                  {/* Render children as flat links */}
                  {children.map((child) => {
                    const childLabel = child?.label;
                    const childLink = isReactElement(childLabel)
                      ? childLabel.props?.to
                      : childLabel;

                    return (
                      <NavLink
                        key={child?.key}
                        to={childLink}
                        className={({ isActive }) =>
                          `ml-4 block px-4 py-2 text-sm font-medium rounded-lg ${
                            isActive
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700 hover:bg-gray-50"
                          }`
                        }
                      >
                        {isReactElement(childLabel)
                          ? childLabel.props?.children
                          : childLabel}
                      </NavLink>
                    );
                  })}
                </div>
              );
            })}
          </nav>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <div className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
            <img
              alt="User Avatar"
              src="https://ui-avatars.com/api/?name=User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {data?.data?.name || "User Name"}
              </p>
              <p className="text-xs text-gray-500">{data?.data?.email || "user@example.com"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboardSiteBar;
