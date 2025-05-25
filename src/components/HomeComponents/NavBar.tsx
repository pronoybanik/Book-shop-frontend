import { useState, useEffect } from "react";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  ChevronDown,
  X,
} from "lucide-react";
import imageIcons from "../../images/logo_125x.png";
import { Link } from "react-router-dom";
import { NavBarItemsGenerator } from "../../utils/NavBarItemsGenerator";
import { NavbarPath } from "../../routes/Home.Routes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import SecondaryButton from "../../utils/SecondaryButton";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface User {
  role: string;
}

interface ShopCategory {
  title: string;
  subcategories: string[];
  image?: string;
}

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showShopSubmenu, setShowShopSubmenu] = useState(false);
  const [showMobileSubmenu, setShowMobileSubmenu] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
 

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectCurrentUser);
  console.log(user);

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
  };

  // Close mobile menu when screen size increases
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById("category-dropdown");
      const button = document.getElementById("category-button");

      if (
        dropdown &&
        !dropdown.contains(event.target as Node) &&
        button &&
        !button.contains(event.target as Node)
      ) {
      console.log("Clicked outside the dropdown");
      
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const shopCategories: ShopCategory[] = [
    {
      title: "Furniture",
      subcategories: ["Living Room", "Bedroom", "Office", "Outdoor"],
      image: "/images/category-furniture.jpg",
    },
    {
      title: "Home Decor",
      subcategories: ["Lighting", "Rugs", "Cushions", "Wall Art"],
      image: "/images/category-decor.jpg",
    },
    {
      title: "Kitchen",
      subcategories: ["Appliances", "Cookware", "Tableware", "Storage"],
      image: "/images/category-kitchen.jpg",
    },
    {
      title: "Electronics",
      subcategories: ["TVs", "Computers", "Audio", "Gadgets"],
      image: "/images/category-electronics.jpg",
    },
  ];

  const toggleMobileSubmenu = (key: string) => {
    if (showMobileSubmenu === key) {
      setShowMobileSubmenu(null);
    } else {
      setShowMobileSubmenu(key);
    }
  };

  return (
    <section className="sticky top-0 z-50">
      <div className="w-full font-sans">
        {/* Top Bar */}
        <div className="bg-white py-4 px-4 md:px-8 border-b">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="block">
              <span className="sr-only">Home</span>
              <div className="flex gap-1 font-serif">
                <img src={imageIcons} alt="Logo" className="h-6 mr-2" />
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 mx-8 relative">
              <div className="relative flex w-full">
                <input
                  type="text"
                  className="flex-1 border border-[#f96d6d] py-2 px-4 focus:outline-none"
                  placeholder="Search the book you want..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="bg-[#f96d6d] border border-l-0 border-gray-300 rounded-r p-3 ">
                  <Search size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* Account and Cart */}
            <div className="flex items-center space-x-4">
              {!user ? (
                <Link
                  to="/login"
                  className="hidden md:flex items-center cursor-pointer"
                >
                  <div className="p-2 rounded-full bg-gray-100">
                    <User size={20} />
                  </div>
                  <div className="ml-2">
                    <div className="text-xs text-gray-500">Sign In</div>
                    <div className="text-sm font-medium">Account</div>
                  </div>
                </Link>
              ) : (
                <button onClick={handleLogout}>
                  <SecondaryButton>Logout</SecondaryButton>
                </button>
              )}
              <div className="hidden md:block"></div>
              <Link to="/addCard" className="relative cursor-pointer">
                <ShoppingBag size={24} />
                <span className="absolute -top-2 -right-2 bg-[#f96d6d] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartBooks.length}
                </span>
              </Link>
              <div
                className="md:hidden cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <Menu size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between py-3">
              {/* Categories Browse Button */}
              <div className="relative hidden md:block">
                <button className="flex items-center space-x-2 font-medium">
                  <Menu size={20} />
                  <span>Browse Categories</span>
                </button>
              </div>

              {/* Main Menu */}
              <nav className="hidden md:flex items-center space-x-8">
                {sidebarItems.map((item: any) => {
                  // Check if this is the Shop item to add special submenu
                  if (item.key === "shop") {
                    return (
                      <div
                        key={item.key}
                        className="relative"
                        onMouseEnter={() => setShowShopSubmenu(true)}
                        onMouseLeave={() => setShowShopSubmenu(false)}
                      >
                        <div className="flex items-center font-medium cursor-pointer hover:text-orange-500 transition-colors duration-200">
                          {item.label}
                          <ChevronDown size={16} className="ml-1" />
                        </div>

                        {/* Shop Submenu - Desktop */}
                        {showShopSubmenu && (
                          <div className="absolute z-10 left-0 mt-2 w-[800px] bg-white shadow-lg border border-gray-100 rounded-md">
                            <div className="p-6 grid grid-cols-4 gap-8">
                              {shopCategories.map((category, idx) => (
                                <div key={idx} className="col-span-1">
                                  <h3 className="font-semibold text-gray-900 mb-3 border-b pb-2">
                                    {category.title}
                                  </h3>
                                  <ul className="space-y-2">
                                    {category.subcategories.map(
                                      (sub, subIdx) => (
                                        <li key={subIdx}>
                                          <Link
                                            to={`/shop/${category.title.toLowerCase()}/${sub
                                              .toLowerCase()
                                              .replace(/\s+/g, "-")}`}
                                            className="block text-gray-600 hover:text-orange-500 transition-colors duration-200 text-sm"
                                          >
                                            {sub}
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                  <Link
                                    to={`/shop/${category.title.toLowerCase()}`}
                                    className="text-orange-500 mt-3 inline-block text-sm font-medium hover:underline"
                                  >
                                    View All
                                  </Link>
                                </div>
                              ))}
                            </div>
                            <div className="bg-gray-50 p-4 flex justify-between items-center">
                              <div>
                                <span className="text-sm text-gray-500">
                                  Featured Collections:
                                </span>
                                <div className="flex mt-1 space-x-4">
                                  <Link
                                    to="/shop/new-arrivals"
                                    className="text-sm font-medium hover:text-orange-500"
                                  >
                                    New Arrivals
                                  </Link>
                                  <Link
                                    to="/shop/best-sellers"
                                    className="text-sm font-medium hover:text-orange-500"
                                  >
                                    Best Sellers
                                  </Link>
                                  <Link
                                    to="/shop/sale"
                                    className="text-sm font-medium hover:text-orange-500"
                                  >
                                    Sale Items
                                  </Link>
                                </div>
                              </div>
                              <div>
                                <Link
                                  to="/shop"
                                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded text-sm font-medium transition-colors duration-200"
                                >
                                  Shop All
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  // For other menu items
                  return (
                    <div
                      key={item.key}
                      className="font-medium hover:text-orange-500 transition-colors duration-200"
                    >
                      {item.label}
                    </div>
                  );
                })}
              </nav>

              {/* Right Side Links */}
              <div className="flex items-center space-x-6">
                <Link
                  to="/track-order"
                  className="hidden md:flex items-center font-medium hover:text-orange-500 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  Track Order
                </Link>
                <Link
                  to="/deals"
                  className="hidden md:flex items-center font-medium hover:text-orange-500 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  Daily Deals
                </Link>
                <a
                  href="tel:0(800)123-456"
                  className="hidden md:flex items-center font-medium hover:text-orange-500 transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                  0(800)123-456
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden p-4 bg-gray-50">
          <div className="relative flex w-full">
            <input
              type="text"
              className="w-full border border-[#f96d6d] rounded-l py-2 px-4 focus:outline-none"
              placeholder="Search the book you want..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-[#f96d6d] border border-l-0 border-[#f96d6d]  rounded-r p-3">
              <Search size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Menu */}
        <div
          className={`fixed top-0 left-0 w-4/5 max-w-sm h-full bg-white shadow-xl transform transition-transform z-50 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <Link to="/" className="block" onClick={() => setIsOpen(false)}>
              <img src={imageIcons} alt="Logo" className="h-6" />
            </Link>
            <button onClick={() => setIsOpen(false)} className="p-2">
              <X size={24} />
            </button>
          </div>

          {!user ? (
            <Link to="/login" className="my-4">
              <div className="flex items-center py-2">
                <User size={20} className="mr-3" />
                <div>
                  <div className="text-sm">Sign In</div>
                  <div className="text-xs text-gray-500">Account</div>
                </div>
              </div>
            </Link>
          ) : (
            <button onClick={handleLogout}>
              <SecondaryButton>Logout</SecondaryButton>
            </button>
          )}

          <div className="overflow-y-auto h-full pb-20">
            <nav>
              <ul>
                {sidebarItems.map((item: any) => {
                  // Special handling for Shop item in mobile menu
                  if (item.key === "shop") {
                    return (
                      <li key={item.key} className="border-b">
                        <button
                          className="flex justify-between items-center w-full p-4 text-left"
                          onClick={() => toggleMobileSubmenu("shop")}
                        >
                          <span>Shop</span>
                          <ChevronDown
                            size={16}
                            className={`transform transition-transform ${
                              showMobileSubmenu === "shop" ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {showMobileSubmenu === "shop" && (
                          <div className="bg-gray-50 pl-4">
                            {shopCategories.map((category, idx) => (
                              <div key={idx} className="py-2">
                                <h4 className="font-medium px-4 py-2">
                                  {category.title}
                                </h4>
                                <ul>
                                  {category.subcategories.map((sub, subIdx) => (
                                    <li key={subIdx}>
                                      <Link
                                        to={`/shop/${category.title.toLowerCase()}/${sub
                                          .toLowerCase()
                                          .replace(/\s+/g, "-")}`}
                                        className="block px-4 py-2 text-gray-600"
                                        onClick={() => setIsOpen(false)}
                                      >
                                        {sub}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                                <Link
                                  to={`/shop/${category.title.toLowerCase()}`}
                                  className="block px-4 py-2 text-orange-500 text-sm font-medium"
                                  onClick={() => setIsOpen(false)}
                                >
                                  View All {category.title}
                                </Link>
                              </div>
                            ))}
                            <div className="px-4 py-3 border-t border-gray-200 mt-2">
                              <Link
                                to="/shop"
                                className="block w-full bg-orange-500 text-white text-center py-2 rounded font-medium"
                                onClick={() => setIsOpen(false)}
                              >
                                Shop All Products
                              </Link>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  }

                  // For other menu items in mobile view
                  return (
                    <li key={item.key} className="border-b">
                      <div className="p-4" onClick={() => setIsOpen(false)}>
                        {item.label}
                      </div>
                    </li>
                  );
                })}

                {/* Additional mobile menu items */}
                <li className="border-b">
                  <Link
                    to="/track-order"
                    className="p-4 block"
                    onClick={() => setIsOpen(false)}
                  >
                    Track Order
                  </Link>
                </li>
                <li className="border-b">
                  <Link
                    to="/deals"
                    className="p-4 block"
                    onClick={() => setIsOpen(false)}
                  >
                    Daily Deals
                  </Link>
                </li>
                <li className="border-b">
                  <a href="tel:0(800)123-456" className="p-4 block">
                    0(800)123-456
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </div>
    </section>
  );
};

export default NavBar;
