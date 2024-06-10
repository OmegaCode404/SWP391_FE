// src/components/PaymentReturn.js
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { message } from "antd";
import { useCart } from "../Context/CartContext";
import useAuth from "./Hooks/useAuth";

const PaymentReturn = () => {
  const location = useLocation();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { state } = useCart();
  const { cartItems } = state;

  useEffect(() => {
    const handlePaymentReturn = async () => {
      const query = queryString.parse(location.search);
      const secureHash = query["vnp_SecureHash"];
      delete query["vnp_SecureHash"];

      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/payment/verify-payment",
          {
            ...query,
            vnp_SecureHash: secureHash,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.accessToken}`, // Include authentication token in request headers
            },
          }
        );
        if (response.data.success) {
          message.success("Payment was successful!");
        } else {
          message.error("Payment failed!");
        }
      } catch (error) {
        console.error("Error verifying payment: ", error);
        message.error("An error occurred while verifying the payment.");
      }

      navigate("/");
    };

    handlePaymentReturn();
  }, [location, navigate]);

  return <div>Processing payment...</div>;
};

export default PaymentReturn;
