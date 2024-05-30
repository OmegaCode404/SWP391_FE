import React from "react";
import "./App.css";
import MainPage from "./Component/MainPage";
import RequireAuth from "./Component/RequireAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WatchDetail from "./Component/WatchDetail";
import WatchFilter from "./Component/WatchFilter";
import Register from "./Component/Register";
import RegisterPost from "./Component/RegisterPost";
import LoginPage from "./Component/Login";
import Profile from "./Component/Profile";
import EditProfile from "./Component/EditProfile";
import LayoutCom from "./Component/Layout";
import Cart from "./Component/Cart";
import MyPost from "./Component/MyPost";
import AboutUs from "./Component/AboutUs";
import UserDetail from "./Component/UserProfile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutCom />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/watch/:id" element={<WatchDetail />} />
        <Route path="/filter/:type" element={<WatchFilter />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route element={<RequireAuth></RequireAuth>}>
          <Route path="/upload" element={<RegisterPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/My-Post" element={<MyPost />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Route>
    </Routes>
  );
};
export default App;
