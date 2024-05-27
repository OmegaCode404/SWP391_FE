import React, { useState, useEffect } from "react";
import { Layout, Col, Row, Typography, Avatar, Button } from "antd";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Rating from "./Rating";
import Loading from "./Loading";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://6644a330b8925626f88f3fb9.mockapi.io/api/v1/user/1"
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <Content
      style={{
        padding: "30px 300px 200px",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: 24,
          flexGrow: 1,
          background: "#f0f2f5",
          borderRadius: 16,
        }}
      >
        {userData && (
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <PhotoProvider>
                <PhotoView src={userData.avatarUrl}>
                  <Avatar src={userData.avatarUrl} size={250}></Avatar>
                </PhotoView>
              </PhotoProvider>
            </Col>
            <Col
              style={{ borderLeft: "solid 1px #e8e8e8", paddingLeft: 24 }}
              span={16}
            >
              <Title className="formTitle" level={2}>
                User Information
              </Title>
              <Paragraph>
                <strong>User Name:</strong> {userData.name}
              </Paragraph>
              <Paragraph>
                <strong>Phone:</strong> {userData.phone}
              </Paragraph>
              <Paragraph>
                <strong>Email:</strong> {userData.gmail}
              </Paragraph>
              <Paragraph>
                <strong>Is a member since:</strong> {userData.createdDate}
              </Paragraph>
              <Paragraph>
                <strong>Rating:</strong> <Rating score={userData.rating} />
              </Paragraph>
              <Button type="primary" onClick={handleEditProfile}>
                Edit Profile
              </Button>
            </Col>
          </Row>
        )}
      </div>
    </Content>
  );
};

export default Profile;
