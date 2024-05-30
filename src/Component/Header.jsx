import React from "react";
import { Menu, Layout, Input, Col, Image } from "antd";
import { useNavigate } from "react-router-dom";
import AvatarDropdown from "./Avatar";
import useAuth from "./Hooks/useAuth"; // Import useAuth hook
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const { Header } = Layout;
const { Search } = Input;

const onSearch = (value) => console.log(value);

const HeaderBar = () => {
  const navigate = useNavigate();
  const { auth } = useAuth(); // Use the useAuth hook to get authentication status

  const handleClick = (item) => {
    const path = item.key.toLowerCase();
    navigate(`/${path === "home" ? "" : path}`);
  };

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Col span={3}>
        <Image
          src="https://placeholderlogo.com/img/placeholder-logo-1.png"
          height={60}
        />
      </Col>
      <Col span={10}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          onClick={handleClick}
          style={{ flex: 1, minWidth: 0 }}
        >
          <Menu.Item key="home">Home</Menu.Item>
          <Menu.Item key="about">About us</Menu.Item>
          {auth ? <Menu.Item key="upload">Upload post</Menu.Item> : null}
          {auth ? (
            <Menu.Item key="cart">
              <FontAwesomeIcon size="lg" icon={faCartShopping} />{" "}
            </Menu.Item>
          ) : null}
          {!auth ? <Menu.Item key="login">Login</Menu.Item> : null}
        </Menu>
      </Col>
      <Col span={11} style={{ display: "flex", alignItems: "center" }}>
        <Search
          placeholder="Input watch name here"
          onSearch={onSearch}
          enterButton
          style={{ width: "60%" }}
        />
        {auth ? (
          <div style={{ marginLeft: "auto", marginRight: "15px" }}>
            <AvatarDropdown />
          </div>
        ) : null}
      </Col>
    </Header>
  );
};

export default HeaderBar;
