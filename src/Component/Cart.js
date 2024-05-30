// src/Component/Cart.js
import React from "react";
import { useCart } from "../Context/CartContext";
import { List, Button, Typography, Row, Col, theme } from "antd";
import { Content } from "antd/es/layout/layout";

const { Text, Title } = Typography;

const Cart = () => {
  const { state, dispatch } = useCart();
  const { cartItems } = state;

  const handleRemoveFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content
      style={{
        padding: "20px 500px",
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
          Your Cart
        </Title>
        <List
          split="true"
          style={{
            backgroundColor: "#e3cbcb",
            paddingLeft: "20px",
            borderRadius: "2%",
          }}
          itemLayout="horizontal"
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  onClick={() => handleRemoveFromCart(item.id)}
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
                    style={{ width: "70px", borderRadius: "20%" }}
                  />
                }
                title={item.name}
                description={
                  <Text style={{ color: "#ff4d4f" }}>
                    {item.price.toLocaleString()} đ
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
          <Col span={12}>
            <Text strong style={{ fontSize: "16px", color: "#ff4d4f" }}>
              {totalPrice.toLocaleString()} đ
            </Text>
          </Col>
        </Row>
        {cartItems.length > 0 && (
          <Button
            type="primary"
            style={{ marginTop: "20px" }}
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
