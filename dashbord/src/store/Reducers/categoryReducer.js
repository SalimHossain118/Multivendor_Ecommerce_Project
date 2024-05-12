/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const categoryAdd = createAsyncThunk(
  "category/categoryAdd",
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const { data } = await api.post("/category-add", formData, {
        withCredentials: true,
      });
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const categoryGET = createAsyncThunk(
  "category/categoryGet",
  async (
    { perPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/category-get?page=${page}&&searchValue=${searchValue}&&perPage=${perPage}`,
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

export const categoryReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorsMessage: "",
    loader: false,
    userInfo: "",
    categories: [],
    totalCategory: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorsMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(categoryAdd.pending, (state, _) => {
      // handle pending action
      state.loader = true;
    });
    builder.addCase(categoryAdd.rejected, (state, { payload }) => {
      // handle pending action
      state.loader = true;
      state.errorsMessage = payload.error;
    });
    builder.addCase(categoryAdd.fulfilled, (state, { payload }) => {
      // handle pending action
      state.loader = false;
      state.successMessage = payload.message;
      state.categories = [...state.categories, payload.category];
    });
    //====>
    builder.addCase(categoryGET.fulfilled, (state, { payload }) => {
      state.totalCategory = payload.totalCategory;
      state.categories = payload.categories;
    });
  },
});

export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
