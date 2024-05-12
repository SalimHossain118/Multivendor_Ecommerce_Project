/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_seller_request = createAsyncThunk(
  "seller/get_seller_request",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-seller-request?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
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

export const get_seller = createAsyncThunk(
  "seller/get_seller",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-seller/${sellerId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seller_status_update = createAsyncThunk(
  "seller/seller_status_update",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/seller-status-update", info, {
        withCredentials: true,
      });
      console.log("get_seller data:", data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_active_sellers = createAsyncThunk(
  "seller/get_active_sellers",
  async (
    { perPage, page, searchValue },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-sellers?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_deactive_sellers = createAsyncThunk(
  "seller/get_deactive_sellers",
  async (
    { perPage, page, searchValue },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-deactive-sellers?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
        { withCredentials: true }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sellerReducer = createSlice({
  name: "seller",
  initialState: {
    successMessage: "",
    errorsMessage: "",
    loader: false,
    sellers: [],
    totalsellers: 0,
    seller: "",
    deactivesellers: [],
    totaldeactivesellers: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorsMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    //====>
    builder.addCase(get_seller_request.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.totalsellers = payload.totalsellers;
      state.sellers = payload.sellers;
    });
    //====>
    //====>
    builder.addCase(get_seller.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.seller = payload.seller;
    });
    //====>

    builder.addCase(seller_status_update.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.seller = payload.seller;
      state.successMessage = payload.message;
    });
    //====>
    builder.addCase(get_active_sellers.fulfilled, (state, { payload }) => {
      state.sellers = payload.sellers;
      state.totalsellers = payload.totalSeller;
    });
    //====>
    builder.addCase(get_deactive_sellers.fulfilled, (state, { payload }) => {
      state.deactivesellers = payload.deactiveSellers;
      state.totaldeactivesellers = payload.totalDeactiveSeller;
    });
    //====>
  },
});

export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;
