/** @format */

import React, { forwardRef, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import toast from "react-hot-toast";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequest = () => {
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
        <div className="w-[25%] whitespace-nowrap">
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px] text-white text-sm cursor-pointer rounded-sm">
            Confirm
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <h2 className="text-xl font-medium pb-5">Withdrawal request</h2>
        <div className="w-full">
          <div className="w-full overflow-x-auto">
            <div className="flex bg-[#161d31] uppercase text-white text-xs min-w-[340px]">
              <div className="w-[25%] p-2">No</div>
              <div className="w-[25%] p-2">Amount</div>
              <div className="w-[25%] p-2">status</div>
              <div className="w-[25%] p-2">date</div>
              <div className="w-[25%] p-2">action</div>
            </div>
            {/* end ===?...> */}
            {
              <List
                style={{ minWidth: "340px", overflowX: "hidden" }}
                className="List"
                height={350}
                itemCount={2000}
                itemSize={35}
                outerElementType={outerElementType}>
                {Row}
              </List>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentRequest;
