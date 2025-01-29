import { Link, NavLink, Outlet } from "react-router-dom";
import { AdminPaths } from "../../routes/Admin.Routes";
import { NavBarItemsGenerator } from "../../utils/NavBarItemsGenerator";
import logo from "../../images/logo_125x.png";
import { ReactNode, ReactElement } from "react";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { useSingleUserQuery } from "../../redux/features/auth/authApi";
import { RootState } from "../../redux/store";

// Type Guard to check if a value is a React Element
const isReactElement = (node: ReactNode): node is ReactElement => {
  return (node as ReactElement).props !== undefined;
};

interface TUser {
  userId: string;
}

const DashboardSiteBar = () => {
  const userData = useAppSelector<RootState, TUser | null>(selectCurrentUser);
const id = userData?.userId; 
const { data } = useSingleUserQuery(id);


  const sidebarItems = NavBarItemsGenerator(AdminPaths, "dashboard");

  return (
    <div>
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
              {sidebarItems.map((item) => (
                <div key={item?.key}>
                  {item?.children ? (
                    <details className="group">
                      <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                        <span className="shrink-0 transition group-open:-rotate-180">
                          ▼
                        </span>
                      </summary>
                      <ul className="mt-2 space-y-1 px-4">
                        {item.children.map((child) => (
                          <li key={child?.key}>
                            <NavLink
                              to={
                                isReactElement(child?.label)
                                  ? child?.label.props?.to // access to safely when it's a React element
                                  : child?.label
                              }
                              className={({ isActive }) =>
                                `block px-4 py-2 text-sm font-medium rounded-lg ${
                                  isActive
                                    ? "bg-gray-200 text-gray-900"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`
                              }
                            >
                              {isReactElement(child?.label)
                                ? child?.label.props?.children
                                : child?.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <NavLink
                      to={
                        isReactElement(item?.label)
                          ? item?.label.props?.to // access to safely when it's a React element
                          : item?.label
                      }
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm font-medium rounded-lg ${
                          isActive
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      {isReactElement(item?.label)
                        ? item?.label.props?.children
                        : item?.label}
                    </NavLink>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
            <a
              href="#"
              className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
            >
              <img
                alt="User Avatar"
                src="data:image/png;base64,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"
                className="h-10 w-10 rounded-full object-cover"
              />

              <div>
                <p className="text-xs">
                  <strong className="block font-medium">
                    {data?.data?.name}
                  </strong>

                  <span> {data?.data?.email} </span>
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-xl text-center font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            <Outlet />
          </p>
        </main>
      </div>
    </div>
  );
};

export default DashboardSiteBar;
