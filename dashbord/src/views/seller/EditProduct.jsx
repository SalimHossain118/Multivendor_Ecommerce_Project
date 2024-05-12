/** @format */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { overrideStyle } from "../../utils/utils";

import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { categoryGET } from "../../store/Reducers/categoryReducer";
import {
  get_a_product,
  update_Product,
  messageClear,
  product_image_update,
} from "../../store/Reducers/productReducer";

const EditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { aproduct, loader, errorsMessage, successMessage } = useSelector(
    (state) => state.product
  );
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

  useEffect(() => {
    dispatch(get_a_product(productId));
  }, [productId]);
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
  }, []);

  useEffect(() => {
    dispatch(
      categoryGET({
        perPage: "",
        page: "",
        searchValue: "",
      })
    );
  }, []);

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

  const changeImage = (img, files) => {
    if (files.length > 0) {
      dispatch(
        product_image_update({
          oldImage: img,
          newImage: files[0],
          productId,
        })
      );
    }
  };

  // const changeImage = (img, index) => {
  //   if (img) {
  //     let tempUrl = [...imageShown]; // Copying array elements
  //     let tempImages = [...images]; // Copying array elements

  //     tempImages[index] = img; // Assigning img directly to index
  //     tempUrl[index] = { url: URL.createObjectURL(img) };
  //     setImageShown(tempUrl); // Setting state with updated array
  //     setImages(tempImages); // Setting state with updated array
  //   }
  // };

  useEffect(() => {
    if (aproduct) {
      setState({
        name: aproduct.name || "",
        description: aproduct.description || "",
        discount: aproduct.discount || "",
        price: aproduct.price || "",
        brand: aproduct.brand || "",
        stock: aproduct.stock || "",
      });
      setCategory(aproduct.category || "");
      setImageShown(aproduct.images || []);
    }
  }, [aproduct]);

  useEffect(() => {
    if (categories.length > 0) {
      setAllCategory(categories);
    }
  }, [categories]);

  const update = (e) => {
    e.preventDefault();
    // state.productId = productId;
    const obj = {
      name: state.name,
      description: state.description,
      discount: state.discount,
      price: state.price,
      brand: state.brand,
      stock: state.stock,
      productId: productId,
    };
    dispatch(update_Product(obj));
  };

  useEffect(() => {
    if (errorsMessage) {
      toast.error(errorsMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }

    // Clear success message after 3 seconds (adjust the duration as needed)
    const timeout = setTimeout(() => {
      toast.dismiss();
    }, 3000);

    // Clear the timeout to prevent memory leaks
    return () => clearTimeout(timeout);
  }, [successMessage, errorsMessage, dispatch]);

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-[#283046] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">Edit Product</h1>
          <Link
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 "
            to="/seller/dashboard/products">
            Products
          </Link>
        </div>
        <div>
          <form onSubmit={update}>
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
            </div>
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
                      value={searchValue}
                      onChange={categorySearch}
                      className="px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden"
                      type="text"
                      placeholder="search"
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scrool">
                    {allCategory.length > 0 &&
                      allCategory.map((c, i) => (
                        <span
                          key={i}
                          className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${
                            categories === c.name && "bg-indigo-500"
                          }`}
                          onClick={() => {
                            setCateShow(false);
                            setCategory(c.name);
                            setSearchValue("");
                            setAllCategory(categories);
                          }}>
                          {c.name}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">Stock</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.stock}
                  type="number"
                  min="0"
                  placeholder="product stock"
                  name="stock"
                  id="stock"
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Price</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.price}
                  type="number"
                  placeholder="price"
                  name="price"
                  id="price"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="discount">Discount</label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                  onChange={inputHandle}
                  value={state.discount}
                  type="number"
                  placeholder="%discount%"
                  name="discount"
                  id="discount"
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1 text-[#d0d2d6] mb-5">
              <label htmlFor="description">Description</label>
              <textarea
                rows={4}
                className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                onChange={inputHandle}
                value={state.description}
                placeholder="description"
                name="description"
                id="description"></textarea>
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
              {imageShown &&
                imageShown.length > 0 &&
                imageShown.map((img, i) => (
                  <div key={i}>
                    <label className="h-[180px]" htmlFor={i}>
                      <img className="h-full" src={img} alt="" />
                    </label>
                    <input
                      onChange={(e) => changeImage(img, e.target.files)}
                      type="file"
                      id={i}
                      className="hidden"
                    />
                  </div>
                ))}
            </div>
            <div className="flex">
              <button
                disabled={loader ? true : false}
                className="bg-blue-500 w-[200px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
                {loader ? (
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                ) : (
                  "Update Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
