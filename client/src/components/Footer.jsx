/** @format */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { AiFillGithub, AiOutlineTwitter } from "react-icons/ai";
import { useSelector } from "react-redux";
import { AiFillShopping, AiFillHeart } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-[#F3F6Fa]">
      <div className="w-[85%] flex flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6">
        <div className="w-3/12 lg:w-4/12 sm:w-full">
          <div className="flex flex-col gap-3">
            <img
              className="w-[190px] h-[70x]"
              src="http://localhost:3000/images/logo_e1.png"
              alt=""
            />
            <ul className="flex flex-col gap-2">
              <li>House #511,513, Spring Rojla</li>
              <li>Mirpur DOSH, Mirpur-1216</li>
              <li>Dhaka, Bangladesh</li>
              <li>mdsalimhossain118@gmail.com</li>
              <li>+8801307543654</li>
            </ul>
          </div>
        </div>
        {/* end with logo */}
        <div className="w-5/12 lg:w-8/12 sm:w-full">
          <div className="flex justify-center sm:justify-start sm:mt-6 w-full">
            <div>
              <h2 className="font-bold text-lg mb-2">Usefull links</h2>
              <div className="flex justify-between gap-[80px] lg:gap-[40px]">
                <ul className="flex flex-col gap-2 text-slate-600 text-sm">
                  <li>
                    <Link>About Us</Link>
                  </li>
                  <li>
                    <Link>About our Shop</Link>
                  </li>
                  <li>
                    <Link>Delivery Information</Link>
                  </li>
                  <li>
                    <Link>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link>Blogs</Link>
                  </li>
                </ul>
                <ul className="flex flex-col gap-2 text-slate-600 text-sm">
                  <li>
                    <Link>Who We Are</Link>
                  </li>
                  <li>
                    <Link>Our Services</Link>
                  </li>
                  <li>
                    <Link>Customaer Care</Link>
                  </li>
                  <li>
                    <Link>Research</Link>
                  </li>
                  <li>
                    <Link>Data Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* end=> */}

        <div className="w-4/12 lg:w-full lg:mt-6">
          <div className="w-full flex flex-col justify-start gap-5">
            <h2 className="font-bold text-lg mb-2">Join US</h2>
            <span>
              Get Email updates about our latest and shop specials offers
            </span>
            <div className="h-[50px] w-full bg-white border relative">
              <input
                placeholder="Enter your mail"
                className="h-full bg-transparent w-full px-3 outline-0"
                type="text"
              />
              <button className="h-full absolute right-0 bg-indigo-500 text-white uppercase px-4 font-bold text-sm">
                Subscribe
              </button>
            </div>
            <ul className="flex justify-start items-center gap-3">
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#">
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#">
                  <AiOutlineTwitter />
                </a>
              </li>
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#">
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a
                  className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center bg-white rounded-full"
                  href="#">
                  <AiFillGithub />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* end of footer top */}
      <div className="w-[85%] flex flex-wrap justify-center items-center text-slate-600 mx-auto py-5 text-center">
        <span>
          Copiright ©2023 All rights reserved
          <a className="text-blue-500 underline" href="">
            @ Md Salim Hossain
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
