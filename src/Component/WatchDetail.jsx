import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "antd"; // Import Carousel and Image for displaying multiple images
import axios from "axios";
import { Layout } from "antd";
import { Col, Row } from "antd";

const { Content } = Layout;
const contentStyle = {
  height: "300px",
  objectFit: "cover",
  margin: "0 auto",
};
const thumbnailStyle = {
  height: "100px",
  width: "100px",
  margin: "5px",
  cursor: "pointer",
  objectFit: "cover",
};

const WatchDetail = () => {
  let { id } = useParams();
  const [watchData, setWatchData] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://6644a330b8925626f88f3fb9.mockapi.io/api/v1/watch/${id}`
        );
        setWatchData(response.data);
      } catch (error) {
        console.error("Error fetching watch details: ", error);
      }
    };

    fetchData();
  }, [id]);

  if (!watchData) {
    return <div>Loading watch details...</div>;
  }
  const handleThumbnailClick = (index) => {
    setCurrentSlide(index);
    carouselRef.current.goTo(index);
  };

  return (
    <Content
      style={{
        padding: "20px 400px",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Row style={{ backgroundColor: "#eee" }}>
        <Col span={14}>
          <Carousel
            ref={carouselRef}
            afterChange={(current) => setCurrentSlide(current)}
            arrows
            initialSlide={currentSlide}
          >
            {watchData.url.map((imageUrl) => (
              <div>
                <img
                  key={imageUrl}
                  src={imageUrl}
                  alt={watchData.name}
                  style={contentStyle}
                />
              </div>
            ))}
          </Carousel>
          <div className="thumbnails">
            {watchData.url.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Thumbnail ${index}`}
                style={{
                  ...thumbnailStyle,
                  border: index === currentSlide ? "2px solid #1890ff" : "none",
                }}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </Col>
        <Col span={10}>
          <h1>{watchData.name}</h1>
          <span className="item-price">
            Price: {watchData.price.toLocaleString()} đ
          </span>
        </Col>
      </Row>
      <div className="watch-description">
        <h2>Description</h2>
        {watchData.description}
      </div>
      <div className="watch-description">
        <h2>Appraisal report</h2>
        <div className="appraisal">
          <Row className="row">
            <Col span={12}>
              <span>Hand</span>
              <br></br>
              <span>good</span>
            </Col>
            <Col span={12}>
              <span>Crown </span> <br></br>
              <span>good</span>
            </Col>
          </Row>
          <Row className="row">
            <Col span={12}>
              <span>Case </span> <br></br>
              <span>good</span>
            </Col>
            <Col span={12}>
              <span>Bralet </span> <br></br>
              <span>good</span>
            </Col>
          </Row>
          <Row className="row">
            <Col span={12}>
              <span>Crystal </span> <br></br>
              <span>good</span>
            </Col>
            <Col span={12}>
              <span>Bralet </span> <br></br>
              <span>good</span>
            </Col>
          </Row>
        </div>
      </div>
    </Content>
  );
};

export default WatchDetail;
