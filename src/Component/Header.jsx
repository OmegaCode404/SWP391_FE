import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { Col, Row } from "antd";
import { Image } from "antd";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const HeaderBar = () => {
  const navigate = useNavigate();
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
      <Col span={5}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          onClick={handleClick}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Menu.Item key="home">Home</Menu.Item>
          <Menu.Item key="about">About us</Menu.Item>
          <Menu.Item key="login">Login</Menu.Item>
        </Menu>
      </Col>
      <Col span={16}>
        <Search
          placeholder="Input watch name here"
          onSearch={onSearch}
          enterButton
          style={{ marginTop: "15px", width: "60%" }}
        />
      </Col>
    </Header>
  );
};
export default HeaderBar;
