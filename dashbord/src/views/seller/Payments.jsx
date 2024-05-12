/** @format */

import React, { forwardRef, useEffect, useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import toast from "react-hot-toast";
import { FixedSizeList as List } from "react-window";
import { useSelector, useDispatch } from "react-redux";
import { RiProductHuntLine } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const Payments = () => {
  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm text-white">
        <div className="w-[25%] whitespace-nowrap pl-[10px]">{index + 1}</div>
        <div className="w-[25%] whitespace-nowrap pl-[10px]">$100</div>
        <div className="w-[25%] whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-slate-700 text-blue-500 text-sm rounded-md p-2">
            Pending
          </span>
        </div>
        <div className="w-[25%] whitespace-nowrap ml-[1px] mr-[1px]">
          10-may-2023
        </div>
      </div>
    );
  };

  const sendRequest = (e) => {};
  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-5">
        <div className="flex justify-between items-center bg-[#283046] p-5  rounded-md gap-3">
          <div className="flex flex-col justify-start items-start  text-[#d0d2d6]">
            <h2 className="text-xl font-bold">$5000</h2>
            <span className="text-sm font-medium">Total Sales</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <BsCurrencyDollar className="text-[#28c76f] shadow-lg" />
          </div>
        </div>
        {/* end of 1 */}
        <div className="flex justify-between items-center bg-[#283046] p-5  rounded-md gap-3">
          <div className="flex flex-col justify-start items-start  text-[#d0d2d6]">
            <h2 className="text-xl font-bold">$2000</h2>
            <span className="text-sm font-medium">Availble Amount</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <RiProductHuntLine className="text-[#cd00e8] shadow-lg" />
          </div>
        </div>
        {/* end of 2 */}
        <div className="flex justify-between items-center bg-[#283046] p-5  rounded-md gap-3">
          <div className="flex flex-col justify-start items-start  text-[#d0d2d6]">
            <h2 className="text-xl font-bold">$10</h2>
            <span className="text-sm font-medium">Withdrawal Ammaount</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg" />
          </div>
        </div>
        {/* end of 3 */}
        <div className="flex justify-between items-center bg-[#283046] p-5  rounded-md gap-3">
          <div className="flex flex-col justify-start items-start  text-[#d0d2d6]">
            <h2 className="text-xl font-bold">$20</h2>
            <span className="text-sm font-medium">Pending Amanounts</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <RiProductHuntLine className="text-orange-600 shadow-lg" />
          </div>
        </div>

        {/* end of 4 */}
      </div>
      {/* end--> */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
        <div className="bg-[#28c76f1f] text-[#d0d2d6] rounded-md p-5">
          <h2 className="text-lg">Send withdrawal Request</h2>
          <div className="py-5">
            <form onSubmit={sendRequest}>
              <div className="flex gap-3 flex-wrap">
                <input
                  min="0"
                  type="number"
                  className="px-3 md:w-[79%] py-2 focus:border-indigo-500 outline-none
                   bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  name="amount"
                />
                <button className="bg-indigo-500 hover:shadow-indigo-500/50 hover:shadow-lg text-white rounded-sm px-4 py-2 text-sm">
                  Send
                </button>
              </div>
            </form>
          </div>
          <div>
            <h2 className="text-lg pb-4">Pending withdrawal request</h2>
            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#161d31] uppercase text-white text-xs min-w-[340px]">
                <div className="w-[25%] p-2">No</div>
                <div className="w-[25%] p-2">Amount</div>
                <div className="w-[25%] p-2">status</div>
                <div className="w-[25%] p-2">date</div>
              </div>
              {/* end ===?...> */}
              {
                <List
                  style={{ minWidth: "340px", overflowX: "hidden" }}
                  className="List"
                  height={350}
                  itemCount={50}
                  itemSize={35}
                  outerElementType={outerElementType}>
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>
        {/* end of widthdrow request */}
        <div className="bg-[#28c76f1f] text-[#d0d2d6] rounded-md p-5">
          <div>
            <h2 className="text-lg pb-4">Success withdrawal </h2>
            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#161d31] uppercase text-white text-xs min-w-[340px]">
                <div className="w-[25%] p-2">No</div>
                <div className="w-[25%] p-2">Amount</div>
                <div className="w-[25%] p-2">status</div>
                <div className="w-[25%] p-2">date</div>
              </div>
              {/* end ===?...> */}
              {
                <List
                  style={{ minWidth: "340px", overflowX: "hidden" }}
                  className="List"
                  height={350}
                  itemCount={50}
                  itemSize={35}
                  outerElementType={outerElementType}>
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
