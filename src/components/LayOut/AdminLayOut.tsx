import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSiteBar from "../DashboardComponents/DashboardSiteBar";

const AdminLayOut = () => {
  return (
    <div>
      <DashboardSiteBar />
      <Outlet />
    </div>
  );
};

export default AdminLayOut;
