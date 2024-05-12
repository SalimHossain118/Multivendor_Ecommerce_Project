/** @format */

/** @format */

import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Range } from "react-range";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import Products from "../components/products/Products";
import { AiFillStar } from "react-icons/ai";
import { CiStar } from "react-icons/ci";
import { BsFillGridFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ShopProducts from "../components/products/ShopProducts";
import Pagination from "../components/Pagination";
import {
  price_range_products,
  query_products,
} from "../store/reducers/homeReducer";

const CategoryShop = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const categoryyy = searchParams.get("categoryyy");

  const dispatch = useDispatch();
  const { products, totalProducts, priceRange, latestProducts, parPage } =
    useSelector((state) => state.home);

  const [pageNumber, setPageNumber] = useState(1);

  const [styles, setStyles] = useState("grid");
  const [filter, setFilter] = useState(true);
  const [rating, setRatingQ] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [state, setState] = useState({
    values: [priceRange.low, priceRange.high],
  });

  const resetRating = () => {
    setRatingQ("");
    dispatch(
      query_products({
        low: state.values[0],
        high: state.values[1],
        categoryyy,
        rating: "",
        sortPrice,
        pageNumber,
      })
    );
  };

  useEffect(() => {
    dispatch(price_range_products());
  }, []);

  useEffect(() => {
    const minValue = priceRange.low;
    const maxValue = priceRange.high;

    let lowValue = state.values[0];
    let highValue = state.values[1];

    // Validate and adjust the values if necessary
    if (lowValue < minValue) {
      lowValue = minValue;
    }

    if (highValue > maxValue) {
      highValue = maxValue;
    }

    // Update the state only if values have changed
    if (lowValue !== state.values[0] || highValue !== state.values[1]) {
      setState({
        values: [lowValue, highValue],
      });
    }
  }, [priceRange]);

  useEffect(() => {
    dispatch(
      query_products({
        low: state.values[0] || "",
        high: state.values[1] || "",
        categoryyy,
        rating,
        sortPrice,
        pageNumber,
      })
    );
  }, [
    state.values[0],
    state.values[1],
    categoryyy,
    rating,
    pageNumber,
    sortPrice,
  ]);

  return (
    <div>
      <Headers />
      <section className='bg-[url("http://localhost:3000/images/banner/shop.gif")] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Next Shop</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full">
                <Link to={"/"}>HOME</Link>
                <span className="pt-1">
                  <MdOutlineKeyboardArrowRight />
                </span>
                <span>Products</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* end of first section -> */}

      <section className="py-16">
        <div className="w-[85%] md:w-[90%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
          <div className={`md:block hidden ${filter ? "mb-6" : "mb-0"}`}>
            <button
              onClick={() => setFilter(!filter)}
              className="text-center w-full py-2 px-3 bg-indigo-600 text-white">
              Filter Products
            </button>
          </div>
          {/* end button=> */}
          <div className="w-full flex flex-wrap">
            <div
              className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 ${
                filter
                  ? "md:h-0 md:overflow-hidden md:mb-6"
                  : "md:h-auto md:overflow-auto md:mb-0"
              } `}>
              <div className="flex flex-col gap-5 py-2">
                <h2 className="text-3xl font-bold mb-3 text-slate-600">
                  Price
                </h2>
                <Range
                  step={5}
                  min={priceRange.low}
                  max={priceRange.high}
                  values={state.values}
                  onChange={(values) => setState({ values })}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      className="h-[6px] w-full bg-yellow-50 rounded-full cursor-pointer">
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      className="w-[15px] h-[15px] bg-red-300 rounded-full"
                      {...props}
                    />
                  )}
                />
                <div>
                  <span className="text-red-500 font-bold text-lg">
                    ${Math.floor(state.values[0])}-{Math.floor(state.values[1])}{" "}
                  </span>
                </div>
              </div>
              {/* end of price=> */}

              <div className="flex flex-col gap-5 py-2">
                <h2 className="text-3xl font-bold mb-3 text-slate-600">
                  Rating
                </h2>
                <div className="flex flex-col gap-3">
                  <div
                    onClick={() => setRatingQ(5)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer">
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                  </div>
                  {/* end 5 */}
                  <div
                    onClick={() => setRatingQ(4)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer">
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>
                  {/* end4 */}
                  <div
                    onClick={() => setRatingQ(3)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer">
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>
                  {/* end 3 */}
                  <div
                    onClick={() => setRatingQ(2)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer">
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>
                  {/* end 2 */}
                  <div
                    onClick={() => setRatingQ(1)}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer">
                    <span>
                      <AiFillStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>
                  {/* end 1 */}
                  <div
                    onClick={resetRating}
                    className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer">
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                    <span>
                      <CiStar />
                    </span>
                  </div>
                </div>
              </div>
              {/* end */}
              <div className="py-5 flex flex-col gap-4 md:hidden">
                <Products title="Latest Products" products={latestProducts} />
              </div>
            </div>
            {/* --- */}
            <div className="w-9/12 md-lg:w-8/12 md:w-full">
              <div className="pl-8 md:pl-0">
                <div className="py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border">
                  <h2 className="text-lg font-medium text-slate-600">
                    {totalProducts} Products
                  </h2>
                  <div className="flex justify-center items-center gap-3">
                    <select
                      onChange={(e) => setSortPrice(e.target.value)}
                      className="p-1 border outline-0 text-slate-600 font-semibold "
                      name=""
                      id="">
                      <option value="">Short By </option>
                      <option value="low-to-high">Low to High Price </option>
                      <option value="high-to-low">High to Low Price </option>
                    </select>
                    <div className="flex justify-center items-start gap-4 md-lg:hidden">
                      <div
                        onClick={() => setStyles("grid")}
                        className={`p-2 ${
                          styles === "grid" && "bg-slate-300"
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}>
                        <BsFillGridFill />
                      </div>
                      <div
                        onClick={() => setStyles("list")}
                        className={`p-2 ${
                          styles === "list" && "bg-slate-300"
                        } text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm`}>
                        <FaThList />
                      </div>
                    </div>
                  </div>
                </div>
                {/* ==== search--> */}
                <div className="pb-8">
                  <ShopProducts products={products} styles={styles} />
                </div>
                <div>
                  {totalProducts > parPage && (
                    <Pagination
                      pageNumber={pageNumber}
                      setPageNumber={setPageNumber}
                      totalItem={totalProducts}
                      parPage={parPage}
                      showItem={Math.floor(totalProducts / parPage)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CategoryShop;
