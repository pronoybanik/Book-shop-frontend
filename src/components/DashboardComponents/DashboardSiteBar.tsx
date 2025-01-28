import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AdminPaths } from "../../routes/Admin.Routes";
import { NavBarItemsGenerator } from "../../utils/NavBarItemsGenerator";
import logo from "../../images/logo_125x.png";

const DashboardSiteBar = () => {
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
                              to={child?.label?.props?.to}
                              className={({ isActive }) =>
                                `block px-4 py-2 text-sm font-medium rounded-lg ${
                                  isActive
                                    ? "bg-gray-200 text-gray-900"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`
                              }
                            >
                              {child?.label?.props?.children}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <NavLink
                      to={item?.label?.props?.to}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm font-medium rounded-lg ${
                          isActive
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      {item?.label?.children}
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
                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="h-10 w-10 rounded-full object-cover"
              />

              <div>
                <p className="text-xs">
                  <strong className="block font-medium">Eric Frusciante</strong>

                  <span> eric@frusciante.com </span>
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            <Outlet />
          </p>
        </main>
      </div>
    </div>
  );
};

export default DashboardSiteBar;
