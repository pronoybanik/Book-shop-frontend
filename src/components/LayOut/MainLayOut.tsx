import React from "react";
import { Layout, theme } from "antd";
import Footer from "../HomeComponents/Footer";
import { Outlet } from "react-router-dom";
import NavBar from "../HomeComponents/NavBar";
import imageIcons from "../../images/logo_125x.png";

const { Header, Content } = Layout;

const MainLayOut: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Align logo and navbar properly
          backgroundColor: colorBgContainer, // Optional: style the header background
        }}
      >
        {/* Logo Section  --  colo code: #f96d6d */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={imageIcons}
            alt="Logo"
            style={{ height: "24px", marginRight: "8px" }}
          />
        </div>
        {/* Navigation Bar */}
        <NavBar />
      </Header>

      {/* Content Section */}
      <Content style={{ padding: "8px 32px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>

      {/* Footer  */}
      <Footer />
    </Layout>
  );
};

export default MainLayOut;
