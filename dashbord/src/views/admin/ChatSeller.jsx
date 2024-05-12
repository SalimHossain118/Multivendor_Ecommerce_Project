/** @format */

import React, { useEffect, useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsEmojiSmile } from "react-icons/bs";
import toast from "react-hot-toast";

const ChatSeller = () => {
  const [show, setShow] = useState(false);
  const [recevedMessage, setRecevedMessage] = useState("");
  const sellerId = 32;
  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-[#283046] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? "-left-[16px]" : "-left-[336px]"
            } md:left-0 md:relative transition-all`}>
            <div className="w-full h-[calc(100vh-177px)] bg-[#252b3b]  md:bg-transparent overflow-y-auto ">
              <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white">
                <h2>Sellers</h2>
                <span
                  onClick={() => setShow(!show)}
                  className="block cursor-pointer md:hidden">
                  <IoMdClose />
                </span>
              </div>
              <div
                className={`h-[60px] flex justify-start gap-2 items-center text-white px-2  py-2 rounded-sm cursor-pointer bg-slate-700`}>
                <div className="relative">
                  <img
                    className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                    src="http://localhost:3000/images/admin.jpg"
                    alt=""
                  />
                  <div className="w-[10px] h-[10px] bg-green-500 absolute rounded-full right-0 bottom-0"></div>
                </div>
                {/* end=> */}
                <div className="flex justify-center items-start flex-col w-full">
                  <div className="fw-full flex justify-between items-center ">
                    <h2 className="text-base font-semibold">Salim Hossain</h2>
                  </div>
                  <div className="text-xs font-normal">2 min</div>
                </div>
              </div>
              {/* member 1 */}
              <div
                className={`h-[60px] flex justify-start gap-2 items-center text-white px-2  py-2 rounded-sm cursor-pointer`}>
                <div className="relative">
                  <img
                    className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                    src="http://localhost:3000/images/admin.jpg"
                    alt=""
                  />
                  <div className="w-[10px] h-[10px] bg-green-500 absolute rounded-full right-0 bottom-0"></div>
                </div>
                {/* end=> */}
                <div className="flex justify-center items-start flex-col w-full">
                  <div className="fw-full flex justify-between items-center ">
                    <h2 className="text-base font-semibold">Salim Hossain</h2>
                  </div>
                  <div className="text-xs font-normal">2 min</div>
                </div>
              </div>
              {/* member 2 */}
              <div
                className={`h-[60px] flex justify-start gap-2 items-center text-white px-2  py-2 rounded-sm cursor-pointer`}>
                <div className="relative">
                  <img
                    className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                    src="http://localhost:3000/images/admin.jpg"
                    alt=""
                  />
                  <div className="w-[10px] h-[10px] bg-green-500 absolute rounded-full right-0 bottom-0"></div>
                </div>
                {/* end=> */}
                <div className="flex justify-center items-start flex-col w-full">
                  <div className="fw-full flex justify-between items-center ">
                    <h2 className="text-base font-semibold">Salim Hossain</h2>
                  </div>
                  <div className="text-xs font-normal">2 min</div>
                </div>
              </div>
              {/* member 3 */}
              <div
                className={`h-[60px] flex justify-start gap-2 items-center text-white px-2  py-2 rounded-sm cursor-pointer`}>
                <div className="relative">
                  <img
                    className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                    src="http://localhost:3000/images/admin.jpg"
                    alt=""
                  />
                  <div className="w-[10px] h-[10px] bg-green-500 absolute rounded-full right-0 bottom-0"></div>
                </div>
                {/* end=> */}
                <div className="flex justify-center items-start flex-col w-full">
                  <div className="fw-full flex justify-between items-center ">
                    <h2 className="text-base font-semibold">Salim Hossain</h2>
                  </div>
                  <div className="text-xs font-normal">2 min</div>
                </div>
              </div>
              {/* member 4 */}
            </div>
          </div>
          {/* end of profile holder */}
          <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
            <div className="flex justify-between items-center">
              {sellerId && (
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-[38px] h-[38px] border-green-500 border-2 max-w-[38px] p-[2px] rounded-full"
                      src="http://localhost:3000/images/admin.jpg"
                      alt=""
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 absolute rounded-full right-0 bottom-0"></div>
                  </div>
                </div>
              )}
              <div
                onClick={() => setShow(!show)}
                className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500/50 justify-center cursor-pointer items-center text-white">
                <span>
                  <FaList />
                </span>
              </div>
            </div>
            <div className="py-4">
              <div className="bg-slate-800 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                <div className="w-full flex justify-start items-center ">
                  <div className="flex w-[50%] justify-start items-start gap-2 md:px-3 py-2 max-w-full  ">
                    <div className="">
                      <img
                        className="w-[38px] h-[38px] border-green-500 border-2 max-w-[38px] p-[2px] rounded-full"
                        src="http://localhost:3000/images/admin.jpg"
                        alt=""
                      />
                    </div>
                    <div className="flex justify-center items-start flex-col w-full bg-orange-500 shadow-lg shadow-orange-500/50 text-white py-1 px-2 rounded-sm">
                      <span className="whitespace-nowrap">Hello Admin</span>
                    </div>
                  </div>
                </div>
                {/* end recive sma */}
                <div className="w-full flex justify-end items-center ">
                  <div className="flex w-[50%] justify-start items-start gap-2 md:px-3 py-2 max-w-full  ">
                    <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-1 px-2 rounded-sm">
                      <span className="whitespace-nowrap">
                        Yes How May I help you?
                      </span>
                    </div>
                    <div className="">
                      <img
                        className="w-[38px] h-[38px] border-green-500 border-2 max-w-[38px] p-[2px] rounded-full"
                        src="http://localhost:3000/images/admin.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                {/* end send */}
                <div className="w-full flex justify-start items-center ">
                  <div className="flex w-[50%] justify-start items-start gap-2 md:px-3 py-2 max-w-full  ">
                    <div className="">
                      <img
                        className="w-[38px] h-[38px] border-green-500 border-2 max-w-[38px] p-[2px] rounded-full"
                        src="http://localhost:3000/images/admin.jpg"
                        alt=""
                      />
                    </div>
                    <div className="flex justify-center items-start flex-col w-full bg-orange-500 shadow-lg shadow-orange-500/50 text-white py-1 px-2 rounded-sm">
                      <span className="whitespace-nowrap">Hello Admin</span>
                    </div>
                  </div>
                </div>
                {/* end recive sma */}
              </div>
              {/* messgae holder */}
            </div>
            <form className="flex gap-3">
              <input
                className="w-full flex justify-between items-center px-2 py-[5px] 
                border border-slate-800 focus:border-blue-500 rounded-md 
                outline-none bg-transparent text-white "
                type="text"
                placeholder="Type your message"
              />
              <button
                className="flex bg-cyan-500 shadow-lg hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px]
              justify-center items-center text-white rounded-md ">
                Send
              </button>
            </form>
          </div>
          {/* end chart holder */}
        </div>
      </div>
    </div>
  );
};

export default ChatSeller;
