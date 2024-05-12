/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import api from "../../api/api";

export const addProducts = createAsyncThunk(
  "product/addProducts",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/add-products", product, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPeoducts = createAsyncThunk(
  "product/getPeoducts",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-products?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_a_product = createAsyncThunk(
  "product/get_a_product",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-a-product/${productId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_Product = createAsyncThunk(
  "product/update_Product",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/update-product", product, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const product_image_update = createAsyncThunk(
  "product/product_image_update",
  async (
    { oldImage, newImage, productId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("oldImage", oldImage);
      formData.append("newImage", newImage);
      formData.append("productId", productId);
      const { data } = await api.post("/product-image-update", formData, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const productsReducer = createSlice({
  name: "product",
  initialState: {
    successMessage: "",
    errorsMessage: "",
    loader: false,
    userInfo: "",
    products: [],
    aproduct: "",
    totalProducts: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorsMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProducts.pending, (state, _) => {
      // handle pending action
      state.loader = true;
    });
    builder.addCase(addProducts.rejected, (state, { payload }) => {
      // handle pending action
      state.loader = false;
      state.errorsMessage = payload.error;
    });
    builder.addCase(addProducts.fulfilled, (state, { payload }) => {
      // handle pending action
      state.loader = false;
      state.successMessage = payload.message;
      state.products = [...state.products, payload.product];
    });
    //====>

    builder.addCase(get_a_product.fulfilled, (state, { payload }) => {
      state.aproduct = payload.products;
      state.totalProducts = payload.totalProducts;
    });
    // ==>get_a_product
    builder.addCase(update_Product.pending, (state, _) => {
      // handle pending action
      state.loader = true;
    });
    builder.addCase(update_Product.rejected, (state, { payload }) => {
      // handle pending action
      state.loader = false;
      state.errorsMessage = payload.error;
    });
    builder.addCase(update_Product.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.updatedProduct = payload.updatedProduct;
      state.successMessage = payload.message;
    });
    //==>

    builder.addCase(product_image_update.fulfilled, (state, { payload }) => {
      state.updatedProduct = payload.updatedProduct;
      state.successMessage = payload.message;
    });
    //==>
  },
});

export const { messageClear } = productsReducer.actions;
export default productsReducer.reducer;
