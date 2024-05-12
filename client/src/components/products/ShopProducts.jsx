/** @format */

import React from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Ratings from "../Ratings";

const ShopProducts = ({ styles, products }) => {
  return (
    <div
      className={`w-full grid ${
        styles === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2"
          : "grid-cols-1 md-lg:gird-cols-2"
      } gap-3`}>
      {products.map((product, index) => (
        <div
          key={index}
          className={`flex transition-all duration-1000 
        hover:shadow-md hover:-translate-y-3
        ${
          styles === "grid"
            ? "flex-col justify-start ite"
            : "jsutify-start items-center md-lg:flex-col  md-lg:justify-start md-lg:items-start "
        } w-full gap-4 bg-white p-1 rounded-md`}>
          <div
            className={
              styles === "grid"
                ? "w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden"
                : "md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden"
            }>
            <img
              className="h-[240px] rounded-md md:h-[270px] xs:h-[170px] w-full object-cover"
              src={product.images[0]}
              alt="image"
            />
            <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#e26843] hover:text-white hover:rotate-[720deg] transition-all">
                <AiFillHeart />
              </li>
              <Link
                to="#"
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#e26843] hover:text-white hover:rotate-[720deg] transition-all">
                <FaEye />
              </Link>
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#e26843] hover:text-white hover:rotate-[720deg] transition-all">
                <AiOutlineShoppingCart />{" "}
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-start items-start gap-1">
            <h2>{product.name}</h2>
            <div className="flex justify-start items-center gap-3">
              <span className="text-lg  font-bold">${product.price}</span>

              <div className="flex">
                <Ratings ratings={product.rating} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopProducts;
