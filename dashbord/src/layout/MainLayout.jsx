/** @format */

import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../utils/utils";
const MainLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [showSidebar, setShowsidebar] = useState(false);

  useEffect(() => {
    if (userInfo && userInfo.role === "seller") {
      socket.emit("add_seller", userInfo._id, userInfo);
    } else {
      socket.emit("add_admin", userInfo);
    }
  }, [userInfo]);
  return (
    <div className="bg-[#161d31] w-full min-h-screen">
      <Header showSidebar={showSidebar} setShowsidebar={setShowsidebar} />
      <Sidebar showSidebar={showSidebar} setShowsidebar={setShowsidebar} />
      <div className="ml-0 lg:ml-[260px] pt-[95px] transition-all ">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
