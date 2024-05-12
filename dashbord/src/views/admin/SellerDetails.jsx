/** @format */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  get_seller,
  seller_status_update,
  messageClear,
} from "../../store/Reducers/sellerReducer";

const SellerDetails = () => {
  const dispatch = useDispatch();
  const { seller, successMessage } = useSelector((state) => state.seller);
  const { sellerId } = useParams();

  useEffect(() => {
    dispatch(get_seller(sellerId));
  }, [sellerId]);

  const [status, setState] = useState("");

  const seller_status_submit = (e) => {
    e.preventDefault();
    dispatch(
      seller_status_update({
        sellerId,
        status,
      })
    );
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear);
    }
  }, [successMessage]);

  useEffect(() => {
    if (seller) {
      setState(seller.status);
    }
  }, [sellerId]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md">
        <div className="w-full flex flex-wrap text-[#d0d2d6]">
          <div className="w-full lg:w-[55%] flex flex-col lg:flex-row justify-center items-center py-2 p-2">
            <div className="w-48 lg:w-auto mb-3 lg:mb-0">
              {seller?.image ? (
                <img
                  className="w-full h-48 lg:h-[230px]"
                  src={seller?.image}
                  alt=""
                />
              ) : (
                <span>Image not Found</span>
              )}
            </div>
            <div className="w-full lg:w-[calc(50% - 10px)] p-1 ml-0 lg:ml-[10px] ">
              <div className="px-0 py-2">
                <div className="py-2 text-lg">
                  <h2>Basic Info</h2>
                </div>
                <div className="flex flex-col gap-2 p-3 bg-slate-800 rounded-md w-full">
                  <div className="flex flex-col lg:flex-row gap-2">
                    <span className="lg:w-1/3">Name:</span>
                    <span className="lg:w-2/3">{seller?.name}</span>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-2">
                    <span className="lg:w-1/3">Email:</span>
                    <span className="lg:w-2/3">{seller?.email}</span>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-2">
                    <span className="lg:w-1/3">Role:</span>
                    <span className="lg:w-2/3">{seller?.role}</span>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-2">
                    <span className="lg:w-1/3">Status:</span>
                    <span className="lg:w-2/3">{seller?.status}</span>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-2">
                    <span className="lg:w-1/3">Payment Account:</span>
                    <span className="lg:w-2/3">{seller?.payment}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[40%] flex flex-col lg:flex-row justify-center items-center py-2 p-2">
            <div className="w-full lg:w-[calc(50% - 10px)] p-1 ml-0 lg:ml-[10px] ">
              <div className="px-0 py-2">
                <div className="py-2 text-lg">
                  <h2>Addres</h2>
                </div>
                <div className="flex flex-col gap-2 p-3 bg-slate-800 rounded-md w-full">
                  <div className="flex flex-col lg:flex-row gap-2">
                    <span className="lg:w-1/3">Business Name:</span>
                    <span className="lg:w-2/3">
                      {seller?.shopInfo?.busnessname}
                    </span>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-2">
                    <span className="lg:w-1/3">Holding:</span>
                    <span className="lg:w-2/3">
                      {seller?.shopInfo?.addressione}
                    </span>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-2">
                    <span className="lg:w-1/3">Road:</span>
                    <span className="lg:w-2/3">
                      {seller?.shopInfo?.addressitwo}
                    </span>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-2">
                    <span className="lg:w-1/3">City:</span>
                    <span className="lg:w-2/3">{seller?.shopInfo?.city}</span>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-2">
                    <span className="lg:w-1/3">Post Code:</span>
                    <span className="lg:w-2/3">{seller?.shopInfo?.pcode}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* end of first holder */}
          <div>
            <form onSubmit={seller_status_submit}>
              <div className="flex gap-4 py-3">
                <select
                  value={status}
                  onChange={(e) => setState(e.target.value)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  name=""
                  required
                  id="">
                  <option value="">--select status--</option>
                  <option value="active">Active</option>
                  <option value="deactive">Deactive</option>
                </select>
                <button className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 w-[170px] ">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
