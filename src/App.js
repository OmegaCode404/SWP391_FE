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
import UserDetail from "./Component/UserProfile";
import UnappraisedWatches from "./Component/UnappraisedWatches";
import AppraiseWatch from "./Component/AppraiseWatch";
import PaymentReturn from "./Component/PaymentReturn";
import MyOrders from "./Component/MyOrders";
import OrderDetail from "./Component/OrderDetail";
import Chat from "./Component/Chat";
import FeedbackPage from "./Component/FeedbackPage";
import UserManagement from "./Component/UserManagement";
import Revenue from "./Component/Revenue";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutCom />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/watch/:id" element={<WatchDetail />} />
        <Route path="/filter" element={<WatchFilter />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireAuth role={["USER"]}></RequireAuth>}>
          <Route path="/upload" element={<RegisterPost />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/My-Post" element={<MyPost />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/orders/:orderId" element={<OrderDetail />} />
          <Route
            path="/feedback/:watchId/:userId/:userType"
            element={<FeedbackPage />}
          />
          <Route path="revenue" element={<Revenue />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth roles={["APPRAISER"]} />}>
          <Route path="/unappraised-watches" element={<UnappraisedWatches />} />
          <Route path="/appraise-watch/:id" element={<AppraiseWatch />} />
        </Route>
        <Route element={<RequireAuth roles={["USER", "APPRAISER"]} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/payment-return" element={<PaymentReturn />} />
        <Route element={<RequireAuth roles={["ADMIN"]} />}>
          <Route path="users" element={<UserManagement />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
