/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const OrderDetails = () => {
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl text-[#d0d2d6]">Order Details</h2>
          <select
            name=""
            id=""
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]">
            <option value="pending">pending</option>
            <option value="processing">processing</option>
            <option value="warehouse">warehouse</option>
            <option value="placed">placed</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>
        {/* end--> */}
        <div className="p-4">
          <div className="flex flex-wrap gap-2 text-lg text-[#d0d2d6]">
            <h2>132456373443E</h2>
            <span>22 feb 2024</span>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full md:w-[48%] lg:w-[32%]">
              <div className="pr-3 text-[#d0d2d6] text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">Deliver to: Ware House</h2>
                </div>
                <div className="flex justify-start items-center gap-3">
                  <h2>Payment Status:</h2>
                  <span className="text-base">Paid</span>
                </div>
                <span>Price: $200</span>
                <div className="flex flex-col mt-4 gap-2">
                  <div className="text-[#d0d2d6]">
                    <div className="text-md  flex flex-wrap gap-2 justify-start items-center p-3">
                      <img
                        className="w-[45px] h-[45px]"
                        src={`http://localhost:3000/images/category/1.jpg`}
                        alt=""
                      />
                      <div>
                        <h2>Fomal Shirt</h2>
                        <p>
                          <span>Brand: US Polo</span>
                          <span className="text-md ml-2">Quantity: 1</span>
                        </p>
                      </div>
                    </div>
                    {/* order1 */}
                    <div className="text-sm  flex flex-wrap gap-2 justify-start items-center p-3">
                      <img
                        className="w-[45px] h-[45px]"
                        src={`http://localhost:3000/images/category/1.jpg`}
                        alt=""
                      />
                      <div>
                        <h2>Fomal Shirt</h2>
                        <p>
                          <span>Brand: US Polo</span>
                          <span className="text-md ml-2">Quantity: 1</span>
                        </p>
                      </div>
                    </div>
                    {/* order2 */}
                    <div className="text-sm  flex flex-wrap gap-2 justify-start items-center p-3">
                      <img
                        className="w-[45px] h-[45px]"
                        src={`http://localhost:3000/images/category/1.jpg`}
                        alt=""
                      />
                      <div>
                        <h2>Fomal Shirt</h2>
                        <p>
                          <span>Brand: US Polo</span>
                          <span className="text-md ml-2">Quantity: 1</span>
                        </p>
                      </div>
                    </div>

                    {/* order3 */}
                  </div>
                </div>
              </div>
            </div>
            {/* end of right side */}
          </div>
        </div>
        {/* end p4- */}
      </div>
    </div>
  );
};

export default OrderDetails;
