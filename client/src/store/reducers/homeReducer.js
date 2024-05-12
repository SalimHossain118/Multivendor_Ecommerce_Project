/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const get_category = createAsyncThunk(
  "product/get_category",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/get-categorys");

      return data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_products = createAsyncThunk(
  "product/get_products",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/get-products");
      // console.log(data);
      return data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_product = createAsyncThunk(
  "product/get_product",
  async (slug, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/get-product/${slug}`);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const price_range_products = createAsyncThunk(
  "product/price_range_products",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/price-range-latest-products");

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const query_products = createAsyncThunk(
  "product/query_products",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/shop-page-query-products?category=${query.categoryyy}&&rating=${
          query.rating
        }&&sortPrice=${query.sortPrice}&&lowPrice=${query.low}&&highPrice=${
          query.high
        }&&pageNumber=${query.pageNumber}&&searchValue=${
          query.searchValue ? query.searchValue : ""
        }`
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const customer_review = createAsyncThunk(
  "review/customer_review",
  async (info, { fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/customer/submit-review", info);
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {}
  }
);

export const get_reviews = createAsyncThunk(
  "review/get_reviews",
  async ({ productId, pageNumber }, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-reviews/${productId}?pageNumber=${pageNumber}`
      );
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {}
  }
);

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categorys: [],
    products: [],
    totalProducts: 0,
    parPage: 4,
    latestProducts: [],
    topRatedProducts: [],
    discountProducts: [],
    priceRange: {
      low: 0,
      high: 30000,
    },
    product: {},
    relatedProducts: [],
    moreProducts: [],
    successMessage: "",
    errorMessage: "",
    totalReview: 0,
    rating_review: [],
    reviews: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_category.fulfilled, (state, action) => {
      state.categorys = action.payload.categorys;
    });
    builder.addCase(get_products.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.latestProducts = action.payload.latestProducts;
      state.topRatedProducts = action.payload.topRatedProducts;
      state.discountProducts = action.payload.discountProducts;
    });
    // end-<.>

    builder.addCase(get_product.fulfilled, (state, action) => {
      state.product = action.payload.product;
      state.relatedProducts = action.payload.relatedProducts;
      state.moreProducts = action.payload.moreProducts;
    });

    builder.addCase(price_range_products.fulfilled, (state, action) => {
      state.latestProducts = action.payload.latestProducts;
      state.priceRange = action.payload.priceRange;
    });

    builder.addCase(query_products.fulfilled, (state, action) => {
      state.products = action.payload.products;
      state.totalProducts = action.payload.totalProducts;
      state.parPage = action.payload.parPage;
    });
    // -->
    builder.addCase(customer_review.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
    });
    // ==>
    builder.addCase(get_reviews.fulfilled, (state, { payload }) => {
      state.reviews = payload.reviews;
      state.totalReview = payload.totalReview;
      state.rating_review = payload.rating_review;
    });
  },

  // end of extraReducers
});

export const { messageClear } = homeReducer.actions;

export default homeReducer.reducer;
