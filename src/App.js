import React from "react";
import "./App.css";
import MainPage from "./Component/MainPage";
import HeaderBar from "./Component/Header";
import Footer from "./Component/Footer";
import Layout from "antd/es/layout/layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WatchDetail from "./Component/WatchDetail";
import WatchFilter from "./Component/WatchFilter";
import Register from "./Component/Register";
import RegisterPost from "./Component/RegisterPost";
import LoginPage from "./Component/Login";
import Profile from "./Component/Profile";
import EditProfile from "./Component/EditProfile";

const App = () => {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <HeaderBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/watch/:id" element={<WatchDetail />} />
          <Route path="/filter/:type" element={<WatchFilter />} />
          <Route path="/upload" element={<RegisterPost />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
};
export default App;
