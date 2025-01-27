import React from "react";
import { Link } from "react-router-dom";
import { NavBarItemsGenerator } from "../../utils/NavBarItemsGenerator";
import { NavbarPath } from "../../routes/Home.Routes";
import imageIcons from "../../images/logo_125x.png";
import PrimaryButton from "../../utils/PrimaryButton";
import SecondaryButton from "../../utils/SecondaryButton";

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const NavBar = () => {
  const [mobileNavbar, setMobileNavBar] = React.useState(false);
  const sidebarItems = NavBarItemsGenerator(NavbarPath, userRole.USER);

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
                  <img
                    src={imageIcons}
                    alt="Logo"
                    style={{ height: "24px", marginRight: "8px" }}
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  {sidebarItems.map((item) => (
                    <li key={item?.key}>
                      {item?.label}
                      {item?.children && (
                        <ul>
                          {item.children.map((child) => (
                            <li key={child?.key}>{child?.label}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Login/Register Buttons */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Link to="/login">
                  <PrimaryButton>Login</PrimaryButton>
                </Link>
                <Link to="/registration">
                  <SecondaryButton>Register</SecondaryButton>
                </Link>
              </div>

              {/* Mobile Hamburger Icon */}
              <div
                onClick={() => setMobileNavBar(!mobileNavbar)}
                className="block md:hidden"
              >
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
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
        </div>
      </header>

      {/* Mobile Navigation */}
      <div
        className={`fixed z-40 w-full bg-gray-200 overflow-hidden flex flex-col lg:hidden gap-4 origin-top duration-700 ease-in-out ${
          mobileNavbar ? "max-h-screen" : "h-0"
        }`}
      >
        <div className="flex flex-col gap-4 m-2 text-sm tracking-wider">
          {sidebarItems.map((item) => (
            <li key={item?.key}>
              {item?.label}
              {item?.children && (
                <ul className="ml-4">
                  {item.children.map((child) => (
                    <li key={child?.key} className="pl-4">
                      {child?.label}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NavBar;
