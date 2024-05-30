import React, { useRef, useState, useEffect } from "react";
import {
  Layout,
  theme,
  ConfigProvider,
  Button,
  Form,
  Input,
  Checkbox,
  Typography,
} from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "./Hooks/useAuth";
import axios from "axios";

const { Content } = Layout;
const { Title } = Typography;
const LOGIN_URL = "https://6656dd4e9f970b3b36c6e348.mockapi.io/Login";

const LoginPage = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.get(
        LOGIN_URL,
        JSON.stringify({ email: values.email, pwd: values.password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const userData = response?.data[0]; // Assuming only one user object is returned
      const {
        name,
        email,
        password,
        avatarUrl,
        userRoleId,
        phone,
        token,
        createdDate,
        rating,
      } = userData;

      setAuth({
        name,
        phone,
        avatarUrl,
        email,
        password,
        createdDate,
        rating,
        roles: userRoleId,
        accessToken: token,
      });

      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  console.log(auth);

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
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input ref={userRef} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Link style={{ marginLeft: "90px" }} to="/register">
                Don't have an account? Register here!
              </Link>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </ConfigProvider>
  );
};

export default LoginPage;
