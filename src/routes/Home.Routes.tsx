import About from "../pages/About/About";
import Home from "../pages/Home/Home";

export const NavbarPath = [
  {
    name: "home",
    path: "/",
    element: <Home />,
  },
  {
    name: "About",
    path: "/about",
    element: <About />,
  },
];
