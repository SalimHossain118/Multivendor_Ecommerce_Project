/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsImages } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { overrideStyle } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { categoryGET } from "../../store/Reducers/categoryReducer";
import {
  addProducts,
  getPeoducts,
  messageClear,
} from "../../store/Reducers/productReducer";
import toast from "react-hot-toast";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { successMessage, errorsMessage, loader } = useSelector(
    (state) => state.product
  );

  const { userInfo } = useSelector((state) => state.auth);

  const shopName =
    userInfo && userInfo.shopInfo ? userInfo.shopInfo.busnessname : "";

  useEffect(() => {
    dispatch(
      categoryGET({
        perPage: "",
        page: "",
        searchValue: "",
      })
    );
  }, []);

  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });
  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // category Search
  const categorySearch = (e) => {
    const value = e.target.value;
    if (value) {
      let srcValue = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(srcValue);
    } else {
      setAllCategory(categories);
    }
  };

  useEffect(() => {
    setAllCategory(categories);
  }, [categories]);

  const [images, setImages] = useState([]);
  const [imageShown, setImageShown] = useState([]);
  // img handlers
  const inmageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setImages([...images, ...files]);
      let imageURL = [];
      for (let i = 0; i < length; i++) {
        imageURL.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShown([...imageShown, ...imageURL]);
    }
  };

  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = [...imageShown]; // Copying array elements
      let tempImages = [...images]; // Copying array elements

      tempImages[index] = img; // Assigning img directly to index
      tempUrl[index] = { url: URL.createObjectURL(img) };
      setImageShown(tempUrl); // Setting state with updated array
      setImages(tempImages); // Setting state with updated array
    }
  };

  const removeImage = (i) => {
    const filerImage = images.filter((imagss, index) => index !== i);
    const filerImageURL = imageShown.filter((imagss, index) => index !== i);
    setImageShown(filerImageURL); // Setting
    setImages(filerImage); // Setting
  };

  const add_products = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("description", state.description);
    formData.append("discount", state.discount);
    formData.append("price", state.price);
    formData.append("brand", state.brand);
    formData.append("stock", state.stock);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    formData.append("shopName", shopName);
    formData.append("category", category);

    dispatch(addProducts(formData));
  };

  useEffect(() => {
    if (errorsMessage) {
      toast.error(errorsMessage);
      dispatch(messageClear);
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear);
      setState({
        name: "",
        description: "",
        discount: "",
        price: "",
        brand: "",
        stock: "",
      });
      setImageShown([]);
      setImages([]);
      setCategory("");
    }
  }, [successMessage, errorsMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <div className="flex justify-between items-center">
          <h2 className="text-[#d0d2d6] text-xl font-semibold">Add Product</h2>
          <Link
            to={"/seller/dashboard/products"}
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 ">
            All Products
          </Link>
        </div>
        {/* end=> */}
        <div>
          <form onSubmit={add_products}>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Product name</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.name}
                  type="text"
                  placeholder="product name"
                  name="name"
                  id="name"
                />
              </div>
              {/* end first input */}
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Product brand</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.brand}
                  type="text"
                  placeholder="product brand"
                  name="brand"
                  id="brand"
                />
              </div>
              {/* end second input */}
            </div>
            {/* end  */}
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Category</label>
                <input
                  readOnly
                  onClick={() => setCateShow(!cateShow)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={category}
                  type="text"
                  placeholder="--select category--"
                  id="category"
                />
                <div
                  className={`absolute top-[101%] bg-slate-800 w-full transition-all ${
                    cateShow ? "scale-100" : "scale-0"
                  }`}>
                  <div className="w-full px-4 py-2 fixed">
                    <input
                      onChange={categorySearch}
                      className="px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden"
                      type="text"
                      placeholder="search"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scroll">
                    {allCategory.map((categroyy, index) => (
                      <span
                        key={index}
                        className={`px-4 py-2 hover:bg-indigo-500 hover:text-white
                         hover:shadow-lg hover:shadow-indigo-500/50 w-full 
                         cursor-pointer ${
                           category === categroyy.name && "bg-indigo-500"
                         } `}
                        onClick={() => {
                          setCateShow(false);
                          setCategory(categroyy.name);
                          setSearchValue("");
                          setAllCategory(categories);
                        }}>
                        {categroyy.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* end first input */}
              <div className="flex flex-col w-full gap-1">
                <label htmlFor=" stock">Stock</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.stock}
                  type="number"
                  min={0}
                  placeholder="product  stock"
                  name="stock"
                  id="stock"
                />
              </div>
              {/* end second input */}
            </div>
            {/* end select and stock */}
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Price</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.price}
                  type="number"
                  min={0}
                  placeholder="product price"
                  name="price"
                  id="price"
                />
              </div>
              {/* end first input */}
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="discount">Discount</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.discount}
                  type="number"
                  min={0}
                  placeholder="Discount%"
                  name="discount"
                  id="discount"
                />
              </div>
              {/* end second input */}
            </div>
            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="description">Description</label>
              <textarea
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.description}
                type="text"
                min={0}
                rows={4}
                placeholder="Description"
                name="description"
                id="description"></textarea>
            </div>
            {/* end---> */}
            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
              {imageShown.map((imgss, index) => (
                <div key={index} className="h-[180px] relative">
                  <label className="" htmlFor={index}>
                    <img
                      className="w-full h-full rounded-md"
                      src={imgss.url}
                      alt=""
                    />
                  </label>
                  <input
                    onChange={(e) => {
                      changeImage(e.target.files[0], index);
                    }}
                    type="file"
                    id={index}
                    hidden
                  />
                  <span
                    onClick={() => removeImage(index)}
                    className="p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full">
                    <IoCloseSharp />
                  </span>
                </div>
              ))}

              <label
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-[#d0d2d6]"
                htmlFor="image">
                <span>
                  <BsImages />
                </span>
                <span>select image</span>
              </label>
              <input
                multiple
                onChange={inmageHandle}
                className="hidden"
                type="file"
                id="image"
              />
            </div>

            <div className="flex">
              <button
                disabled={loader ? true : false}
                className="bg-blue-500 w-[200px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Upload Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
