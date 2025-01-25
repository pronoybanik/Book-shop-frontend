import { Menu } from "antd";
import React from "react";
import { NavBarItemsGenerator } from "../../utils/NavBarItemsGenerator";
import { NavbarPath } from "../../routes/Home.Routes";

const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const NavBar = () => {
  const sidebarItems = NavBarItemsGenerator(NavbarPath, userRole.USER);

  return (
    <>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={sidebarItems}
        style={{ flex: 1, minWidth: 0 }}
      />
    </>
  );
};

export default NavBar;
