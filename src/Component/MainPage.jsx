import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Banner from "./Banner";
import ItemList from "./ItemList";
import HeaderBar from "./Header";

const { Content, Footer } = Layout;
const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderBar />
      <Content
        style={{
          padding: "0 200px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Banner />
        <div
          style={{
            padding: 24,
            flexGrow: 1,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ItemList />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Antique Watch Hub
      </Footer>
    </Layout>
  );
};

export default App;
