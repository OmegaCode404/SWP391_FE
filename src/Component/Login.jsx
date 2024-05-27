import React from "react";
import { Layout, theme, ConfigProvider } from "antd";
import { Button, Form, Input, Checkbox, Typography } from "antd";
import { Link } from "react-router-dom"; // Import Link for navigation

const { Content } = Layout;
const { Title } = Typography;

const LoginPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <ConfigProvider theme={{ token: { colorBgContainer, borderRadiusLG } }}>
      <Content
        style={{
          padding: "50px 300px 150px",
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
          <Title className="formTitle" type="success" level={2}>
            Login
          </Title>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Link style={{ marginLeft: "90px" }} to="/register">
                Don't have an accout? Register here!
              </Link>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </ConfigProvider>
  );
};

export default LoginPage;
