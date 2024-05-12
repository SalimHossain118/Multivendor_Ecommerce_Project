/** @format */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  get_card_products,
  delete_card_product,
  quantity_inc,
  quantity_dec,
  messageClear,
} from "../store/reducers/cardReducer";

const Card = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    card_products,
    price,
    card_products_count,
    shiping_fee,
    outofstock_products,
    buy_product_item,
    successMessage,
  } = useSelector((state) => state.card);
  const { userInfo } = useSelector((state) => state.auth);

  const redirect = () => {
    navigate("/shipping", {
      state: {
        products: card_products,
        price: price,
        shipping_fee: shiping_fee,
        items: buy_product_item,
      },
    });
  };

  useEffect(() => {
    dispatch(get_card_products(userInfo.id));
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      dispatch(get_card_products(userInfo.id));
    }
  }, [successMessage]);

  const inc = (quantity, stock, card_id) => {
    const temp = quantity + 1;
    if (temp <= stock) {
      dispatch(quantity_inc(card_id));
    }
  };

  const dec = (quantity, card_id) => {
    const temp = quantity - 1;
    if (temp !== 0) {
      dispatch(quantity_dec(card_id));
    }
  };

  return (
    <div>
      <Headers />
      <section className='bg-[url("http://localhost:3000/images/banner/card.jpg")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Next Shop</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to="/">Home</Link>
                <span className="pt-2">
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>Card</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end ==> */}
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90] mx-auto py-16 ">
          {card_products.length > 0 || outofstock_products.length > 0 ? (
            <div className="flex flex-wrap">
              <div className="w-[67%] md-lg:w-full">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4">
                      <h2 className="text-md text-green-400 font-semibold">
                        Stock Product {card_products_count}
                      </h2>
                    </div>
                    {card_products.map((shop, index) => (
                      <div
                        key={index}
                        className="flex bg-white p-4 flex-col gap-2">
                        <div className="flex ml-2 justify-start items-center">
                          <h2 className="text-md text-[#3B82F6] font-bold">
                            Store Name: {shop.shopName}
                          </h2>
                        </div>
                        {shop.products.map((product, index) => (
                          <div key={index} className="w-full flex flex-wrap">
                            <div className="flex sm:w-full gap-2 w-7/12">
                              <div className="flex gap-2 justify-start items-center">
                                <img
                                  className="w-[80px] h-[80px]"
                                  src={product.productInfo.images[0]}
                                  alt=""
                                />
                                <div className="pr-4 text-slate-600">
                                  <h2>{product.productInfo.name}</h2>
                                  <span>
                                    Barnd:{product.productInfo.brand}{" "}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex w-5/12 sm:w-full sm:mt-3 justify-between">
                              <div className=" pl-4 sm:pl-0">
                                <h2 className="text-lg text-orange-500">
                                  ${" "}
                                  {product.productInfo.price -
                                    Math.floor(
                                      product.productInfo.price *
                                        product.productInfo.discount
                                    ) /
                                      100}
                                </h2>
                                <p className="line-through">
                                  {product.productInfo.price}
                                </p>
                                <p>{product.productInfo.discount}%</p>
                              </div>
                              {/* end ==> */}
                              <div className="flex gap flex-col">
                                <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl rounded-sm">
                                  <div
                                    onClick={() =>
                                      dec(product.quantity, product._id)
                                    }
                                    className="px-3 cursor-pointer">
                                    -
                                  </div>
                                  <div className="px-3">{product.quantity}</div>
                                  <div
                                    onClick={() =>
                                      inc(
                                        product.quantity,
                                        product.productInfo.stock,
                                        product._id
                                      )
                                    }
                                    className="px-3 cursor-pointer">
                                    +
                                  </div>
                                </div>
                                <button
                                  onClick={() =>
                                    dispatch(delete_card_product(product._id))
                                  }
                                  className="px-5 py-[3px] bg-red-500 text-white mt-3 p-1 rounded-sm">
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    {outofstock_products.length > 0 && (
                      <div className="flex  flex-col gap-2">
                        <div className="bg-white p-4">
                          <h2 className="text-md text-red-500 font-semibold">
                            Out Of Stock Product {outofstock_products.length}
                          </h2>
                        </div>
                        {/* end --> */}
                        <div className="bg-white p-4">
                          {outofstock_products.map((product, index) => (
                            <div key={index} className="w-full flex flex-wrap">
                              <div className="flex sm:w-full gap-2 w-7/12">
                                <div className="flex gap-2 justify-start items-center">
                                  <img
                                    className="w-[80px] h-[80px]"
                                    src={product.products[0].images[0]}
                                    alt=""
                                  />
                                  <div className="pr-4 text-slate-600">
                                    <h2>{product.products[0].name}</h2>
                                    <span>
                                      Barnd:{product.products[0].brand}{" "}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex w-5/12 sm:w-full sm:mt-3 justify-between">
                                <div className=" pl-4 sm:pl-0">
                                  <h2 className="text-lg text-orange-500">
                                    ${" "}
                                    {product.products[0].price -
                                      Math.floor(
                                        product.products[0].price *
                                          product.products[0].discount
                                      ) /
                                        100}
                                  </h2>
                                  <p className="line-through">
                                    {product.products[0].price}
                                  </p>
                                  <p>{product.products[0].discount}%</p>
                                </div>
                                {/* end ==> */}
                                <div className="flex gap-2 flex-col">
                                  {/* <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl rounded-sm">
                                    <div
                                      onClick={() =>
                                        dec(
                                          product.quantity,
                                          product.products[0].stock,
                                          product.products[0]._id
                                        )
                                      }
                                      className="px-3 cursor-pointer">
                                      -
                                    </div>
                                    <div className="px-3">
                                      {product.quantity}
                                    </div>
                                    <div
                                      onClick={() =>
                                        inc(
                                          product.products[0].quantity,
                                          product.products[0].stock,
                                          product.products[0]._id
                                        )
                                      }
                                      className="px-3 cursor-pointer">
                                      +
                                    </div>
                                  </div> */}
                                  <button
                                    onClick={() =>
                                      dispatch(delete_card_product(product._id))
                                    }
                                    className="px-5 py-[3px] bg-red-500 text-white mt-3 p-1 rounded-sm">
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* end of left side---> */}
              <div className="w-[33%] md-lg:w-full">
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
                  {card_products.length > 0 && (
                    <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
                      <h2 className="text-xl font-bold">Order Summary</h2>
                      <div className="flex justify-between items-center">
                        <span className="text-black font-semibold">
                          {buy_product_item} <span>Items</span>
                        </span>
                        <span>${price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Shipping Fee</span>
                        <span>{shiping_fee}</span>
                      </div>
                      <div className="flex gap-2">
                        <input
                          className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm"
                          type="text"
                          placeholder="Input Vauchar Coupon"
                        />
                        <button className="px-5 py-[1px] bg-blue-500 text-white rounded-sm uppercase text-sm">
                          Apply
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total</span>
                        <span>${price + shiping_fee}</span>
                      </div>
                      <button
                        onClick={redirect}
                        className="px-5 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-sm text-white uppercase">
                        Proceed to checkout {buy_product_item}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link
                className="px-4 py-2 text-white bg-indigo-500 rounded-md translate-x-3"
                to="/shops">
                Shop Now{" "}
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Card;
