/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_friend = createAsyncThunk(
  "chat/add_friend",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/customer/add-customer-friend",
        info
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const send_message = createAsyncThunk(
  "chat/send_message",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/customer/send-message-to-seller",
        info
      );

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    my_friends: [],
    fd_message: [],
    currentFd: "",
    successMessage: "",
    errorMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessage: (state, { payload }) => {
      state.fd_message = [...state.fd_message, payload];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(add_friend.fulfilled, (state, { payload }) => {
        state.fd_message = payload.messages;
        state.currentFd = payload.currentFd;
        state.my_friends = payload.myFriends;
      })
      .addCase(send_message.fulfilled, (state, { payload }) => {
        let tempFriends = state.my_friends;
        let index = tempFriends.findIndex(
          (f) => f.fdId === payload.message.reciverId
        );
        while (index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }
        state.my_friends = tempFriends;
        state.fd_message = [...state.fd_message, payload.message];
        state.successMessage = "message send success";
      });
    //   .addCase(customer_login.pending, (state, _) => {
    //     state.loader = true;
    //   })
    //   .addCase(customer_login.rejected, (state, { payload }) => {
    //     state.loader = false;
    //     state.errorMessage = payload.error;
    //   })
    //   .addCase(customer_login.fulfilled, (state, { payload }) => {
    //     state.loader = false;
    //     state.successMessage = payload.message;
    //     const userInfo = decodeToken(payload.token);
    //     state.userInfo = userInfo;
    //   });
  },
});

export const { messageClear, updateMessage } = chatReducer.actions;
export default chatReducer.reducer;
