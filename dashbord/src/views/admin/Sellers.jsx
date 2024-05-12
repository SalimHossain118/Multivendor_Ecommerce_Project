/** @format */

import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import { get_active_sellers } from "../../store/Reducers/sellerReducer";

const Sellers = () => {
  const dispatch = useDispatch();
  const { sellers, totalSellers } = useSelector((state) => state.seller);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, serSeacrhValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [showSubOrder, setShowSubOrder] = useState(false);

  useEffect(() => {
    const object = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_active_sellers(object));
  }, [currentPage, perPage, searchValue]);

  const status = true;
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
            onChange={(e) => serSeacrhValue(e.target.value)}
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
            type="text"
            placeholder="search"
          />
        </div>
        {/* end=> */}
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-xs text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Image
                </th>

                <th scope="col" className="py-3 px-4">
                  Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Shop Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  City
                </th>
                <th scope="col" className="py-3 px-4">
                  Address
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-xs font-normal">
              {sellers.map((d, i) => (
                <tr key={i}>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap">
                    {d.image ? (
                      <img
                        className="w-[45px] h-[45px] rounded-md"
                        src={d.image}
                        alt=""
                      />
                    ) : (
                      <div className="flex justify-center items-center w-[45px] h-[45px]  text-blue-500">
                        <span className="text-xs">No Image</span>
                      </div>
                    )}
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>{d.name}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>{d.shopInfo?.busnessname}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>{d.email}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-3 pl-[45px] font-medium whitespace-nowrap justify-center items-center ">
                    <span>{d.payment}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>{d.shopInfo?.city}</span>
                  </td>
                  <td
                    scope="row"
                    className=" flex flex-col py-3 px-4 font-medium whitespace-nowrap">
                    <span>{d.shopInfo?.addressione}</span>
                    <span>{d.shopInfo?.addressitwo}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap">
                    <div className="flex justify-center items-center gap-4">
                      <Link
                        to={`/admin/dashboard/seller/details/${d._id}`}
                        className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                        <FaEye />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalSellers <= perPage ? (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              seTpageNumber={setCurrentPage}
              totalItem={totalSellers}
              perPage={perPage}
              showItem={3}
            />
          </div>
        ) : (
          ""
        )}
        {/* end of table */}
      </div>
    </div>
  );
};

export default Sellers;
