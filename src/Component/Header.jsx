import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import { Col, Row } from "antd";
import { Image } from "antd";

const { Search } = Input;
const labels = ["Home", "About us", "Login"];
const items = labels.map((label, index) => ({
  key: String(index + 1),
  label,
}));
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);
const HeaderBar = () => {
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
          defaultSelectedKeys={["2"]}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
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
