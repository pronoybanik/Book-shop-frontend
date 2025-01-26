import React from "react";
import NavBar from "../HomeComponents/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../HomeComponents/Footer";

const MainLayOut = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayOut;
