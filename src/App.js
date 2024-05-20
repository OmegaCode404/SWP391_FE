import React from "react";
import "./App.css";
import MainPage from "./Component/MainPage";
import HeaderBar from "./Component/Header";
import Footer from "./Component/Footer";
import Layout from "antd/es/layout/layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WatchDetail from "./Component/WatchDetail";
import WatchFilter from "./Component/WatchFilter";
const App = () => {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <HeaderBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/watch/:id" element={<WatchDetail />} />
          <Route path="/filter/:type" element={<WatchFilter />} />
        </Routes>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
};
export default App;
