/** @format */

import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { useSelector, useDispatch } from "react-redux";
import { get_admin_orders } from "../../store/Reducers/OrderReducer";
const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, serSeacrhValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [showSubOrder, setShowSubOrder] = useState(false);

  const dispatch = useDispatch();
  const { totalOrder, myOrders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(
      get_admin_orders({
        perPage: parseInt(perPage),
        page: parseInt(currentPage),
        searchValue,
      })
    );
  }, [perPage, currentPage, searchValue]);

  // ==>
  // ==>
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <div className="flex justify-between items-center">
          <select
            onChange={(e) => setPerPage(parseInt(e.target.value))}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <input
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
            type="text"
            placeholder="search"
          />
        </div>
        {/* end=> */}

        <div className="relative mt-5 overflow-x-auto">
          <div className="w-full text-sm text-left [#d0d2d6]">
            <div className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <div className="flex justify-between items-start">
                <div className="py-3 w-[25%] ">Order Id</div>
                <div className="py-3 w-[13%]">Price</div>
                <div className="py-3 w-[18%]">Payment Status</div>
                <div className="py-3 w-[18%]">Order Status</div>
                <div className="py-3 w-[18%]">Action</div>
                <div className="py-3 w-[8%]">
                  <MdKeyboardArrowDown />
                </div>
              </div>
              <div>
                <div className="text-[#d0d2d6]">
                  <div className="flex justify-between items-start border-b border-slate-700">
                    <div className="py-4 w-[25%] font-medium whitespace-nowrap">
                      7235643567652334e
                    </div>
                    <div className="py-4 w-[13%]">$220</div>
                    <div className="py-4 w-[18%]">Pending</div>
                    <div className="py-4 w-[18%]">Pending</div>
                    <div className="py-4 w-[18%]">
                      <Link to={"/admin/dashboard/orders/details/1"}>view</Link>
                    </div>
                    <div
                      onClick={(e) => setShowSubOrder(!showSubOrder)}
                      className="py-4 cursor-pointer w-[8%]">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                  {/* end=> */}
                  <div
                    className={
                      showSubOrder
                        ? "block border-b border-slate-700 bg-slate-800 "
                        : "hidden"
                    }>
                    <div className="flex justify-start items-start border-b border-slate-700">
                      <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-2">
                        7235643567652334e
                      </div>
                      <div className="py-4 w-[13%]">$220</div>
                      <div className="py-4 w-[18%]">Pending</div>
                      <div className="py-4 w-[18%]">Pending</div>
                    </div>
                    {/* sub order1 end */}
                    <div className="flex justify-start items-start border-b border-slate-700">
                      <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-2">
                        7235643567652334e
                      </div>
                      <div className="py-4 w-[13%]">$220</div>
                      <div className="py-4 w-[18%]">Pending</div>
                      <div className="py-4 w-[18%]">Pending</div>
                    </div>
                  </div>
                </div>
                {/* order 1=> end */}
                <div className="text-[#d0d2d6]">
                  <div className="flex justify-between items-start border-b border-slate-700">
                    <div className="py-4 w-[25%] font-medium whitespace-nowrap">
                      7235643567652334e
                    </div>
                    <div className="py-4 w-[13%]">$220</div>
                    <div className="py-4 w-[18%]">Pending</div>
                    <div className="py-4 w-[18%]">Pending</div>
                    <div className="py-4 w-[18%]">
                      <Link>view</Link>
                    </div>
                    <div
                      onClick={(e) => setShowSubOrder(!showSubOrder)}
                      className="py-4 cursor-pointer w-[8%]">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                  {/* end=> */}
                  <div
                    className={
                      showSubOrder
                        ? "block border-b border-slate-700 bg-slate-800 "
                        : "hidden"
                    }>
                    <div className="flex justify-start items-start border-b border-slate-700">
                      <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-2">
                        7235643567652334e
                      </div>
                      <div className="py-4 w-[13%]">$220</div>
                      <div className="py-4 w-[18%]">Pending</div>
                      <div className="py-4 w-[18%]">Pending</div>
                    </div>
                    {/* sub order1 end */}
                    <div className="flex justify-start items-start border-b border-slate-700">
                      <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-2">
                        7235643567652334e
                      </div>
                      <div className="py-4 w-[13%]">$220</div>
                      <div className="py-4 w-[18%]">Pending</div>
                      <div className="py-4 w-[18%]">Pending</div>
                    </div>
                  </div>
                </div>
                {/* order 2=> end */}
                {/* order 1=> end */}
                <div className="text-[#d0d2d6]">
                  <div className="flex justify-between items-start border-b border-slate-700">
                    <div className="py-4 w-[25%] font-medium whitespace-nowrap">
                      7235643567652334e
                    </div>
                    <div className="py-4 w-[13%]">$220</div>
                    <div className="py-4 w-[18%]">Pending</div>
                    <div className="py-4 w-[18%]">Pending</div>
                    <div className="py-4 w-[18%]">
                      <Link>view</Link>
                    </div>
                    <div
                      onClick={(e) => setShowSubOrder(!showSubOrder)}
                      className="py-4 cursor-pointer w-[8%]">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                  {/* end=> */}
                  <div
                    className={
                      showSubOrder
                        ? "block border-b border-slate-700 bg-slate-800 "
                        : "hidden"
                    }>
                    <div className="flex justify-start items-start border-b border-slate-700">
                      <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-2">
                        7235643567652334e
                      </div>
                      <div className="py-4 w-[13%]">$220</div>
                      <div className="py-4 w-[18%]">Pending</div>
                      <div className="py-4 w-[18%]">Pending</div>
                    </div>
                    {/* sub order1 end */}
                    <div className="flex justify-start items-start border-b border-slate-700">
                      <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-2">
                        7235643567652334e
                      </div>
                      <div className="py-4 w-[13%]">$220</div>
                      <div className="py-4 w-[18%]">Pending</div>
                      <div className="py-4 w-[18%]">Pending</div>
                    </div>
                  </div>
                </div>
                {/* order 3=> end */}
                {/* order 1=> end */}
                <div className="text-[#d0d2d6]">
                  <div className="flex justify-between items-start border-b border-slate-700">
                    <div className="py-4 w-[25%] font-medium whitespace-nowrap">
                      7235643567652334e
                    </div>
                    <div className="py-4 w-[13%]">$220</div>
                    <div className="py-4 w-[18%]">Pending</div>
                    <div className="py-4 w-[18%]">Pending</div>
                    <div className="py-4 w-[18%]">
                      <Link>view</Link>
                    </div>
                    <div
                      onClick={(e) => setShowSubOrder(!showSubOrder)}
                      className="py-4 cursor-pointer w-[8%]">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                  {/* end=> */}
                  <div
                    className={
                      showSubOrder
                        ? "block border-b border-slate-700 bg-slate-800 "
                        : "hidden"
                    }>
                    <div className="flex justify-start items-start border-b border-slate-700">
                      <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-2">
                        7235643567652334e
                      </div>
                      <div className="py-4 w-[13%]">$220</div>
                      <div className="py-4 w-[18%]">Pending</div>
                      <div className="py-4 w-[18%]">Pending</div>
                    </div>
                    {/* sub order1 end */}
                    <div className="flex justify-start items-start border-b border-slate-700">
                      <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-2">
                        7235643567652334e
                      </div>
                      <div className="py-4 w-[13%]">$220</div>
                      <div className="py-4 w-[18%]">Pending</div>
                      <div className="py-4 w-[18%]">Pending</div>
                    </div>
                  </div>
                </div>
                {/* order 4=> end */}
                {/* order 1=> end */}
                <div className="text-[#d0d2d6]">
                  <div className="flex justify-between items-start border-b border-slate-700">
                    <div className="py-4 w-[25%] font-medium whitespace-nowrap">
                      7235643567652334e
                    </div>
                    <div className="py-4 w-[13%]">$220</div>
                    <div className="py-4 w-[18%]">Pending</div>
                    <div className="py-4 w-[18%]">Pending</div>
                    <div className="py-4 w-[18%]">
                      <Link>view</Link>
                    </div>
                    <div
                      onClick={(e) => setShowSubOrder(!showSubOrder)}
                      className="py-4 cursor-pointer w-[8%]">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                  {/* end=> */}
                  <div
                    className={
                      showSubOrder
                        ? "block border-b border-slate-700 bg-slate-800 "
                        : "hidden"
                    }>
                    <div className="flex justify-start items-start border-b border-slate-700">
                      <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-2">
                        7235643567652334e
                      </div>
                      <div className="py-4 w-[13%]">$220</div>
                      <div className="py-4 w-[18%]">Pending</div>
                      <div className="py-4 w-[18%]">Pending</div>
                    </div>
                    {/* sub order1 end */}
                    <div className="flex justify-start items-start border-b border-slate-700">
                      <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-2">
                        7235643567652334e
                      </div>
                      <div className="py-4 w-[13%]">$220</div>
                      <div className="py-4 w-[18%]">Pending</div>
                      <div className="py-4 w-[18%]">Pending</div>
                    </div>
                  </div>
                </div>

                {/* order 1=> end */}
                <div className="text-[#d0d2d6]">
                  <div className="flex justify-between items-start border-b border-slate-700">
                    <div className="py-4 w-[25%] font-medium whitespace-nowrap">
                      7235643567652334e
                    </div>
                    <div className="py-4 w-[13%]">$220</div>
                    <div className="py-4 w-[18%]">Pending</div>
                    <div className="py-4 w-[18%]">Pending</div>
                    <div className="py-4 w-[18%]">
                      <Link>view</Link>
                    </div>
                    <div
                      onClick={(e) => setShowSubOrder(!showSubOrder)}
                      className="py-4 cursor-pointer w-[8%]">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                  {/* end=> */}
                  <div
                    className={
                      showSubOrder
                        ? "block border-b border-slate-700 bg-slate-800 "
                        : "hidden"
                    }>
                    <div className="flex justify-start items-start border-b border-slate-700">
                      <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-2">
                        7235643567652334e
                      </div>
                      <div className="py-4 w-[13%]">$220</div>
                      <div className="py-4 w-[18%]">Pending</div>
                      <div className="py-4 w-[18%]">Pending</div>
                    </div>
                    {/* sub order1 end */}
                    <div className="flex justify-start items-start border-b border-slate-700">
                      <div className="py-4 w-[25%] font-medium whitespace-nowrap pl-2">
                        7235643567652334e
                      </div>
                      <div className="py-4 w-[13%]">$220</div>
                      <div className="py-4 w-[18%]">Pending</div>
                      <div className="py-4 w-[18%]">Pending</div>
                    </div>
                  </div>
                </div>
                {/* order 6=> end */}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            seTpageNumber={setCurrentPage}
            totalItem={50}
            perPage={perPage}
            showItem={3}
          />
        </div>
      </div>
      {/* end =>  */}
    </div>
  );
};

export default Orders;
