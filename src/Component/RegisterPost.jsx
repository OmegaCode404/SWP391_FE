import React from "react";
import { Layout, theme } from "antd";

import ImageUpload from "./ImageUpload";
import { Col, Button, message, Row, Form, Input, Select } from "antd";
import { useState } from "react";
import { Typography } from "antd";
const { Title } = Typography;
const { Option } = Select;
const { Content } = Layout;
const RegisterPost = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleFilesSelected = (fileList) => {
    setSelectedFiles(fileList.map((file) => file.originFileObj));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files[]", file);
    });
    try {
      const response = await fetch(
        "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        message.success("Upload successful!");
        setSelectedFiles([]); // Clear selected files
      } else {
        message.error("Upload failed.");
      }
    } catch (error) {
      message.error("Upload error: " + error);
    }
  };
  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  const watchTypes = [
    { name: "Mechanical" },
    { name: "Automatic" },
    { name: "Hybrid" },
    { name: "Chronograph" },
    { name: "Classic" },
    { name: "Luxury" },
  ];

  return (
    <Content
      style={{
        padding: "30px 300px 0 300px",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: 24,
          flexGrow: 1,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Title color="#c57071" level={2}>
          UPLOAD WATCH FORM
        </Title>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Title type="success" level={2}>
              Upload Image here
            </Title>
            <ImageUpload onFilesSelected={handleFilesSelected} />
          </Col>
          <Col style={{ borderLeft: "solid 1px" }} span={16}>
            <Title type="success" level={2}>
              Watch's information
            </Title>
            <Form
              name="register_post_form"
              onFinish={onFinish}
              style={{ marginTop: 16 }}
            >
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                    message: "Please enter the title",
                  },
                ]}
              >
                <Input placeholder="Enter title here" />
              </Form.Item>
              <Form.Item
                name="watchtype"
                label="Watch type"
                rules={[
                  {
                    required: true,
                  },
                ]}
                initialValue="Choose watch catalog here"
              >
                <Select>
                  {watchTypes.map((type, index) => (
                    <Option key={index} value={type.name}>
                      {type.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please enter the description",
                  },
                ]}
              >
                <Input.TextArea placeholder="Enter description" />
              </Form.Item>
            </Form>
            {selectedFiles.length > 0 && (
              <Button
                type="primary"
                onClick={handleUpload}
                style={{ marginTop: 16 }}
              >
                Upload Selected Files
              </Button>
            )}
          </Col>
        </Row>
      </div>
    </Content>
  );
};
export default RegisterPost;
