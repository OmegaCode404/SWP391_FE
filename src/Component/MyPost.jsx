// src/Component/Cart.js
import React from "react";
import { theme } from "antd";
import { Content } from "antd/es/layout/layout";

const MyPost = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content
      style={{
        padding: "20px 400px",
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
        My post
      </div>
    </Content>
  );
};

export default MyPost;
