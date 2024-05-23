import React from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Banner from "./Banner";
import ItemList from "./ItemList";
import HeaderBar from "./Header";
import WatchTypeList from "./WatchTypeList";

const { Content } = Layout;
const RegisterPost = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Content
      style={{
        padding: "0 200px",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: 24,
          flexGrow: 1,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Col span={14}></Col>
      </div>
    </Content>
  );
};

export default RegisterPost;
