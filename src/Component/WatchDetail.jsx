import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel, message } from "antd";
import axios from "axios";
import { Layout, Col, Row, Button, Typography } from "antd";
import moment from "moment";
import Loading from "./Loading";
import Rating from "./Rating";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useCart } from "../Context/CartContext";
import useAuth from "./Hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const { Text } = Typography;
const { Content } = Layout;

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
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);
  const { auth } = useAuth();
  const { state: cartState, dispatch } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://6644a330b8925626f88f3fb9.mockapi.io/api/v1/watch/${id}`
        );
        setWatchData(response.data);
      } catch (error) {
        console.error("Error fetching watch details: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleThumbnailClick = (index) => {
    setCurrentSlide(index);
    carouselRef.current.goTo(index);
  };

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

  const addToCart = () => {
    if (auth) {
      const itemInCart = cartState.cartItems.find(
        (item) => item.id === watchData.id
      );
      const itemsFromDifferentSeller = cartState.cartItems.some(
        (item) => item.sellerId !== watchData.seller.id
      );

      if (itemInCart) {
        message.info("This item is already in your cart.");
      } else if (itemsFromDifferentSeller) {
        message.info(
          "You cannot add items from different sellers to the cart."
        );
      } else {
        dispatch({
          type: "ADD_TO_CART",
          payload: {
            id: watchData.id,
            name: watchData.name,
            price: watchData.price,
            image: watchData.url[0],
            sellerId: watchData.seller.id,
            sellerName: watchData.seller.name,
          },
        });
        message.success("Added to cart successfully!");
      }
    } else {
      message.info("You have to log in first!");
      navigate("/login");
    }
  };

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
      <Row style={{ backgroundColor: "#eee" }}>
        <Col span={12}>
          <Carousel
            ref={carouselRef}
            afterChange={(current) => setCurrentSlide(current)}
            arrows
            initialSlide={currentSlide}
          >
            {watchData.url.map((imageUrl) => (
              <div key={imageUrl}>
                <PhotoProvider>
                  <PhotoView src={imageUrl}>
                    <img
                      key={imageUrl}
                      src={imageUrl}
                      alt={watchData.name}
                      className="contentStyle"
                    />
                  </PhotoView>
                </PhotoProvider>
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

        <Col style={{ marginLeft: "20px" }} span={11}>
          <h1>{watchData.name}</h1>
          <div style={{ marginBottom: "10px" }}>
            <Text strong style={{ fontSize: "16px" }}>
              Price:{" "}
            </Text>
            <Text style={{ fontSize: "16px", color: "#ff4d4f" }}>
              {watchData.price.toLocaleString()} đ
            </Text>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Text strong style={{ fontSize: "16px" }}>
              Posted:{" "}
            </Text>
            <Text style={{ fontSize: "16px" }}>
              {getTimeSincePost(watchData.postDate)}
            </Text>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Text style={{ fontSize: "16px" }}>
              Seller:{" "}
              <Link to={`/user/${watchData.seller.id}`}>
                {watchData?.seller.name}
              </Link>
            </Text>
            {" ("}
            <Rating score={watchData?.seller.rating}></Rating>
            {")"}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Text strong style={{ fontSize: "16px" }}>
              Appraised by:{" "}
            </Text>
            <Text style={{ fontSize: "16px" }}>
              {watchData?.appraiser.name}
            </Text>
          </div>
          <Button type="primary" onClick={addToCart}>
            Add to Cart <FontAwesomeIcon size="lg" icon={faCartShopping} />
          </Button>
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
            <Col span={8}>
              <span className="attribute">Brand</span>
              <br></br>
              <span>Rolex</span>
            </Col>
            <Col span={8}>
              <span className="attribute">Hand </span> <br></br>
              <span>stick</span>
            </Col>
            <Col span={8}>
              <span className="attribute">Crown </span> <br></br>
              <span>good</span>
            </Col>
          </Row>
          <Row className="row">
            <Col span={8}>
              <span className="attribute">Model</span>
              <br></br>
              <span>Rolex Submariner</span>
            </Col>
            <Col span={8}>
              <span className="attribute">Case material </span> <br></br>
              <span>steel</span>
            </Col>
            <Col span={8}>
              <span className="attribute">Braclet </span> <br></br>
              <span>solid</span>
            </Col>
          </Row>
          <Row className="row">
            <Col span={8}>
              <span className="attribute">Crystal </span> <br></br>
              <span>nice</span>
            </Col>
            <Col span={8}>
              <span className="attribute">Dial </span> <br></br>
              <span>good</span>
            </Col>
            <Col span={8}>
              <span className="attribute">Water resistance </span> <br></br>
              <span>Yes</span>
            </Col>
          </Row>
        </div>
      </div>
    </Content>
  );
};

export default WatchDetail;
