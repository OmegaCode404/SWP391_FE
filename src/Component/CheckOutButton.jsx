// src/components/CheckoutButton.js
import React from "react";
import axios from "axios";
import { Button, message } from "antd";
import { useCart } from "../Context/CartContext";
import useAuth from "./Hooks/useAuth";

const CheckoutButton = () => {
  const { state } = useCart();
  const { cartItems } = state;
  const { auth } = useAuth();

  const handleCheckout = async () => {
    const amount = cartItems.reduce((total, item) => total + item.price, 0);
    const orderInfo = "Payment for your order at My Watch Shop";

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/payment/create-payment-url",
        {
          amount,
          orderInfo,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`, // Include authentication token in request headers
          },
        }
      );
      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      } else {
        message.error("Failed to create payment URL.");
      }
    } catch (error) {
      console.error("Error creating payment URL: ", error);
      message.error("An error occurred during the payment process.");
    }
  };

  return (
    <Button type="primary" onClick={handleCheckout}>
      Proceed to Checkout
    </Button>
  );
};

export default CheckoutButton;
