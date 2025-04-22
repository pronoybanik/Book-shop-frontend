import React from "react";
import { Link } from "react-router-dom";
import { NavBarItemsGenerator } from "../../utils/NavBarItemsGenerator";
import { NavbarPath } from "../../routes/Home.Routes";
import imageIcons from "../../images/logo_125x.png";
import PrimaryButton from "../../utils/PrimaryButton";
import SecondaryButton from "../../utils/SecondaryButton";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

interface User {
  role: string;
}

const NavBar = () => {
  const [mobileNavbar, setMobileNavBar] = React.useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

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

  return (
    <section className="sticky top-0 z-50 bg-white shadow-md">
      <header>
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="md:flex md:items-center md:gap-12">
              <Link to="/" className="block">
                <span className="sr-only">Home</span>
                <div className="flex gap-1 font-serif">
                  <img src={imageIcons} alt="Logo" className="h-6 mr-2" />
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  {sidebarItems.map((item) => (
                    <li key={item?.key} className="relative group">
                      {item?.label}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Login/Register or Logout */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {!user ? (
                  <>
                    <Link to="/login">
                      <PrimaryButton>Login</PrimaryButton>
                    </Link>
                    <Link to="/registration">
                      <SecondaryButton>Register</SecondaryButton>
                    </Link>
                  </>
                ) : (
                  <button onClick={handleLogout}>
                    <SecondaryButton>Logout</SecondaryButton>
                  </button>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileNavBar(!mobileNavbar)}
                className="block md:hidden p-2 rounded bg-gray-100 text-gray-600 transition hover:text-gray-600/75"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div
        className={`fixed z-40 w-full bg-gray-200 overflow-hidden flex flex-col gap-4 origin-top transition-all duration-700 ease-in-out ${
          mobileNavbar ? "max-h-[500px] py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 m-2 text-sm tracking-wider">
          {sidebarItems.map((item) => (
            <li key={item?.key} className="relative">
              {item?.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default NavBar;
