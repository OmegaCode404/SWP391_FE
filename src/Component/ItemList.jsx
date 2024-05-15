import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import axios from "axios";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://6644a330b8925626f88f3fb9.mockapi.io/api/v1/watch"
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Row gutter={16}>
      {items.map((item) => (
        <Col key={item.id} span={8}>
          <Card
            hoverable
            title={item.name}
            bordered={true}
            cover={
              <img
                alt={item.name}
                src={item.url}
                className="item-cover-image"
              />
            }
          >
            <span className="item-price">
              Price: {item.price.toLocaleString()} đ
            </span>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ItemList;
