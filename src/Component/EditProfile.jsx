import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Form, Input, Button, message } from "antd";
import axios from "axios";

const { Content } = Layout;

const EditProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://6644a330b8925626f88f3fb9.mockapi.io/api/v1/user/1"
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const onFinish = async (values) => {
    try {
      await axios.put(
        `https://6644a330b8925626f88f3fb9.mockapi.io/api/v1/user/${userData.id}`,
        values
      );
      message.success("Changed successfully!");
      // Optionally, redirect to the profile page or show a success message
    } catch (error) {
      message.error("Failed!");
    }
  };

  return (
    <Content style={{ padding: "30px 300px 200px", flexGrow: 1 }}>
      <div style={{ padding: 24, background: "#f0f2f5", borderRadius: 16 }}>
        <Row justify="center">
          <Col span={12}>
            <h1>Edit Profile</h1>
            {userData && ( // Check if userData is available before rendering the form
              <Form
                name="editProfile"
                initialValues={userData} // Set initial values for the form fields
                onFinish={onFinish}
              >
                <Form.Item
                  label="User Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    { required: true, message: "Please input your phone!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default EditProfile;
