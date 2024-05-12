/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api.js";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

export const customer_register = createAsyncThunk(
  "auth/customer_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer-register", info);
      localStorage.setItem("customerToken", data.token);
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(
        "Error:",
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const customer_login = createAsyncThunk(
  "auth/customer_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer-login", info);
      localStorage.setItem("customerToken", data.token);
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(
        "Error:",
        error.response ? error.response.data : error.message
      );
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const decodeToken = (token) => {
  try {
    if (token) {
      const userInfo = jwtDecode(token);
      return userInfo;
    } else {
      return "";
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return null; // Return null or handle the error appropriately
  }
};

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    userInfo: decodeToken(localStorage.getItem("customerToken")),
    loader: false,
    successMessage: "",
    errorMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(customer_register.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(customer_register.rejected, (state, action) => {
      state.errorMessage = action.payload.error;
      state.loader = false;
    });

    builder.addCase(customer_register.fulfilled, (state, { payload }) => {
      const userInfo = decodeToken(payload.token);
      state.successMessage = payload.message;
      state.loader = false;
      state.userInfo = userInfo;
    });

    // ===--->
    builder.addCase(customer_login.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(customer_login.rejected, (state, action) => {
      state.errorMessage = action.payload.error;
      state.loader = false;
    });

    builder.addCase(customer_login.fulfilled, (state, { payload }) => {
      const userInfo = decodeToken(payload.token);
      state.successMessage = payload.message;
      state.loader = false;
      state.userInfo = userInfo;
    });
    // --->
  },
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
