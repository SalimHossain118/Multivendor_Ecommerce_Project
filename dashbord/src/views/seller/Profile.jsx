/** @format */
import React, { useEffect, useState } from "react";
import { BsImages } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";
import {
  profile_image_upload,
  seller_shopInf_add,
  messageClear,
} from "../../store/Reducers/authReducer";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, loader, successMessage, errorsMessage } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    busnessname: "",
    addressione: "",
    addressitwo: "",
    city: "",
    pcode: "",
  });

  const status = "active";

  const add_image = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(profile_image_upload(formData));
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      messageClear();
    }
  }, [successMessage, errorsMessage]);

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const add_info = (e) => {
    e.preventDefault();
    console.log(state);
    dispatch(seller_shopInf_add(state));
  };

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-6/12">
          <div className="w-full p-4  bg-[#283046] rounded-md text-[#d0d2d6]">
            <div className="flex justify-center items-center py-3">
              {userInfo?.image ? (
                <label
                  htmlFor="img"
                  className="h-[210px] w-[300px] relative p-3 cursor-pointer overflow-hidden">
                  <img className="w-full h-full" src={userInfo.image} alt="" />
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[210px] w-[300px] cursor-pointer border border-dashed hover:border-indigo-500 border-[#d0d2d6] relative"
                  htmlFor="img">
                  <span>
                    <BsImages />
                  </span>
                  <span>Select Image</span>
                  {loader && (
                    <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}
              <input
                onChange={add_image}
                type="file"
                className="hidden"
                id="img"
              />
            </div>
            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                  <FaEdit />
                </span>
                <div className="flex gap-2">
                  <span>Name :</span>
                  <span>{userInfo.name}</span>
                </div>
                <div className="flex gap-2">
                  <span>Email :</span>
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex gap-2">
                  <span>Role :</span>
                  <span>{userInfo.role}</span>
                </div>
                <div className="flex gap-2">
                  <span>Status:</span>
                  <span>{userInfo.status}</span>
                </div>
                <div className="flex gap-2">
                  <span>Payment Account:</span>
                  <p>
                    {!status === "active" ? (
                      <span className="bg-green-500 text-white text-xs font-normal cursor-default ml-2 py-2 px-1 rounded">
                        {userInfo.payment}
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white text-xs font-normal cursor-default ml-2 py-2 px-1 rounded">
                        {" "}
                        Click to Active
                      </span>
                    )}
                  </p>
                </div>
              </div>
              {/* end of info holder=>> */}
            </div>
            {/* end =>> genarel info */}
            <div className="px-0 md:px-5 py-2">
              {!userInfo?.shopInfo ? (
                <form onSubmit={add_info}>
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="busnessname">Business name</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                      onChange={inputHandle}
                      value={state.busnessname}
                      type="text"
                      placeholder="business name"
                      name="busnessname"
                      id="busnessname"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="addressione">Address Line 1</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                      onChange={inputHandle}
                      value={state.addressione}
                      type="text"
                      placeholder="address Line 1"
                      name="addressione"
                      id="addressione"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="addressitwo">Address Line 2</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                      onChange={inputHandle}
                      value={state.addressitwo}
                      type="text"
                      placeholder="address Line 2"
                      name="addressitwo"
                      id="addressitwo"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="city">City</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                      onChange={inputHandle}
                      value={state.city}
                      type="text"
                      placeholder="city name"
                      name="city"
                      id="city"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="pcode">Post Code</label>
                    <input
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                      onChange={inputHandle}
                      value={state.pcode}
                      type="text"
                      placeholder="post code"
                      name="pcode"
                      id="pcode"
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      disabled={loader ? true : false}
                      className="bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
                      {loader ? (
                        <PropagateLoader
                          color="#fff"
                          cssOverride={overrideStyle}
                        />
                      ) : (
                        "Update Info"
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="px-0 md:px-5 py-2">
                  <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                    <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                      <FaEdit />
                    </span>
                    <div className="flex gap-2">
                      <span> Business Name :</span>
                      <span>{userInfo.shopInfo?.busnessname}</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Address Line 1 :</span>
                      <span>{userInfo.shopInfo?.addressione}</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Address Line 2 :</span>
                      <span>{userInfo.shopInfo?.addressitwo}</span>
                    </div>
                    <div className="flex gap-2">
                      <span>City :</span>
                      <span>{userInfo.shopInfo?.city}</span>
                    </div>
                    <div className="flex gap-2">
                      <span>Post Code:</span>
                      <span>{userInfo.shopInfo?.pcode}</span>
                    </div>
                  </div>
                  {/* end of info holder=>> */}
                </div>
              )}
            </div>
            {/* end =>> genarel shop info*/}
          </div>
        </div>
        {/* end of right side=> */}
        <div className="w-full md:w-6/12">
          <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0  ">
            <div className="bg-[#283046] rounded-md text-[#d0d2d6] p-4">
              <h1 className="text-[#d0d2d6] text-lg mb-3 font-semibold">
                Change Password
              </h1>
              <form>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="email">Email</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="email"
                    placeholder="email"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="o_password">Old Password</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="password"
                    placeholder="old password"
                    name="old_password"
                    id="o_password"
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="n_password">New Password</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="password"
                    placeholder="new password"
                    name="new_password"
                    id="n_password"
                  />
                </div>

                <div className="mt-3">
                  <button className="bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* end of right side => */}
      </div>
    </div>
  );
};

export default Profile;
