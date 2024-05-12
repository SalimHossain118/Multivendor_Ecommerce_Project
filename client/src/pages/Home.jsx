/** @format */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Headers from "../components/Headers";
import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";
import Footer from "../components/Footer";
import { get_category, get_products } from "../store/reducers/homeReducer";

const Home = () => {
  const dispatch = useDispatch();
  const { latestProducts, topRatedProducts, discountProducts } = useSelector(
    (state) => state.home
  );

  useEffect(() => {
    dispatch(get_category());
    dispatch(get_products());
  }, []);

  return (
    <div className="w-full">
      <Headers />
      <Banner />
      <div className="my-4">
        <Categorys />
      </div>
      <div className="pt-[45px] pb-[45px]">
        <FeatureProducts />
      </div>
      <div className="py-10">
        <div className="w-[85%] flex flex-wrap mx-auto">
          <div className="grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
            <div className="overflow-hidden">
              <Products title="Latest Products" products={latestProducts} />
            </div>
            <div className="overflow-hidden">
              <Products
                title="Top Rated Products"
                products={topRatedProducts}
              />
            </div>
            <div className="overflow-hidden">
              <Products title="Discount Products" products={discountProducts} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
