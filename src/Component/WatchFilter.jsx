import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, Card } from "antd";
import { Content } from "antd/es/layout/layout";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import WatchTypeList from "./WatchTypeList";
import { theme } from "antd";
import { Select } from "antd";

const WatchFilter = () => {
  const { type } = useParams();
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("ascending");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchWatches = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://6644a330b8925626f88f3fb9.mockapi.io/api/v1/watch`
        );
        const filteredWatches = response.data.filter(
          (watch) => watch.type === type
        );
        setWatches(filteredWatches);
      } catch (error) {
        console.error("Error fetching watches: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWatches();
  }, [type]);
  const sortItems = (sortBy) => {
    const sortedItems = [...watches];
    if (sortBy === "ascending") {
      sortedItems.sort((a, b) => a.price - b.price);
    } else if (sortBy === "descending") {
      sortedItems.sort((a, b) => b.price - a.price);
    }
    setWatches(sortedItems);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    sortItems(value);
  };
  const handleItemClick = (id) => {
    navigate(`/watch/${id}`);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (loading) {
    return <Loading />;
  }

  return (
    <Content
      style={{
        padding: "20px 400px",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <WatchTypeList />
      <Select
        defaultValue="ascending"
        style={{ width: 170, marginBottom: 20 }}
        onChange={handleSortChange}
        options={[
          { value: "ascending", label: "Lowest to highest" },
          { value: "descending", label: "Highest to lowest" },
        ]}
      />

      <div
        style={{
          padding: 24,
          flexGrow: 1,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <h1>{type} Watches</h1>
        <Row gutter={[16, 16]}>
          {watches.map((watch) => (
            <Col key={watch.id} span={24}>
              <Card hoverable onClick={() => handleItemClick(watch.id)}>
                <Row gutter={16} align="middle">
                  <Col span={8}>
                    <img
                      alt={watch.name}
                      src={watch.url[0]}
                      style={{ width: "70%", height: "auto" }}
                    />
                  </Col>
                  <Col span={16}>
                    <Card.Meta
                      title={watch.name}
                      description={
                        <>
                          <p>{watch.description}</p>
                          <p className="item-price">
                            Price: {watch.price.toLocaleString()} đ
                          </p>
                        </>
                      }
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Content>
  );
};

export default WatchFilter;
