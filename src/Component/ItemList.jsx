import React from "react";
import { Card, Col, Row } from "antd";
const ItemList = () => (
  <Row gutter={16}>
    <Col span={8}>
      <Card hoverable title="Card title" bordered={false}>
        Card content
      </Card>
    </Col>
    <Col span={8}>
      <Card hoverable title="Card title" bordered={false}>
        Card content
      </Card>
    </Col>
    <Col span={8}>
      <Card hoverable title="Card title" bordered={false}>
        Card content
      </Card>
    </Col>
  </Row>
);
export default ItemList;
