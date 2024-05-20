import React from "react";
import "./RegisterForAppraisal.css";
import { Content } from "antd/es/layout/layout";
const RegisterForAppraisal = () => {
  return (
    <Content
      style={{
        padding: "20px 400px",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <h2>Register for Appraisal</h2>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          <br />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <br />

          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" />
          <br />

          <label htmlFor="message">Message:</label>
          <br />
          <textarea id="message" name="message"></textarea>
          <br />

          <button type="submit">Submit</button>
        </form>
      </div>
    </Content>
  );
};

export default RegisterForAppraisal;
