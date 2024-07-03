import React, { useEffect, useState } from "react";
import {
  Descriptions,
  List,
  message,
  Card,
  Spin,
  Typography,
  Tag,
  Row,
  Col,
  Divider,
  Button,
} from "antd";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import useAuth from "./Hooks/useAuth";
import moment from "moment";

const { Title, Text } = Typography;

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        const orderData = response.data;

        // Fetch appraiser details for each watch in the order
        const updatedOrderItems = await Promise.all(
          orderData.orderItems.map(async (item) => {
            const appraisalResponse = await axios.get(
              `http://localhost:8080/api/v1/appraisal/${item.watch.appraisalId}`,
              {
                headers: {
                  Authorization: `Bearer ${auth.accessToken}`,
                },
              }
            );
            const appraiserId = appraisalResponse.data.appraiserId;
            return { ...item, watch: { ...item.watch, appraiserId } };
          })
        );

        setOrder({ ...orderData, orderItems: updatedOrderItems });
      } catch (error) {
        console.error("Failed to fetch order", error);
        message.error("Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, auth]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  if (loading || !order) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Card
        title={
          <Title level={3} style={{ color: "#1890ff" }}>
            Order Details
          </Title>
        }
        bordered
        style={{ marginBottom: "20px" }}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Order ID">
            <Tag color="blue">{order.id}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Total Amount">
            <Text strong>{formatCurrency(order.totalAmount)}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Created Date">
            <Text>
              {moment(order.createdDate).format("YYYY-MM-DD HH:mm:ss")}
            </Text>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title={<Title level={4}>Order Items</Title>} bordered>
        <List
          bordered
          dataSource={order.orderItems}
          renderItem={(item) => (
            <List.Item style={{ padding: "20px" }}>
              <Row gutter={[16, 16]} style={{ width: "100%" }}>
                <Col xs={24} sm={24} md={6} lg={4} xl={4}>
                  {item.watch.imageUrl && item.watch.imageUrl.length > 0 && (
                    <img
                      src={item.watch.imageUrl[0]}
                      alt={item.watch.name}
                      style={{
                        width: "100%",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </Col>
                <Col xs={24} sm={24} md={18} lg={20} xl={20}>
                  <Descriptions column={1} bordered>
                    <Descriptions.Item label="Name">
                      <Link to={`/watch/${item.watch.id}`}>
                        <Text strong>{item.watch.name}</Text>
                      </Link>
                    </Descriptions.Item>
                    <Descriptions.Item label="Brand">
                      {item.watch.brand}
                    </Descriptions.Item>
                    <Descriptions.Item label="Description">
                      {item.watch.description}
                    </Descriptions.Item>
                    <Descriptions.Item label="Price">
                      {formatCurrency(item.watch.price)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Actions">
                      <Link
                        to={`/feedback/${item.watch.id}/${item.watch.sellerId}/seller`}
                      >
                        <Button type="primary" style={{ marginRight: "10px" }}>
                          Leave Feedback for Seller
                        </Button>
                      </Link>
                      <Link
                        to={`/feedback/${item.watch.id}/${item.watch.appraiserId}/appraiser`}
                      >
                        <Button type="primary">
                          Leave Feedback for Appraiser
                        </Button>
                      </Link>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default OrderDetail;
