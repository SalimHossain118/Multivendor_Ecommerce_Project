/** @format */

import React, { useEffect, useState } from "react";
import { AiOutlineMessage, AiOutlinePlus } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import io from "socket.io-client";
import {
  add_friend,
  messageClear,
  send_message,
  updateMessage,
} from "../../store/reducers/chatReducer";
import { useRef } from "react";

const socket = io("http://localhost:5000");

const Chat = () => {
  const dispatch = useDispatch();
  const { sellerId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { my_friends, fd_message, currentFd, successMessage } = useSelector(
    (state) => state.chat
  );
  const [reciverMessage, setReciverMessage] = useState("");
  const [activeSeller, setActiveSeller] = useState([]);
  const scrollRef = useRef();

  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit("add_user", userInfo.id, userInfo);
  }, []);

  useEffect(() => {
    dispatch(
      add_friend({
        sellerId: sellerId || "",
        userId: userInfo.id,
      })
    );
  }, [sellerId]);

  const send = () => {
    if (text) {
      dispatch(
        send_message({
          userId: userInfo.id,
          text,
          sellerId,
          name: userInfo.name,
        })
      );
      setText("");
    }
  };

  useEffect(() => {
    socket.on("seller_message", (msg) => {
      setReciverMessage(msg);
    });
    socket.on("activeSeller", (sellers) => {
      setActiveSeller(sellers);
    });
  }, []);

  useEffect(() => {
    if (reciverMessage) {
      if (
        sellerId === reciverMessage.senderId &&
        userInfo.id === reciverMessage.reciverId
      ) {
        dispatch(updateMessage(reciverMessage));
      } else {
        toast.success(reciverMessage.senderName + " " + "send a message");
        dispatch(messageClear());
      }
    }
  }, [reciverMessage]);

  useEffect(() => {
    if (successMessage) {
      socket.emit("send_customer_message", fd_message[fd_message.length - 1]);
      dispatch(messageClear());
    }
  }, [successMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [fd_message]);

  const [show, setShow] = useState(false);

  return (
    <div className=" bg-white p-3 rounded-md">
      <div className=" w-full flex relative">
        <div
          className={`w-[230px] md-lg:absolute bg-white md-lg:h-full transition-all ${
            show ? " left-0" : "-left-[350px]"
          }`}>
          <div className=" flex justify-center gap-3 items-center text-slate-600 text-xl h-[50px]">
            <span>
              <AiOutlineMessage />
            </span>
            <span>Message</span>
          </div>
          <div className=" w-full flex flex-col text-slate-600 py-4 h-[400px] pr-3">
            {my_friends.map((f, i) => (
              <Link
                to={`/dashboard/chat/${f.fdId}`}
                key={i}
                className={`flex gap-2 justify-start items-center pl-2 py-[5px]`}>
                <div className=" w-[30px] h-[30px] rounded-full relative">
                  {activeSeller.some((c) => c.sellerId === f.fdId) && (
                    <div className=" w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                  )}
                  <img src="/images/user.png" alt="user" />
                </div>
                <span>{f.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className=" w-[calc(100%-230px)] md-lg:w-full">
          {currentFd ? (
            <div className=" w-full h-full">
              <div className=" flex justify-between gap-3 items-center text-slate-600 text-xl h-[50px]">
                <div className=" flex gap-2">
                  <div className=" w-[30px] h-[30px] rounded-full relative">
                    {activeSeller.some(
                      (c) => c.sellerId === currentFd.fdId
                    ) && (
                      <div className=" w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0"></div>
                    )}
                    <img src="/images/user.png" alt="user" />
                  </div>
                  <span>{currentFd.name}</span>
                </div>
                <div
                  onClick={() => setShow(!show)}
                  className=" hidden md-lg:flex w-[35px] h-[35px] rounded-sm bg-sky-400 text-white cursor-pointer justify-center items-center">
                  <FaList />
                </div>
              </div>
              <div className=" h-[400px] w-full bg-slate-100 p-3 rounded-md">
                <div className=" w-full h-full overflow-y-auto flex flex-col gap-3">
                  {fd_message.map((m, i) => {
                    if (currentFd?.fdId !== m.reciverId) {
                      return (
                        <div
                          key={i}
                          ref={scrollRef}
                          className=" w-full flex gap-2 justify-start items-center text-[14px]">
                          <img
                            className="w-[30px] h-[30px] rounded-full "
                            src="/images/user.png"
                            alt="user"
                          />
                          <div className=" p-2 bg-purple-500 text-white rounded-md">
                            <span>{m.message}</span>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          ref={scrollRef}
                          className=" w-full flex gap-2 justify-end items-center text-[14px]">
                          <div className=" p-2 bg-purple-500 text-white rounded-md">
                            <span>{m.message}</span>
                          </div>
                          <img
                            className="w-[30px] h-[30px] rounded-full "
                            src="/images/user.png"
                            alt="user"
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
              <div className=" flex p-2 justify-between items-center w-full">
                <div className=" w-[40px] h-[40px] border p-2 justify-center items-center flex rounded-full">
                  <label className=" cursor-pointer" htmlFor="">
                    <AiOutlinePlus />
                  </label>
                  <input type="file" className=" hidden" />
                </div>
                <div className=" border h-[40px] p-0 ml-2 w-[calc(100%-90px)] rounded-full relative">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    placeholder="input message"
                    className=" w-full rounded-full h-full outline-none p-3"
                  />
                  <div className=" text-2xl right-2 absolute cursor-pointer  top-2">
                    <span>
                      <GrEmoji />
                    </span>
                  </div>
                </div>
                <div className=" w-[40px] p-2 justify-center items-center rounded-full">
                  <div onClick={send} className=" text-2xl cursor-pointer">
                    <IoSend />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setShow(true)}
              className=" w-full h-[400px] flex justify-center items-center text-lg font-bold text-slate-600">
              <span>select seller</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
