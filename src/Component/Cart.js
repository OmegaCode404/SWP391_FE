import React from "react";
import { useCart } from "../Context/CartContext";
import { List, Button, Typography, Row, Col, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const { Text, Title } = Typography;

const Cart = () => {
  const { state, dispatch } = useCart();
  const { cartItems } = state;

  const handleRemoveFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimary, colorError },
  } = theme.useToken();

  return (
    <Content
      style={{
        padding: "20px 20px",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          padding: 24,
          flexGrow: 1,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          maxWidth: "600px",
          width: "100%",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title
          className="formTitle"
          type="success"
          level={2}
          style={{ textAlign: "center" }}
        >
          YOUR CART <FontAwesomeIcon size="lg" icon={faCartShopping} />
        </Title>
        <List
          split="true"
          style={{
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            padding: "10px",
          }}
          itemLayout="horizontal"
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: "10px",
                borderBottom: "1px solid #e8e8e8",
                transition: "background-color 0.3s",
              }}
              actions={[
                <Button
                  type="link"
                  onClick={() => handleRemoveFromCart(item.id)}
                  style={{ color: colorError }}
                >
                  Remove
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "70px", borderRadius: "8px" }}
                  />
                }
                title={
                  <Link to={`/watch/${item.id}`}>{"Title: " + item.name}</Link>
                }
                description={
                  <Text style={{ color: colorPrimary }}>
                    <b>Price: </b> {item.price.toLocaleString()} đ<br></br>
                  </Text>
                }
              />
            </List.Item>
          )}
        />
        <Row style={{ marginTop: "20px" }}>
          <Col span={12}>
            <Text strong style={{ fontSize: "16px" }}>
              Total:
            </Text>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Text strong style={{ fontSize: "16px", color: colorPrimary }}>
              {totalPrice.toLocaleString()} đ
            </Text>
          </Col>
        </Row>
        {cartItems.length > 0 && (
          <Button
            type="primary"
            style={{
              marginTop: "20px",
              background: colorPrimary,
            }}
            onClick={() => alert("Proceeding to checkout...")}
          >
            Proceed to Checkout
          </Button>
        )}
      </div>
    </Content>
  );
};

export default Cart;
