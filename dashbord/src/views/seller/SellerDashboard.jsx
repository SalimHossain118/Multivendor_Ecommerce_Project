/** @format */

import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Chart from "react-apexcharts";

const SellerDashboard = () => {
  const state = {
    series: [
      {
        name: "Orders",
        data: [34, 65, 34, 65, 34, 34, 34, 56, 23, 67, 23, 45],
      },
      {
        name: "Revenue",
        data: [34, 32, 45, 32, 34, 34, 43, 56, 65, 67, 45, 78],
      },
      {
        name: "Sales",
        data: [78, 32, 34, 54, 65, 34, 54, 21, 54, 43, 45, 43],
      },
    ],

    options: {
      color: ["#181ee8", "#181ee8"],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: "transparent",
        foreColor: "#d0d2d6",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        colors: "#f0f0f0",
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apl",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top",
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apl",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: "550px",
            },
          },
        },
      ],
    },
  };

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        <div className="flex justify-between items-center bg-[#283046] p-5  rounded-md gap-3">
          <div className="flex flex-col justify-start items-start  text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">$5000</h2>
            <span className="text-md font-medium">Total Sales</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <BsCurrencyDollar className="text-[#28c76f] shadow-lg" />
          </div>
        </div>
        {/* end of 1 */}
        <div className="flex justify-between items-center bg-[#283046] p-5  rounded-md gap-3">
          <div className="flex flex-col justify-start items-start  text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">200</h2>
            <span className="text-md font-medium">Products</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <RiProductHuntLine className="text-[#cd00e8] shadow-lg" />
          </div>
        </div>
        {/* end of 2 */}
        <div className="flex justify-between items-center bg-[#283046] p-5  rounded-md gap-3">
          <div className="flex flex-col justify-start items-start  text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">10</h2>
            <span className="text-md font-medium">Orders</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <AiOutlineShoppingCart className="text-[#7367f0] shadow-lg" />
          </div>
        </div>
        {/* end of 3 */}
        <div className="flex justify-between items-center bg-[#283046] p-5  rounded-md gap-3">
          <div className="flex flex-col justify-start items-start  text-[#d0d2d6]">
            <h2 className="text-3xl font-bold">20</h2>
            <span className="text-md font-medium">Pending Orders</span>
          </div>
          <div className="w-[46px] h-[47px] rounded-full bg-[#28c76f1f] flex justify-center items-center text-xl">
            <RiProductHuntLine className="text-orange-600 shadow-lg" />
          </div>
        </div>

        {/* end of 4 */}
      </div>
      {/* end of card holder => */}

      <div className="w-full flex flex-col mt-7 bg-green-400">
        <div className="w-full lg:flex">
          <div className="w-full lg:w-7/12 lg:pr-3">
            <div className="w-full bg-[#283046] p-4 rounded-md">
              <Chart
                options={state.options}
                series={state.series}
                type="bar"
                height={350}
              />
            </div>
          </div>
          {/* end of chart holder */}
          <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
            <div className="w-full bg-[#283046] p-4 rounded-md text-[#d0d2d6]">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">
                  Recent Customer message
                </h2>
                <Link className="font-semibold text-sm text-[#d0d2d6]">
                  View All
                </Link>
              </div>
              {/* end */}
              <div className="flex flex-col pt-6 gap-2 text-[#d0d2d6]">
                <ol className="relative border-1 border-stone-600 ml-4">
                  <li className="mb-3 ml-6">
                    <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#00d1e848] rounded-full z-10">
                      <img
                        className="w-full rounded-full h-full shadow-lg"
                        src="http://localhost:3000/images/admin.jpg"
                        alt=""
                      />
                    </div>
                    {/* end */}
                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <Link className="text-md font-normal">
                          Customer Name
                        </Link>

                        <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                          5 Days Ago
                        </time>
                      </div>
                      {/* end=> */}
                      <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                        {/* {m.message} */}
                        Sample Text Message
                      </div>
                    </div>
                  </li>
                  {/* 1st li end */}
                  <li className="mb-3 ml-6">
                    <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#00d1e848] rounded-full z-10">
                      <img
                        className="w-full rounded-full h-full shadow-lg"
                        src="http://localhost:3000/images/seller.png"
                        alt=""
                      />
                    </div>
                    {/* end */}
                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <Link className="text-md font-normal">Seller Name</Link>

                        <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                          5 Days Ago
                        </time>
                      </div>
                      {/* end=> */}
                      <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                        {/* {m.message} */}
                        Sample Text Message
                      </div>
                    </div>
                  </li>
                  {/* end -> li 2 */}
                  <li className="mb-3 ml-6">
                    <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#00d1e848] rounded-full z-10">
                      <img
                        className="w-full rounded-full h-full shadow-lg"
                        src="http://localhost:3000/images/admin.jpg"
                        alt=""
                      />
                    </div>
                    {/* end */}
                    <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <Link className="text-md font-normal">
                          Customer Name
                        </Link>

                        <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                          5 Days Ago
                        </time>
                      </div>
                      {/* end=> */}
                      <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                        {/* {m.message} */}
                        Sample Text Message
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
              {/* end => */}
            </div>
          </div>
          {/* end of => message holder */}
        </div>
        {/* end of Chart and Chat holder=> */}
      </div>
      {/*  end---> */}
      <div className="w-full p-4  bg-[#283046] rounded-md mt-6">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">
            Recent Orders
          </h2>
          <Link className="font-semibold text-sm text-[#d0d2d6]">View All</Link>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((d, i) => (
                <tr key={i}>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap">
                    #{d._id}
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap">
                    ${d.price}
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>{d.delivery_status}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap">
                    <span>{d.payment_status}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-3 px-4 font-medium whitespace-nowrap">
                    <Link to={`/admin/dashboard/order/details/${d._id}`}>
                      view
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    // end of main section =>
  );
};

export default SellerDashboard;