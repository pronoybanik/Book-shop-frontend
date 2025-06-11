import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Users,
  BarChart3,
  FileText,
  Bell,
} from "lucide-react";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { selectCurrentUser, TUser } from "../../redux/features/auth/authSlice";
import {
  useGetAllUserQuery,
  useSingleUserQuery,
} from "../../redux/features/auth/authApi";
import { NavBarItemsGenerator } from "../../utils/NavBarItemsGenerator";
import { AdminPaths } from "../../routes/Admin.Routes";
import { Link, Outlet } from "react-router-dom";
import imageIcons from "../../images/logo_125x.png";
import { useGetAllProductForDashboardQuery } from "../../redux/features/product/productApi";

const DashboardSiteBar = () => {
  const userData = useAppSelector<RootState, TUser | null>(selectCurrentUser);
  const id = userData?.userId;
  const { data } = useSingleUserQuery(id);
  const { data: userDataLength } = useGetAllUserQuery(undefined);
  const { data: AllBooksLength } = useGetAllProductForDashboardQuery(undefined);

  const sidebarItems = NavBarItemsGenerator(AdminPaths, "dashboard");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [activeItem, setActiveItem] = useState("dashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleExpanded = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleNavClick = (item: any) => {
    setActiveItem(item.key);
    closeSidebar();
  };

  const SidebarContent = () => (
    <>
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 cursor-pointer">
          <Link to="/" className="ml-2">
            <img src={imageIcons} alt="Logo" className="h-6 mr-2" />
          </Link>
        </div>

        {/* Close button for mobile */}
        <button
          onClick={closeSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {sidebarItems.map((item: any) => (
            <div key={item.key}>
              {item.children ? (
                <div className="space-y-1">
                  <button
                    onClick={() => toggleExpanded(item.key)}
                    className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon && (
                        <item.icon className="w-5 h-5 group-hover:text-blue-600" />
                      )}
                      <span className="group-hover:text-gray-900">
                        {item.label}
                      </span>
                    </div>
                    <div className="transform transition-transform duration-200">
                      {expandedItems[item.key] ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedItems[item.key]
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-8 space-y-1 pt-1">
                      {item.children.map((child: any) => (
                        <button
                          key={child.key}
                          onClick={() => handleNavClick(child)}
                          className={`block w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                            activeItem === child.key
                              ? "bg-[#f4ebeb] text-black border-r-2 border-[#f96d6d] shadow-sm"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleNavClick(item)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
                    activeItem === item.key
                      ? "bg-[#f4ebeb] text-black border-r-2 border-[#f96d6d] shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon && (
                    <item.icon
                      className={`w-5 h-5 ${
                        activeItem === item.key
                          ? "text-blue-600"
                          : "group-hover:text-blue-600"
                      }`}
                    />
                  )}
                  <span
                    className={
                      activeItem === item.key ? "" : "group-hover:text-gray-900"
                    }
                  >
                    {item.label}
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {data?.data?.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {data?.data?.email}
            </p>
          </div>
          <button className="p-1 rounded-full hover:bg-gray-200 transition-colors">
            <Bell className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0 lg:shadow-lg
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col h-full">
          <SidebarContent />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
            <div className="w-10" />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Desktop Header */}
            <div className="hidden lg:block mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Admin Dashboard
                  </h1>
                  <p className="mt-2 text-gray-600">
                    Welcome back! Here's what's happening with your dashboard
                    today.
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                    <Bell className="w-5 h-5 text-gray-600" />
                  </button>
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200"
                  />
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Stats Cards */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Users
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {userDataLength?.data?.length}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-green-600 font-medium">
                    +12% from last month
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Books
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {AllBooksLength?.data?.length}
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-green-600 font-medium">
                    +8% from last month
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Reports</p>
                    <p className="text-2xl font-bold text-gray-900">127</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-red-600 font-medium">
                    -3% from last month
                  </span>
                </div>
              </div>
            </div>

            {/* Main Content Area - This is where your Outlet content would go */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">
                  <Outlet />
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardSiteBar;
