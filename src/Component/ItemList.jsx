import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import moment from "moment";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://6644a330b8925626f88f3fb9.mockapi.io/api/v1/watch"
        );
        setItems(response.data.map((item) => ({ ...item, url: item.url[0] })));
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTimeSincePost = (postDate) => {
    const now = moment();
    const postDateMoment = moment(postDate);
    const duration = moment.duration(now.diff(postDateMoment));

    if (duration.asMinutes() < 60) {
      return `${Math.floor(duration.asMinutes())} minutes ago`;
    } else if (duration.asHours() < 24) {
      return `${Math.floor(duration.asHours())} hours ago`;
    } else {
      return `${Math.floor(duration.asDays())} days ago`;
    }
  };

  const handleItemClick = (id) => {
    navigate(`/watch/${id}`);
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <Row gutter={16}>
      {items.map((item) => (
        <Col key={item.id} span={6}>
          <Card
            hoverable
            title={item.name}
            bordered={true}
            onClick={() => handleItemClick(item.id)}
            cover={
              <img
                alt={item.name}
                src={item.url}
                className="item-cover-image"
              />
            }
          >
            <div>
              <span className="item-price">
                {item.price.toLocaleString()} đ
              </span>
            </div>
            <div className="item-details">
              <span className="item-seller">Seller: {item.seller.name}</span>
              <span className="item-post-date">
                {getTimeSincePost(item.postDate)}
              </span>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ItemList;
