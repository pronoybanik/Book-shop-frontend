import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Footer from "../HomeComponents/Footer";
import { Outlet } from "react-router-dom";
import imageIcons from "../../images/logo_125x.png";
import NavBar from "../HomeComponents/NavBar";

const { Header, Content } = Layout;

const MainLayOut: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <NavBar />
      </Header>
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
      <Footer></Footer>
    </Layout>
  );
};

export default MainLayOut;
