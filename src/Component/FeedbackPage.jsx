import React, { useEffect, useState } from "react";
import { Form, Input, Button, Rate, message, Spin } from "antd";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "./Hooks/useAuth";
import { Typography } from "antd";

const FeedbackPage = () => {
  const { Text } = Typography;
  const { watchId, userId, userType } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({
    comments: "",
    rating: 0,
    userId: userId,
    buyerId: auth.id,
    watchId: watchId,
    userType: userType, // New field to differentiate between seller and appraiser
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExistingFeedback = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/feedback/${watchId}/${auth.id}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        const existingFeedback = response.data;
        if (existingFeedback) {
          setFeedback({
            comments: existingFeedback.comments,
            rating: existingFeedback.rating,
            userId: userId,
            buyerId: auth.id,
            watchId: watchId,
            userType: userType,
          });
        }
      } catch (error) {
        console.log("No existing feedback found");
      }
    };

    fetchExistingFeedback();
  }, [watchId, userId, userType, auth]);

  const handleFeedbackSubmit = async () => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:8080/api/v1/feedback`, feedback, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      message.success("Feedback submitted successfully");
      navigate(-1); // Go back to the previous page
    } catch (error) {
      console.error("Failed to submit feedback", error);
      message.error("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Submit Feedback</h2>

      <Form onFinish={handleFeedbackSubmit}>
        <Form.Item label="Comments">
          <Input.TextArea
            rows={4}
            style={{ width: "40%" }}
            value={feedback.comments}
            onChange={(e) =>
              setFeedback({ ...feedback, comments: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Rating">
          <Rate
            value={feedback.rating}
            onChange={(value) => setFeedback({ ...feedback, rating: value })}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit Feedback
          </Button>
        </Form.Item>
        {/* <Text>You can only change the feedback</Text> */}
      </Form>
    </div>
  );
};

export default FeedbackPage;
