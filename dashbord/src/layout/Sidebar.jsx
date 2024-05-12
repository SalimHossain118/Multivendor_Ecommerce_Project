/** @format */

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/logo.png";
import { getNavs } from "../navigation/index";
import { BiLogInCircle } from "react-icons/bi";
import { logout } from "../store/Reducers/authReducer";

const Sidebar = ({ showSidebar, setShowsidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);

  const [allNav, setAllNav] = useState([]);
  const { pathname } = useLocation();
  useEffect(() => {
    const navs = getNavs(role);
    setAllNav(navs);
  }, [role]);
  return (
    <div>
      <div
        onClick={() => setShowsidebar(false)}
        className={`fixed duration-150 ${
          !showSidebar ? "invisible" : "visible"
        } w-screen h-screen bg-[#22292f80] top-0 left-0 z-10`}></div>
      {/* end */}
      <div
        className={`w-[260px] fixed bg-[#283046] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)]  transition-all ${
          showSidebar ? "left-0" : "-left-[260px] lg:left-0"
        } `}>
        <div className="h-[70px] flex justify-center items-center">
          <Link to="/" className="w-[180px] h-[90px]">
            <img className="w-full h-full" src={logo} alt="" />
          </Link>
        </div>
        {/* end of logo */}
        <div className="px-[16px]">
          <ul>
            {allNav.map((navs, i) => (
              <li key={i}>
                <Link
                  to={navs.path}
                  className={`${
                    pathname === navs.path
                      ? "bg-slate-600 shadow-indigo-500/30 text-white duration-500 "
                      : "text-[#d0d2d6] font-normal duration-200"
                  } px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1 `}>
                  <span>{navs.icon}</span>
                  <span>{navs.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => dispatch(logout({ navigate, role }))}
                className="text-[#d0d2d6] font-normal duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1 ">
                <span>
                  <BiLogInCircle />
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
