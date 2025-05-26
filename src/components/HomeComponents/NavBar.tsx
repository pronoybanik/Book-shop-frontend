import { useState, useEffect } from "react";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  ChevronDown,
  X,
  MapPin,
  Tag,
  Phone,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useGetAllProductQuery } from "../../redux/features/product/productApi";
import { useSelector } from "react-redux";
import { NavBarItemsGenerator } from "../../utils/NavBarItemsGenerator";
import { Link } from "react-router-dom";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { NavbarPath } from "../../routes/Home.Routes";
import { RootState } from "../../redux/store";
import NaVBarSearchProduct from "./NaVBarSearchProdcut";
import imageIcons from "../../images/logo_125x.png";
import SecondaryButton from "../../utils/SecondaryButton";
import { clearCart } from "../../redux/features/product/productSlice";

interface User {
  role: string;
}

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileSubmenu, setShowMobileSubmenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();
  const { data } = useGetAllProductQuery({
    searchTerm: searchTerm,
  });
  const bookData = data?.data || [];
  const showResults = searchTerm.length > 0;
  const user = useAppSelector(selectCurrentUser);
  const cartBooks = useSelector((state: RootState) => state.addBooks.books);
  const sidebarItems = NavBarItemsGenerator(NavbarPath, "");

  if ((user as User)?.role === "admin") {
    sidebarItems.push({
      key: "dashboard",
      label: <Link to="/dashboard">Dashboard</Link>,
    });
  }
  if ((user as User)?.role === "user") {
    sidebarItems.push({
      key: "dashboard",
      label: <Link to="/userDashboard">Dashboard</Link>,
    });
  }

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileSubmenu = (key: any) => {
    if (showMobileSubmenu === key) {
      setShowMobileSubmenu(null);
    } else {
      setShowMobileSubmenu(key);
    }
  };

  return (
    <section className="sticky top-0 z-50">
      {/* Top Header Bar - Sleek Professional Design */}
      <div className="bg-slate-900 text-white border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-12 text-sm">
            {/* Left side - Contact info */}
            <div className="hidden md:flex items-center space-x-8 text-slate-300">
              <div className="flex items-center space-x-2 hover:text-white transition-colors">
                <Phone size={16} className="text-[#fc8686]" />
                <span className="font-medium">0(800)123-456</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer">
                <MapPin size={16} className="text-[#fc8686]" />
                <span>Track Your Order</span>
              </div>
            </div>

            {/* Right side - Account links */}
            <div className="flex items-center space-x-6 text-slate-300">
              <a
                href="/deals"
                className="flex items-center space-x-2 hover:text-[#fc8686] transition-colors group"
              >
                <Tag
                  size={16}
                  className="group-hover:rotate-12 transition-transform"
                />
                <span className="hidden sm:inline font-medium">
                  Daily Deals
                </span>
              </a>
              {!user ? (
                <a
                  href="/login"
                  className="hover:text-[#fc8686] transition-colors font-medium"
                >
                  Sign In
                </a>
              ) : (
                <button
                  onClick={handleLogout}
                  className=" text-xs transition-colors font-medium"
                >
                  <SecondaryButton>Logout</SecondaryButton>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Clean Professional Design */}
      <div className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-24">
            {/* Logo - Enhanced Design */}
            <Link to="/" className="flex gap-1 font-serif">
              <img src={imageIcons} alt="Logo" className="h-6 mr-2" />
            </Link>

            {/* Search Bar - Modern Design */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <div className="flex rounded-2xl border-2 border-slate-200 bg-slate-50 hover:bg-white hover:border-[#fc8686] transition-all duration-300 focus-within:ring-4 focus-within:ring-[#fc8686]/30 focus-within:border-[#f96d6d] focus-within:bg-white">
                  <input
                    type="text"
                    className="flex-1 px-6 py-4 text-slate-900 placeholder-slate-500 bg-transparent rounded-l-2xl focus:outline-none font-medium"
                    placeholder="Search books, authors, or categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="bg-gradient-to-r from-[#fc8686] to-[#f96d6d] hover:from-[#f96d6d] hover:to-[#fc8686] px-8 py-4 rounded-r-2xl transition-all duration-300 group shadow-lg hover:shadow-[#fc8686]/30">
                    <Search
                      size={22}
                      className="text-white group-hover:scale-110 transition-transform duration-300"
                    />
                  </button>
                </div>

                {/* Search Results Dropdown */}
                {showResults ? (
                  <NaVBarSearchProduct
                    bookData={bookData}
                    searchTerm={searchTerm}
                  />
                ) : null}
              </div>
            </div>

            {/* Right Section - Enhanced Icons */}
            <div className="flex items-center space-x-3">
              {/* User Account - Desktop */}
              {!user ? (
                <a
                  href="/login"
                  className="hidden lg:flex items-center space-x-3 px-5 py-3 rounded-2xl hover:bg-slate-50 transition-all duration-300 group border border-transparent hover:border-slate-200"
                >
                  <div className="p-3 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl group-hover:from-[#fc8686]/20 group-hover:to-[#f96d6d]/20 transition-all duration-300">
                    <User
                      size={20}
                      className="text-slate-600 group-hover:text-[#f96d6d]"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-slate-500 font-medium">
                      Welcome
                    </div>
                    <div className="text-sm font-bold text-slate-800">
                      Sign In
                    </div>
                  </div>
                </a>
              ) : (
                <div className="hidden lg:flex items-center space-x-3 px-5 py-3 rounded-2xl bg-[#fc8686]/10 border border-[#fc8686]/30">
                  <div className="p-3 bg-gradient-to-br from-[#fc8686]/20 to-[#f96d6d]/20 rounded-xl">
                    <User size={20} className="text-[#f96d6d]" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-[#f96d6d] font-medium">
                      Welcome back
                    </div>
                    <div className="text-sm font-bold text-[#f96d6d]">
                      {user?.role || "null role"}
                    </div>
                  </div>
                </div>
              )}

              {/* Shopping Cart - Enhanced Design */}
              <a href="/addCard" className="relative group">
                <div className="flex items-center space-x-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-200">
                  <div className="relative">
                    <div className="p-3 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl group-hover:from-[#fc8686]/20 group-hover:to-[#f96d6d]/20 transition-all duration-300">
                      <ShoppingBag
                        size={22}
                        className="text-slate-600 group-hover:text-[#f96d6d] transition-colors duration-300"
                      />
                    </div>
                    {cartBooks.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#fc8686] to-[#f96d6d] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse border-2 border-white">
                        {cartBooks.length}
                      </span>
                    )}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-xs text-slate-500 font-medium">
                      Your
                    </div>
                    <div className="text-sm font-bold text-slate-800">Cart</div>
                  </div>
                </div>
              </a>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-3 rounded-2xl hover:bg-slate-100 transition-all duration-300 border border-slate-200"
                onClick={() => setIsOpen(true)}
              >
                <Menu size={24} className="text-slate-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Professional Design */}
      <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Categories Button */}
            <div className="hidden md:block">
              <button className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-2xl hover:from-slate-900 hover:to-black transition-all duration-300 group shadow-lg hover:shadow-xl">
                <Menu
                  size={18}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
                <span className="font-bold">Browse Categories</span>
                <ChevronDown
                  size={16}
                  className="group-hover:rotate-180 transition-transform duration-300"
                />
              </button>
            </div>

            {/* Main Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {sidebarItems.map((item: any) => (
                <div key={item.key} className="relative group">
                  <div className="flex items-center space-x-2 px-6 py-3 font-bold text-slate-700 hover:text-[#f96d6d] transition-all duration-300 cursor-pointer rounded-2xl  ">
                    {item.label}
                    {item.key === "shop" && (
                      <ChevronDown
                        size={16}
                        className="group-hover:rotate-180 transition-transform duration-300"
                      />
                    )}
                  </div>
                  {/* Modern hover indicator */}
                  <div className="absolute bottom-1 left-6 right-6 h-1 bg-gradient-to-r from-[#fc8686] to-[#f96d6d] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              ))}
            </nav>

            {/* Right Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 px-4 py-2 text-sm font-bold text-slate-600 hover:text-[#f96d6d]  rounded-xl "
              >
                <MapPin size={18} />
                <span>Track Order</span>
              </Link>
              <Link
                to="/"
                className="flex items-center space-x-2 px-4 py-2 text-sm font-bold text-slate-600 hover:text-[#f96d6d]  rounded-xl "
              >
                <Tag size={18} />
                <span>Daily Deals</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar - Enhanced */}
      <div className="md:hidden bg-gradient-to-r from-slate-50 to-white px-4 py-4 border-b border-slate-200">
        <div className="flex rounded-2xl border-2 border-slate-200 bg-white shadow-md hover:shadow-lg transition-shadow">
          <input
            type="text"
            className="flex-1 px-5 py-4 text-slate-900 placeholder-slate-500 bg-transparent rounded-l-2xl focus:outline-none font-medium"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-gradient-to-r from-[#fc8686] to-[#f96d6d] hover:from-[#f96d6d] hover:to-[#fc8686] px-6 py-4 rounded-r-2xl transition-all duration-300 shadow-lg">
            <Search size={20} className="text-white" />
          </button>
        </div>

        {showResults ? (
          <NaVBarSearchProduct bookData={bookData} searchTerm={searchTerm} />
        ) : null}
      </div>

      {/* Mobile Sidebar Menu - Professional Design */}
      <div
        className={`fixed top-0 left-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <Link
            to="/"
            className="flex items-center space-x-3"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex gap-1 font-serif">
              <img src={imageIcons} alt="Logo" className="h-6 mr-2" />
            </div>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-xl hover:bg-slate-100 transition-all duration-300"
          >
            <X size={24} className="text-slate-600" />
          </button>
        </div>

        {/* User Section */}
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          {!user ? (
            <a
              href="/login"
              className="flex items-center space-x-4 p-4 rounded-2xl bg-white hover:bg-gradient-to-r hover:from-[#fc8686]/10 hover:to-[#f96d6d]/10 transition-all duration-300 shadow-md hover:shadow-lg border border-slate-200"
              onClick={() => setIsOpen(false)}
            >
              <div className="p-3 bg-gradient-to-br from-[#fc8686] to-[#f96d6d] rounded-2xl shadow-lg">
                <User size={22} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-lg">Sign In</div>
                <div className="text-sm text-slate-500 font-medium">
                  Access your account
                </div>
              </div>
            </a>
          ) : (
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#fc8686]/10 border border-[#fc8686]/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-[#fc8686]/20 to-[#f96d6d]/20 rounded-2xl">
                  <User size={22} className="text-[#f96d6d]" />
                </div>
                <div>
                  <div className="font-bold text-[#f96d6d]">Welcome back</div>
                  <div className="text-sm text-[#f96d6d] font-medium">
                    Account active
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all duration-300 font-bold"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item: any) => (
              <div key={item.key}>
                {item.key === "shop" ? (
                  <button
                    className="flex justify-between items-center w-full p-4 text-left rounded-2xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-200"
                    onClick={() => toggleMobileSubmenu("shop")}
                  >
                    <span className="font-bold text-slate-900 text-lg">
                      Shop
                    </span>
                    <ChevronDown
                      size={18}
                      className={`transform transition-transform duration-300 text-slate-600 ${
                        showMobileSubmenu === "shop" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <div
                    className="p-4 rounded-2xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-200 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="font-bold text-slate-900 text-lg">
                      {item.label}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Additional Links */}
            <div className="border-t border-slate-200 pt-4 mt-6 space-y-2">
              <a
                href="/track-order"
                className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-200"
                onClick={() => setIsOpen(false)}
              >
                <div className="p-2 bg-[#fc8686]/20 rounded-xl">
                  <MapPin size={20} className="text-[#f96d6d]" />
                </div>
                <span className="font-bold text-slate-900">Track Order</span>
              </a>
              <a
                href="/deals"
                className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-200"
                onClick={() => setIsOpen(false)}
              >
                <div className="p-2 bg-[#fc8686]/20 rounded-xl">
                  <Tag size={20} className="text-[#f96d6d]" />
                </div>
                <span className="font-bold text-slate-900">Daily Deals</span>
              </a>
              <a
                href="tel:0(800)123-456"
                className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-slate-50 transition-all duration-300 border border-transparent hover:border-slate-200"
              >
                <div className="p-2 bg-purple-100 rounded-xl">
                  <Phone size={20} className="text-purple-600" />
                </div>
                <span className="font-bold text-slate-900">0(800)123-456</span>
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </section>
  );
};

export default NavBar;
