/** @format */

import React, { useEffect } from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Ratings from "../Ratings";
import { useSelector, useDispatch } from "react-redux";
import {
  add_to_card,
  add_to_wishList,
  messageClear,
} from "../../store/reducers/cardReducer";

const FeatureProducts = () => {
  //
  //
  //
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.home);
  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, errorMessage } = useSelector((state) => state.card);

  const add_card = (id) => {
    if (userInfo) {
      dispatch(
        add_to_card({
          userId: userInfo.id,
          quantity: 1,
          productId: id,
        })
      );
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const add_wishlist = (pro) => {
    dispatch(
      add_to_wishList({
        userId: userInfo.id,
        productId: pro._id,
        name: pro.name,
        price: pro.price,
        image: pro.images[0],
        discount: pro.discount,
        rating: pro.rating,
        slug: pro.slug,
      })
    )
      .then((response) => {
        if (response && response.message) {
          console.log(response.message);
        }
      })
      .catch((error) => {
        if (error && error.error === "Product already added to wishlist") {
          console.log("Product is already in your wishlist.");
        } else {
          console.error("Failed to add product to wishlist:", error);
        }
      });
  };

  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2>Feature Products</h2>
          <div className="w-[100px] h-[4px] bg-[#e94f4f] mt-4"></div>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
        {products.map((product, index) => (
          <div
            key={index}
            className="border group transition-all duration-500 hover:shadow-md hover:-mt-3 relative overflow-hidden">
            {product.discount ? (
              <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 z-10">
                {product.discount}
              </div>
            ) : (
              ""
            )}
            <img
              className="sm:w-full w-full h-[250px]"
              src={product.images[0]}
              alt="Product Image"
            />
            <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
              <li
                onClick={() => add_wishlist(product)}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#e26843] hover:text-white hover:rotate-[720deg] transition-all">
                <AiFillHeart />
              </li>
              <Link
                to={`/product/details/${product.slug}`}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#e26843] hover:text-white hover:rotate-[720deg] transition-all">
                <FaEye />
              </Link>
              <li
                onClick={() => add_card(product._id)}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#e26843] hover:text-white hover:rotate-[720deg] transition-all">
                <AiOutlineShoppingCart />{" "}
              </li>
            </ul>

            <div className=" flex flex-col py-3 text-slate-600 px-2">
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
    </div>
  );
};

export default FeatureProducts;
