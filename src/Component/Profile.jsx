import React from "react";
import { Layout, Col, Row, Typography, Avatar, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Rating from "./Rating";
import Loading from "./Loading";
import useAuth from "./Hooks/useAuth";

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const Profile = () => {
  const { auth } = useAuth(); // Use the useAuth hook
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  // If auth is still loading or if user data is not available, show a loading spinner
  if (!auth) {
    return <Loading />;
  }

  const { name, phone, email, avatarUrl, createdDate, rating } = auth;

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
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <PhotoProvider>
              <PhotoView src={avatarUrl}>
                <Avatar src={avatarUrl} size={250}></Avatar>
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
              <strong>User Name:</strong> {name}
            </Paragraph>
            <Paragraph>
              <strong>Phone:</strong> {phone}
            </Paragraph>
            <Paragraph>
              <strong>Email:</strong> {email}
            </Paragraph>
            <Paragraph>
              <strong>Is a member since:</strong> {createdDate}
            </Paragraph>
            <Paragraph>
              <strong>Rating:</strong> <Rating score={rating} />
            </Paragraph>
            <Button type="primary" onClick={handleEditProfile}>
              Edit Profile
            </Button>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default Profile;
