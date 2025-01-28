import React from "react";
import DashboardSiteBar from "../DashboardComponents/DashboardSitebar";
import { Outlet } from "react-router-dom";

const AdminLayOut = () => {
  return (
    <div>
      <DashboardSiteBar />
      <Outlet />
    </div>
  );
};

export default AdminLayOut;
