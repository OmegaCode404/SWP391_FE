import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";
const labels = ["Home", "About us", "Login"];
const items = labels.map((label, index) => ({
  key: String(index + 1),
  label,
}));
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
      <div className="demo-logo" />
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
    </Header>
  );
};
export default HeaderBar;
