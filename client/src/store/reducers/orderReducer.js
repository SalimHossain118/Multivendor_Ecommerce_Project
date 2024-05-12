/** @format */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";

export const place_order = createAsyncThunk(
  "order/place_order",
  async (
    { products, price, shipping_fee, items, shippingInfo, userId, navigate },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await api.post("/home/order/palce-order", {
        products,
        price,
        shipping_fee,
        items,
        shippingInfo,
        userId,
        navigate,
      });

      navigate("/payments", {
        state: {
          price: price + shipping_fee,
          items,
          oderId: data.oderId,
        },
      });
      console.log(data);

      return true;
    } catch (error) {
      console.error(error.response);
    }
  }
);

export const get_orders = createAsyncThunk(
  "order/get_orders",
  async ({ customerId, status }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/gat-orders/${customerId}/${status}`
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const get_order_details = createAsyncThunk(
  "order/get_order_details",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-order-details/${orderId}`
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    myOrder: {},
    loader: false,
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(get_orders.fulfilled, (state, action) => {
      state.myOrders = action.payload.orders;
    });
    builder.addCase(get_order_details.fulfilled, (state, action) => {
      state.myOrder = action.payload.orderDetails;
    });
  },
});

export const { messageClear } = orderReducer.actions;

export default orderReducer.reducer;
